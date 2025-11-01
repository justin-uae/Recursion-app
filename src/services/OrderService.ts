import client from '../lib/shopify';

interface OrderLineItem {
  variantId: string;
  quantity: number;
  price: number;
  title: string;
  customAttributes?: Array<{ key: string; value: string }>;
}

interface CreateOrderPayload {
  name: string;
  email: string;
  phone: string;
  lineItems: OrderLineItem[];
  note?: string;
  tags?: string[];
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  totalPrice: number;
  subtotalPrice: number;
  totalTax: number;
  financialStatus: string;
  fulfillmentStatus: string;
  createdAt: string;
  checkoutUrl: string;
  lineItems: Array<{
    title: string;
    quantity: number;
    price: number;
    customAttributes?: Array<{ key: string; value: string }>;
  }>;
}

/**
 * Create order using Shopify Storefront API
 * Creates a cart and returns checkout URL for customer to complete payment
 * 
 * Note: Storefront API cannot create completed orders directly.
 * This creates a cart + returns checkout URL for COD payment processing.
 */
export const createOrderWithCOD = async (orderData: CreateOrderPayload): Promise<Order> => {
  try {
    // Step 1: Create a cart with line items using Storefront API
    const cartMutation = `
            mutation CreateCart($input: CartInput!) {
                cartCreate(input: $input) {
                    cart {
                        id
                        checkoutUrl
                        cost {
                            totalAmount {
                                amount
                                currencyCode
                            }
                            subtotalAmount {
                                amount
                            }
                            totalTaxAmount {
                                amount
                            }
                        }
                        lines(first: 100) {
                            edges {
                                node {
                                    id
                                    quantity
                                    merchandise {
                                        ... on ProductVariant {
                                            id
                                            title
                                            product {
                                                title
                                            }
                                            priceV2 {
                                                amount
                                            }
                                        }
                                    }
                                    attributes {
                                        key
                                        value
                                    }
                                }
                            }
                        }
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;

    const cartInput = {
      lines: orderData.lineItems.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
        attributes: item.customAttributes || []
      })),
      buyerIdentity: {
        email: orderData.email,
        phone: orderData.phone
      }
    };

    const cartResponse = await client.request(cartMutation, {
      variables: { input: cartInput }
    });

    if (cartResponse.data.cartCreate.userErrors.length > 0) {
      throw new Error(cartResponse.data.cartCreate.userErrors[0].message);
    }

    const cart = cartResponse.data.cartCreate.cart;
    const totalAmount = parseFloat(cart.cost.totalAmount.amount);
    const subtotalAmount = parseFloat(cart.cost.subtotalAmount?.amount || '0');
    const taxAmount = cart.cost.totalTaxAmount ? parseFloat(cart.cost.totalTaxAmount.amount) : 0;

    // Step 2: Update cart with note (stored in attributes)
    const updateCartMutation = `
            mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
                cartLinesUpdate(cartId: $cartId, lines: $lines) {
                    cart {
                        id
                        checkoutUrl
                        cost {
                            totalAmount {
                                amount
                            }
                        }
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;

    const updateInput = {
      cartId: cart.id,
      lines: cart.lines.edges.map((edge: any) => ({
        id: edge.node.id,
        attributes: [
          ...edge.node.attributes,
          {
            key: 'customerName',
            value: orderData.name
          },
          {
            key: 'customerPhone',
            value: orderData.phone
          },
          {
            key: 'paymentMethod',
            value: 'Cash on Delivery'
          }
        ]
      }))
    };

    const updateResponse = await client.request(updateCartMutation, {
      variables: updateInput
    });

    if (updateResponse.data.cartLinesUpdate.userErrors.length > 0) {
      console.warn('Warning updating cart:', updateResponse.data.cartLinesUpdate.userErrors);
    }

    // Step 3: Return order object with checkout URL
    // Note: This is a cart, not a completed order
    // Customer must visit checkoutUrl to complete payment
    const orderObject: Order = {
      id: cart.id,
      orderNumber: `CART-${cart.id.split('/').pop()}`,
      customerName: orderData.name,
      email: orderData.email,
      phone: orderData.phone,
      totalPrice: totalAmount,
      subtotalPrice: subtotalAmount,
      totalTax: taxAmount,
      financialStatus: 'PENDING',
      fulfillmentStatus: 'UNFULFILLED',
      createdAt: new Date().toISOString(),
      checkoutUrl: cart.checkoutUrl,
      lineItems: cart.lines.edges.map((edge: any) => ({
        title: edge.node.merchandise.product.title,
        quantity: edge.node.quantity,
        price: parseFloat(edge.node.merchandise.priceV2.amount),
        customAttributes: edge.node.attributes
      }))
    };

    return orderObject;

  } catch (error) {
    console.error('Order creation error:', error);
    throw error;
  }
};

/**
 * Get cart details
 */
export const getCart = async (cartId: string) => {
  const query = `
        query GetCart($id: ID!) {
            cart(id: $id) {
                id
                checkoutUrl
                cost {
                    totalAmount {
                        amount
                    }
                }
                lines(first: 100) {
                    edges {
                        node {
                            id
                            quantity
                            merchandise {
                                ... on ProductVariant {
                                    id
                                    title
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

  const response = await client.request(query, {
    variables: { id: cartId }
  });

  return response.data.cart;
};