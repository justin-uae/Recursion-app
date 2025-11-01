import React, { useState, useMemo } from 'react';
import { ArrowRight, Calendar, Users, CheckCircle, Loader, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { createOrder } from '../slices/checkoutSlice';
import { clearCart, removeFromCart, updateQuantity } from '../slices/cartSlice';

type CheckoutStep = 'cart' | 'checkout';

export const CartPageComplete: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { items } = useAppSelector((state) => state.cart);
    const { loading: checkoutLoading, success: checkoutSuccess } = useAppSelector((state) => state.checkout);

    const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    // Calculate totals with useMemo for performance
    const totalPrice = useMemo(() => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [items]);

    const tax = useMemo(() => totalPrice * 0.05, [totalPrice]);
    const finalTotal = useMemo(() => totalPrice + tax, [totalPrice, tax]);

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
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckoutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all fields');
            return;
        }

        // Prepare line items for order
        const lineItems = items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            title: item.title,
            customAttributes: item.customAttributes
                ? [
                    { key: 'Date', value: item.customAttributes.date || '' },
                    { key: 'Adults', value: item.customAttributes.adults || '0' },
                    { key: 'Children', value: item.customAttributes.children || '0' },
                    { key: 'Total Guests', value: item.customAttributes.totalGuests || '0' },
                ]
                : undefined,
        }));

        // Create order through Redux
        const result = await dispatch(
            createOrder({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                lineItems,
                note: 'Payment Method: Cash on Delivery',
                tags: ['COD', 'Online Booking'],
            })
        );

        if (result.meta.requestStatus === 'fulfilled') {
            // Clear cart after successful order
            dispatch(clearCart());
            setSubmitted(true);

            // Redirect after a short delay
            setTimeout(() => {
                navigate('/order-confirmation', { state: { order: result.payload } });
            }, 1500);
        }
    };

    // Loading state
    if (checkoutLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-center p-6">
                <div>
                    <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                        Processing Your Booking...
                    </h1>
                    <p className="text-gray-500">Please wait a moment while we confirm your order.</p>
                </div>
            </div>
        );
    }

    // Success state
    if (submitted && checkoutSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-6 animate-bounce">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Booking Confirmed! 🎉</h1>
                    <p className="text-gray-600">We'll reach out soon with confirmation details.</p>
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
                                    <div className="flex flex-col justify-center items-center sm:flex-row gap-6 ">
                                        <div className="w-full sm:w-32 h-32  flex items-center  rounded-lg">
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
                                                        AED {item.price.toFixed(2)}
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
                                                        AED {(item.price * item.quantity).toFixed(2)}
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
                                        <span>AED {totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>VAT (5%)</span>
                                        <span>AED {tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-800">Total</span>
                                        <span className="text-2xl font-extrabold text-blue-600">
                                            AED {finalTotal.toFixed(2)}
                                        </span>
                                    </div>
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
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+971 50 123 4567"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="mt-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-6">
                                <h3 className="text-lg font-semibold text-blue-700 mb-2">💰 Payment Method</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    ✓ <strong>Cash on Delivery</strong> <br />
                                    ✓ Pay <strong>AED {finalTotal.toFixed(2)}</strong> when we meet<br />
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
                                        Confirm Booking <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center"> Order Summary</h3>

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
                                                AED {(item.price * item.quantity).toFixed(2)}
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
                                    <span>AED {totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>VAT (5%)</span>
                                    <span>AED {tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">Total</span>
                                    <span className="text-2xl font-extrabold text-blue-600">
                                        AED {finalTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPageComplete;