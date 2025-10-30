import { Shield, Award, Headphones, Wallet, Clock, Users, Star, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhyChooseUs() {
    const features = [
        {
            icon: Shield,
            title: "Safe & Secure",
            description: "100% secure payment and verified tours"
        },
        {
            icon: Award,
            title: "Best Price Guarantee",
            description: "Find a better price? We'll match it"
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            description: "Customer support whenever you need"
        },
        {
            icon: Wallet,
            title: "Easy Booking",
            description: "Quick and simple booking process"
        }
    ];

    const stats = [
        {
            icon: Users,
            number: "50K+",
            label: "Happy Customers"
        },
        {
            icon: Star,
            number: "4.9/5",
            label: "Average Rating"
        },
        {
            icon: Globe,
            number: "200+",
            label: "Tour Packages"
        },
        {
            icon: Clock,
            number: "15+",
            label: "Years Experience"
        }
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Why Choose Us
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We make your travel dreams come true with exceptional service and unforgettable experiences
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
                            >
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-3xl shadow-2xl p-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div className="text-4xl font-bold text-gray-900 mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready for Your Next Adventure?
                    </h3>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Book your dream tour today and create memories that last a lifetime
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-colors">
                            Explore Tours
                        </button>
                        <Link to={'/contact'}>
                            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-full transition-colors">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}