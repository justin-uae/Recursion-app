import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Calendar, Users, Loader, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createOrder } from '../slices/checkoutSlice';
import { clearCart, removeFromCart, updateQuantity } from '../slices/cartSlice';
import { useCurrency } from '../hooks/useCurrency';

type CheckoutStep = 'cart' | 'checkout';

export const CartPageComplete: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const { items } = useAppSelector((state) => state.cart);
    const { loading: checkoutLoading, success: checkoutSuccess } = useAppSelector((state) => state.checkout);
    // Currency hook
    const { formatPrice, convertPrice, selectedCurrency } = useCurrency();

    const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '+971',
    });

    // Pre-fill email when user data is available
    useEffect(() => {
        if (user?.email) {
            setFormData(prev => ({ ...prev, email: user.email }));
        }
    }, [user?.email]);

    // Calculate totals with currency conversion
    const totalPrice = useMemo(() => {
        return items.reduce((sum, item) => {
            const convertedPrice = convertPrice(item.price);
            return sum + (convertedPrice * item.quantity);
        }, 0);
    }, [items, convertPrice]);

    const tax = useMemo(() => totalPrice * 0.05, [totalPrice]);
    const finalTotal = useMemo(() => totalPrice + tax, [totalPrice, tax]);

    // Calculate AED totals for order submission (always send AED to Shopify)
    const totalPriceAED = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [items]);

    const taxAED = useMemo(() => totalPriceAED * 0.05, [totalPriceAED]);
    const finalTotalAED = useMemo(() => totalPriceAED + taxAED, [totalPriceAED, taxAED]);

    const handleRemoveItem = (variantId: string) => {
        dispatch(removeFromCart(variantId));
    };

    const handleQuantityChange = (variantId: string, quantity: number) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ variantId, quantity }));
        }
    };

    const handleCheckoutClick = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        setCurrentStep('checkout');
    };

    const handleBackToCart = () => {
        setCurrentStep('cart');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            // Ensure +971 prefix is always there
            if (!value.startsWith('+971')) {
                setFormData(prev => ({ ...prev, [name]: '+971' }));
                return;
            }

            // Only allow numbers after +971, max 13 characters (+971 + 9 digits)
            const phoneRegex = /^\+971[0-9]{0,9}$/;
            if (phoneRegex.test(value) || value === '+971') {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckoutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        if (!formData.name || !formData.email || !formData.phone) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        // Prepare line items for order - ALWAYS send AED prices to Shopify
        const lineItems = items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price, // Keep original AED price
            title: item.title,
            customAttributes: item.customAttributes
                ? [
                    { key: 'Date', value: item.customAttributes.date || '' },
                    { key: 'Adults', value: item.customAttributes.adults || '0' },
                    { key: 'Children', value: item.customAttributes.children || '0' },
                    { key: 'Total Guests', value: item.customAttributes.totalGuests || '0' },
                    { key: 'Display Currency', value: selectedCurrency.code },
                ]
                : [
                    { key: 'Display Currency', value: selectedCurrency.code }
                ],
        }));

        // Create order through Redux
        const result: any = await dispatch(
            createOrder({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                lineItems,
                note: `Online Booking - Customer viewed prices in ${selectedCurrency.code}`,
                tags: ['Online Booking', `Currency: ${selectedCurrency.code}`],
            })
        );

        if (result.meta.requestStatus === 'fulfilled') {
            // Clear cart after successful order
            dispatch(clearCart());
            setSubmitted(true);

            // Store order data in sessionStorage for success page
            sessionStorage.setItem('tempOrderData', JSON.stringify(result.payload));

            // Redirect to Shopify checkout after a short delay
            setTimeout(() => {
                if (result.payload?.checkoutUrl) {
                    console.log('🔄 Redirecting to Shopify checkout:', result.payload.checkoutUrl);
                    // Redirect to Shopify's checkout page
                    window.location.href = result.payload.checkoutUrl;
                } else {
                    setErrorMessage('Checkout URL not received. Please try again.');
                    setSubmitted(false);
                }
            }, 1500);
        } else if (result.meta.requestStatus === 'rejected') {
            setErrorMessage(result.payload || 'Failed to create order. Please try again.');
            setSubmitted(false);
        }
    };

    if (submitted && checkoutSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                    {/* Animated Loading Icon */}
                    <div className="mb-8 inline-block">
                        <Loader className="w-20 h-20 text-blue-600 animate-spin" />
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Booking Details Preparing</h1>

                    {/* Subheading */}
                    <p className="text-lg text-gray-600 mb-8">
                        Preparing your secure checkout...
                    </p>

                    {/* Info Cards */}
                    {/* <div className="space-y-3 mb-8">
                        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                            <p className="text-gray-500 text-xs mb-1">Booking For</p>
                            <p className="text-gray-800 font-semibold text-sm">{formData.name}</p>
                        </div>

                        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                            <p className="text-gray-500 text-xs mb-1">Total to Pay</p>
                            <p className="text-2xl font-bold text-blue-600">{formatPrice(finalTotal)}</p>
                            {selectedCurrency.code !== 'AED' && (
                                <p className="text-xs text-gray-500 mt-1">
                                    (AED {finalTotalAED.toFixed(2)} at checkout)
                                </p>
                            )}
                        </div>

                        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                            <p className="text-gray-500 text-xs mb-1">Items</p>
                            <p className="text-gray-800 font-semibold text-sm">{items.length} booking{items.length !== 1 ? 's' : ''}</p>
                        </div>
                    </div> */}

                    {/* Status Message */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                        <div className="flex items-start gap-3">
                            <div className="text-2xl">🔒</div>
                            <div className="text-left">
                                <p className="font-semibold text-gray-800 text-sm mb-1">Secure Checkout</p>
                                <p className="text-gray-600 text-xs leading-relaxed">
                                    Your booking details are ready. You will now proceed to our secure payment page.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Loading Indicator */}
                    <div className="mb-8">
                        <p className="text-gray-600 font-semibold mb-3">Redirecting to Payment</p>
                        <div className="flex gap-2 justify-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-100"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-200"></div>
                        </div>
                    </div>

                    {/* Info Message */}
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-800">
                            Next Step: Complete Payment
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Please do not close this page. You will be redirected to our secure payment gateway shortly to complete your payment.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Empty cart state
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-center p-6">
                <div>
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                        <span className="text-5xl">🛍️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
                    <p className="text-gray-500 mb-6">Add your favorite experiences to start exploring!</p>

                    <Link
                        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md"
                        to={"/excursions"}
                    >
                        Browse Excursions
                    </Link>
                </div>
            </div>
        );
    }

    // CART VIEW
    if (currentStep === 'cart') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h1>
                        <p className="text-gray-600 text-lg">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.variantId}
                                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex flex-col justify-center items-center sm:flex-row gap-6">
                                        <div className="w-full sm:w-32 h-32 flex items-center rounded-lg">
                                            <img src={item?.image} alt={`Thumbnail`} className="w-full h-full object-contain" />
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-blue-600 font-bold text-lg">
                                                        {formatPrice(item.price)}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItem(item.variantId)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            {/* Item Attributes */}
                                            {item.customAttributes && (
                                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 mb-4 text-sm text-gray-600 space-y-1">
                                                    {item.customAttributes.date && (
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-blue-400" />
                                                            <span>
                                                                {new Date(item.customAttributes.date).toLocaleDateString('en-US', {
                                                                    weekday: 'short',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {item.customAttributes.totalGuests && (
                                                        <div className="flex items-center gap-2">
                                                            <Users className="w-4 h-4 text-purple-400" />
                                                            <span>
                                                                {item.customAttributes.totalGuests}{' '}
                                                                {item.customAttributes.totalGuests === '1' ? 'guest' : 'guests'}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {item.customAttributes.adults && (
                                                        <div className="text-gray-600">
                                                            👥 {item.customAttributes.adults} adults
                                                            {item.customAttributes.children && `, ${item.customAttributes.children} children`}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4">
                                                <span className="text-gray-600 text-sm">Quantity:</span>
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.variantId, item.quantity - 1)}
                                                        className="p-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                    <span className="px-4 py-2 font-semibold text-gray-800 min-w-[3rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.variantId, item.quantity + 1)}
                                                        className="p-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                </div>
                                                <span className="ml-auto text-right">
                                                    <p className="text-gray-600 text-sm">Subtotal</p>
                                                    <p className="text-xl font-bold text-blue-600">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Continue Shopping Button */}
                            <Link
                                to="/excursions"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mt-6"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Summary</h3>

                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 space-y-3 border border-gray-200 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>{selectedCurrency?.symbol}{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>VAT (5%)</span>
                                        <span>{selectedCurrency?.symbol}{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-800">Total</span>
                                        <span className="text-2xl font-extrabold text-blue-600">
                                            {selectedCurrency?.symbol}{finalTotal.toFixed(2)}
                                        </span>
                                    </div>
                                    {selectedCurrency.code !== 'AED' && (
                                        <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
                                            ≈ AED {finalTotalAED.toFixed(2)} at checkout
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleCheckoutClick}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg"
                                >
                                    Proceed to Checkout <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // CHECKOUT VIEW
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header with Back Button */}
                <div className="text-center mb-12">
                    <button
                        onClick={handleBackToCart}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
                    >
                        ← Back to Cart
                    </button>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Complete Your Booking</h1>
                    <p className="text-gray-600 text-lg">Just a few details away from your adventure</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleCheckoutSubmit}
                            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                                🧾 Your Details
                            </h2>

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-red-700 text-sm font-semibold">❌ {errorMessage}</p>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-700 text-sm mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
                                        required
                                        readOnly={!!user?.email}
                                    />
                                    {user?.email && (
                                        <p className="text-gray-500 text-xs mt-1">
                                            Using your account email
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+971 50 123 4567"
                                        pattern="^\+971[0-9]{9}$"
                                        title="Please enter a valid UAE phone number (9 digits after +971)"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                    <p className="text-gray-500 text-xs mt-1">
                                        Enter 9 digits after +971
                                    </p>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-6">
                                <h3 className="text-lg font-semibold text-blue-700 mb-2">💳 Payment</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    ✓ Secure payment processing<br />
                                    ✓ You will be redirected to our checkout page<br />
                                    ✓ Confirmation will be sent to your email
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={checkoutLoading}
                                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {checkoutLoading ? (
                                    <>
                                        <Loader className="w-6 h-6 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Proceed to Payment <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Summary</h3>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div
                                        key={item.variantId}
                                        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-gray-200"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                                                <p className="text-gray-500 text-sm">× {item.quantity}</p>
                                            </div>
                                            <p className="text-blue-600 font-semibold">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>

                                        <div className="border-t border-gray-200 mt-2 pt-2 text-sm text-gray-600">
                                            {item.customAttributes?.date && (
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-blue-400" />
                                                    <span>
                                                        {new Date(item.customAttributes.date).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </span>
                                                </div>
                                            )}
                                            {item.customAttributes?.totalGuests && (
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-purple-400" />
                                                    <span>
                                                        {item.customAttributes.totalGuests}{' '}
                                                        {item.customAttributes.totalGuests === '1' ? 'guest' : 'guests'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 space-y-3 border border-gray-200">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{selectedCurrency?.symbol}{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>VAT (5%)</span>
                                    <span>{selectedCurrency?.symbol}{tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">Total</span>
                                    <span className="text-2xl font-extrabold text-blue-600">
                                        {selectedCurrency?.symbol}{finalTotal.toFixed(2)}
                                    </span>
                                </div>
                                {selectedCurrency.code !== 'AED' && (
                                    <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
                                        You'll pay AED {finalTotalAED.toFixed(2)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPageComplete;