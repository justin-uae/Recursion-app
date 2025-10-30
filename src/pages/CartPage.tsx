import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Calendar, Users, User } from 'lucide-react';
import { useCart } from '../context/Cartcontext';

const CartPage: React.FC = () => {
    const { cart, cartCount, removeFromCart, proceedToCheckout, loading } = useCart();

    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.05; // 5% VAT in UAE
    const total = subtotal + tax;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
                <div className="text-center max-w-md px-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8">
                        Looks like you haven't added any tours yet. Start exploring our amazing experiences!
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all"
                    >
                        Browse Tours
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item, index) => (
                            <div key={`${item.variantId}-${index}`} className="bg-white rounded-2xl shadow-md p-6">
                                <div className="flex items-start gap-4">
                                    {/* Product Image */}
                                    {item.image && (
                                        <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>

                                        {/* Booking Details */}
                                        {item.customAttributes && (
                                            <div className="space-y-2 mb-4">
                                                {item.customAttributes.date && (
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Calendar className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            Date: <span className="font-semibold">{item.customAttributes.date}</span>
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-4 text-gray-600">
                                                    {item.customAttributes.adults && (
                                                        <div className="flex items-center gap-2">
                                                            <Users className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                Adults: <span className="font-semibold">{item.customAttributes.adults}</span>
                                                            </span>
                                                        </div>
                                                    )}
                                                    {item.customAttributes.children && parseInt(item.customAttributes.children) > 0 && (
                                                        <div className="flex items-center gap-2">
                                                            <User className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                Children: <span className="font-semibold">{item.customAttributes.children}</span>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                {item.customAttributes.totalGuests && (
                                                    <div className="text-sm text-gray-600">
                                                        Total: <span className="font-semibold">{item.customAttributes.totalGuests} guests</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Price per person */}
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600">Price per person</p>
                                            <p className="text-2xl font-bold text-blue-600">${item.price}</p>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.variantId)}
                                            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                                            disabled={loading}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Remove
                                        </button>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                                        <p className="text-sm text-gray-500 mb-2">
                                            ${item.price} × {item.quantity} guests
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (5% VAT)</span>
                                    <span className="font-semibold">${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={proceedToCheckout}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mb-4"
                            >
                                {loading ? (
                                    'Processing...'
                                ) : (
                                    <>
                                        Proceed to Checkout
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {/* Continue Shopping */}
                            <Link
                                to="/"
                                className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Continue Shopping
                            </Link>

                            {/* Security Badge */}
                            <div className="mt-6 pt-6 border-t">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Secure checkout powered by Shopify</span>
                                </div>
                                <div className="mt-3 text-xs text-gray-500">
                                    Free cancellation up to 24 hours before
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;