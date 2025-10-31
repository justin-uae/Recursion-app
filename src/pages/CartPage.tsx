import React, { useState } from 'react';
import { ArrowRight, Calendar, Users, CheckCircle, Loader } from 'lucide-react';
import { useCart } from '../context/Cartcontext';

export const CartPage: React.FC = () => {
    const { cart, clearCart } = useCart();
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = totalPrice * 0.05;
    const finalTotal = totalPrice + tax;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all fields');
            return;
        }
        setProcessing(true);

        const order = {
            orderNumber: `ORD-${Date.now()}`,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            customer: formData,
            items: cart,
            subtotal: totalPrice,
            tax,
            total: finalTotal,
            paymentMethod: 'Cash on Delivery',
            status: 'Confirmed',
        };

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('currentOrder', JSON.stringify(order));

        setTimeout(() => {
            clearCart();
            setProcessing(false);
            setSubmitted(true);

            setTimeout(() => {
                window.location.href = "/order-confirmation";
            }, 1000);
        }, 2000);
    };

    if (processing) {
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

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-6 animate-bounce">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Booking Confirmed! 🎉</h1>
                    <p className="text-gray-600">We’ll reach out soon with confirmation details.</p>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center text-center p-6">
                <div>
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                        <span className="text-5xl">🛍️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
                    <p className="text-gray-500 mb-6">Add your favorite experiences to start exploring!</p>
                    <a
                        href="/excursions"
                        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-all shadow-md"
                    >
                        Browse Excursions
                    </a>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-6 animate-bounce">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Booking Confirmed! 🎉</h1>
                    <p className="text-gray-600">We’ll reach out soon with confirmation details.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Complete Your Booking</h1>
                    <p className="text-gray-600 text-lg">Just a few details away from your adventure</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleSubmit}
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
                                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg"
                            >
                                Confirm Booking <ArrowRight className="w-6 h-6" />
                            </button>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 Order Summary</h3>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
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

export default CartPage;
