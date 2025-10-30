import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function FallbackPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-6">
            <div className="max-w-2xl mx-auto text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <div className="text-9xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                        404
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-3xl shadow-2xl p-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Page Coming Soon!
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        We're working hard to bring you this page. In the meantime, explore our other amazing offerings.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            Go to Homepage
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-semibold px-8 py-4 rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5" />
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8 text-gray-600">
                    <p className="mb-4">Or try these pages:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link to="/" className="hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <span>•</span>
                        <Link to="/contact" className="hover:text-blue-600 transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}