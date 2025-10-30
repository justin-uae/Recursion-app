// src/pages/OrderSuccessPage.tsx
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Home, Calendar } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-xl text-gray-600">
                        Thank you for your booking
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="border-b pb-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Order Number</p>
                                <p className="text-lg font-bold text-gray-900">#{order.orderNumber || order.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Amount</p>
                                <p className="text-lg font-bold text-gray-900">${order.totalPrice.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="text-gray-900">{order.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Payment Method</p>
                                <p className="text-gray-900 font-semibold">Cash on Delivery</p>
                            </div>
                        </div>
                    </div>

                    {/* Booked Tours */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Booked Tours</h3>
                        <div className="space-y-3">
                            {order.lineItems?.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.title}</p>
                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What Happens Next?</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">1</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Confirmation Email</p>
                                <p className="text-sm text-gray-600">
                                    We've sent a confirmation email to {order.email} with all your booking details.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">2</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Prepare for Your Tour</p>
                                <p className="text-sm text-gray-600">
                                    Check your email for tour details, pickup time, and what to bring.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white text-sm font-bold">3</span>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Pay on Tour Day</p>
                                <p className="text-sm text-gray-600">
                                    Pay with cash when your tour guide arrives. We accept AED and major currencies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>

                    <Link
                        to="/bookings"
                        className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                    >
                        <Calendar className="w-5 h-5" />
                        My Bookings
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all"
                    >
                        <Package className="w-5 h-5" />
                        Print Receipt
                    </button>
                </div>

                {/* Support */}
                <div className="text-center mt-8">
                    <p className="text-gray-600 mb-2">Need help with your booking?</p>
                    <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">
                        Contact Support →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;