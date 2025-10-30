import client from '../lib/shopify';

interface OrderLineItem {
    variantId: string;
    quantity: number;
    price: number;
    title: string;
    customAttributes?: Array<{ key: string; value: string }>;
}

interface ShippingAddress {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    country: string;
    province?: string;
    zip: string;
    phone: string;
}

interface OrderInput {
    email: string;
    lineItems: OrderLineItem[];
    shippingAddress: ShippingAddress;
    billingAddress?: ShippingAddress;
    note?: string;
    tags?: string[];
}

interface Order {
    id: string;
    orderNumber: number;
    name: string;
    email: string;
    phone: string;
    totalPrice: number;
    subtotalPrice: number;
    totalTax: number;
    financialStatus: string;
    fulfillmentStatus: string;
    createdAt: string;
    lineItems: Array<{
        title: string;
        quantity: number;
        price: number;
        customAttributes?: Array<{ key: string; value: string }>;
    }>;
    shippingAddress: ShippingAddress;
}

/**
 * Create a draft order with COD payment
 * This creates an order without payment processing
 */
export const createDraftOrder = async (orderInput: OrderInput): Promise<Order> => {
    const mutation = `
    mutation DraftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          name
          email
          phone
          totalPrice
          subtotalPrice
          totalTax
          createdAt
          lineItems(first: 50) {
            edges {
              node {
                title
                quantity
                originalTotal
                customAttributes {
                  key
                  value
                }
              }
            }
          }
          shippingAddress {
            firstName
            lastName
            address1
            address2
            city
            country
            province
            zip
            phone
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

    const lineItems = orderInput.lineItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity,
        customAttributes: item.customAttributes || []
    }));

    const { data } = await client.request(mutation, {
        variables: {
            input: {
                email: orderInput.email,
                phone: orderInput.shippingAddress.phone,
                lineItems: lineItems,
                shippingAddress: {
                    firstName: orderInput.shippingAddress.firstName,
                    lastName: orderInput.shippingAddress.lastName,
                    address1: orderInput.shippingAddress.address1,
                    address2: orderInput.shippingAddress.address2 || '',
                    city: orderInput.shippingAddress.city,
                    country: orderInput.shippingAddress.country,
                    province: orderInput.shippingAddress.province || '',
                    zip: orderInput.shippingAddress.zip,
                    phone: orderInput.shippingAddress.phone,
                },
                billingAddress: orderInput.billingAddress || orderInput.shippingAddress,
                note: orderInput.note || 'Payment Method: Cash on Delivery',
                tags: orderInput.tags || ['COD', 'Online Booking'],
                useCustomerDefaultAddress: false,
            }
        }
    });

    if (data.draftOrderCreate.userErrors.length > 0) {
        throw new Error(data.draftOrderCreate.userErrors[0].message);
    }

    const draftOrder = data.draftOrderCreate.draftOrder;

    return {
        id: draftOrder.id,
        orderNumber: 0, // Draft orders don't have order numbers yet
        name: draftOrder.name,
        email: draftOrder.email,
        phone: draftOrder.phone,
        totalPrice: parseFloat(draftOrder.totalPrice),
        subtotalPrice: parseFloat(draftOrder.subtotalPrice),
        totalTax: parseFloat(draftOrder.totalTax),
        financialStatus: 'PENDING',
        fulfillmentStatus: 'UNFULFILLED',
        createdAt: draftOrder.createdAt,
        lineItems: draftOrder.lineItems.edges.map((edge: any) => ({
            title: edge.node.title,
            quantity: edge.node.quantity,
            price: parseFloat(edge.node.originalTotal),
            customAttributes: edge.node.customAttributes
        })),
        shippingAddress: draftOrder.shippingAddress
    };
};

/**
 * Complete a draft order (convert to real order)
 */
export const completeDraftOrder = async (draftOrderId: string): Promise<Order> => {
    const mutation = `
    mutation DraftOrderComplete($id: ID!) {
      draftOrderComplete(id: $id) {
        draftOrder {
          id
          order {
            id
            name
            orderNumber
            email
            phone
            totalPriceSet {
              shopMoney {
                amount
              }
            }
            subtotalPriceSet {
              shopMoney {
                amount
              }
            }
            totalTaxSet {
              shopMoney {
                amount
              }
            }
            displayFinancialStatus
            displayFulfillmentStatus
            createdAt
            lineItems(first: 50) {
              edges {
                node {
                  title
                  quantity
                  originalTotalSet {
                    shopMoney {
                      amount
                    }
                  }
                  customAttributes {
                    key
                    value
                  }
                }
              }
            }
            shippingAddress {
              firstName
              lastName
              address1
              address2
              city
              country
              province
              zip
              phone
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

    const { data } = await client.request(mutation, {
        variables: { id: draftOrderId }
    });

    if (data.draftOrderComplete.userErrors.length > 0) {
        throw new Error(data.draftOrderComplete.userErrors[0].message);
    }

    const order = data.draftOrderComplete.draftOrder.order;

    return {
        id: order.id,
        orderNumber: order.orderNumber,
        name: order.name,
        email: order.email,
        phone: order.phone,
        totalPrice: parseFloat(order.totalPriceSet.shopMoney.amount),
        subtotalPrice: parseFloat(order.subtotalPriceSet.shopMoney.amount),
        totalTax: parseFloat(order.totalTaxSet.shopMoney.amount),
        financialStatus: order.displayFinancialStatus,
        fulfillmentStatus: order.displayFulfillmentStatus,
        createdAt: order.createdAt,
        lineItems: order.lineItems.edges.map((edge: any) => ({
            title: edge.node.title,
            quantity: edge.node.quantity,
            price: parseFloat(edge.node.originalTotalSet.shopMoney.amount),
            customAttributes: edge.node.customAttributes
        })),
        shippingAddress: order.shippingAddress
    };
};

export const createOrderWithCOD = async (orderInput: OrderInput): Promise<Order> => {
    // Step 1: Create draft order
    const draftOrder = await createDraftOrder(orderInput);

    // Step 2: Complete draft order to create real order
    const completedOrder = await completeDraftOrder(draftOrder.id);

    return completedOrder;
};