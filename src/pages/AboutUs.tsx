import { MapPin, Heart, Zap, Users, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold">
                        Our Story
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
                        Your Gateway to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Unforgettable Adventures</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-2">
                        We make it easy for travelers to book authentic experiences across the UAE
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                    <div className="p-6 sm:p-7 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                            <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">Best Locations</h3>
                        <p className="text-xs sm:text-sm text-gray-700">Carefully curated experiences across top destinations</p>
                    </div>

                    <div className="p-6 sm:p-7 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">Quality Assured</h3>
                        <p className="text-xs sm:text-sm text-gray-700">Highly rated tours and activities you can trust</p>
                    </div>

                    <div className="p-6 sm:p-7 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                            <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">Easy Booking</h3>
                        <p className="text-xs sm:text-sm text-gray-700">Quick and simple booking process online</p>
                    </div>

                    <div className="p-6 sm:p-7 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">Great Support</h3>
                        <p className="text-xs sm:text-sm text-gray-700">24/7 customer support for all your questions</p>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 py-10 sm:py-12 md:py-16 px-4 sm:px-6 my-6 sm:my-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        <div className="text-white">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Mission</h2>
                            <p className="text-base sm:text-lg text-blue-50 leading-relaxed">
                                To make travel experiences accessible, affordable, and unforgettable for everyone. We believe in connecting adventurers with their perfect experience.
                            </p>
                        </div>
                        <div className="text-white">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Vision</h2>
                            <p className="text-base sm:text-lg text-blue-50 leading-relaxed">
                                To become the most trusted platform for booking tours and activities across the Middle East, delivering exceptional value and memories.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl hover:shadow-md transition-all">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">Verified Experiences</h3>
                            <p className="text-xs sm:text-sm text-gray-700">All tours are carefully selected and reviewed by our team</p>
                        </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl hover:shadow-md transition-all">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">Best Prices</h3>
                            <p className="text-xs sm:text-sm text-gray-700">Competitive pricing with no hidden fees or surprises</p>
                        </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl hover:shadow-md transition-all">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">Secure Booking</h3>
                            <p className="text-xs sm:text-sm text-gray-700">Safe payment options and instant email confirmation</p>
                        </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl hover:shadow-md transition-all">
                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-10 sm:py-12 md:py-16 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                        <div>
                            <h3 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1.5 sm:mb-2">500+</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-semibold">Amazing Tours</p>
                        </div>
                        <div>
                            <h3 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1.5 sm:mb-2">50K+</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-semibold">Happy Travelers</p>
                        </div>
                        <div>
                            <h3 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1.5 sm:mb-2">4.9★</h3>
                            <p className="text-sm sm:text-base text-gray-700 font-semibold">Average Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center text-white shadow-xl">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Ready to Explore?</h2>
                    <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                        Start your next adventure today and discover why thousands of travelers choose us
                    </p>
                    <Link
                        to="/excursions"
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full font-bold text-base sm:text-lg hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                        Browse Tours <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-10 sm:py-12 md:py-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Get in Touch</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                        <div className="p-5 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border-2 border-blue-100">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">Email</h4>
                            <p className="text-xs sm:text-sm text-blue-600 font-semibold break-all">info@excursionsdubai.ae</p>
                        </div>
                        <div className="p-5 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border-2 border-blue-100">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">Phone</h4>
                            <p className="text-xs sm:text-sm text-blue-600 font-semibold">+971 50 123 4567</p>
                        </div>
                        <div className="p-5 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border-2 border-blue-100">
                            <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">Support</h4>
                            <p className="text-xs sm:text-sm text-gray-700">Available 24/7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}