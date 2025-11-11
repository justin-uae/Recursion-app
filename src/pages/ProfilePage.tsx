import { Mail, Calendar, MapPin, ShoppingBag, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';

export default function ProfilePage() {
    const { user } = useAppSelector((state) => state.auth);
    const { orders } = useAppSelector((state) => state.orders);
    // Format member since date
    const getMemberSinceDate = () => {
        if (user?.createdAt) {
            return new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return 'Recently';
    };

    const getMemberSinceYear = () => {
        if (user?.createdAt) {
            return new Date(user.createdAt).getFullYear();
        }
        return new Date().getFullYear();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/20 mb-6">
                    {/* Gradient Header */}
                    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 sm:p-12 text-white">
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0"></div>
                        </div>

                        <div className="relative text-center">
                            {/* Profile Image */}
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-lg mx-auto mb-4 ring-4 ring-white/30">
                                {user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                            </div>

                            {/* Profile Info */}
                            <h2 className="text-2xl sm:text-3xl font-bold mb-2 break-words px-4">
                                {user?.displayName || user?.email}
                            </h2>
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm sm:text-base text-blue-100">
                                <Calendar className="w-4 h-4" />
                                <span>Member since {getMemberSinceYear()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Account Info */}
                    <div className="p-6 sm:p-8 md:p-10">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            Account Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Name (if available) */}
                            {(user?.firstName || user?.lastName) && (
                                <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Full Name</p>
                                    <p className="font-semibold text-base sm:text-lg text-gray-900">
                                        {`${user?.firstName || ''} ${user?.lastName || ''}`.trim()}
                                    </p>
                                </div>
                            )}

                            {/* Email */}
                            <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
                                <p className="text-xs sm:text-sm text-gray-600 mb-2">Email Address</p>
                                <p className="font-semibold text-base sm:text-lg text-gray-900 break-words">{user?.email}</p>
                            </div>

                            {/* Member Since */}
                            <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
                                <p className="text-xs sm:text-sm text-gray-600 mb-2 flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Member Since
                                </p>
                                <p className="font-semibold text-base sm:text-lg text-gray-900">{getMemberSinceDate()}</p>
                            </div>

                            {/* Location */}
                            <div className="p-5 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
                                <p className="text-xs sm:text-sm text-gray-600 mb-2 flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    Location
                                </p>
                                <p className="font-semibold text-base sm:text-lg text-gray-900">United Arab Emirates</p>
                            </div>

                            {/* Total Orders */}
                            <div className="p-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white sm:col-span-2">
                                <p className="text-xs sm:text-sm text-blue-100 mb-2 flex items-center gap-1">
                                    <ShoppingBag className="w-4 h-4" />
                                    Total Bookings
                                </p>
                                <p className="font-bold text-3xl sm:text-4xl">{orders?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                    {/* View All Orders */}
                    <Link
                        to="/bookings"
                        className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300 p-6 sm:p-8"
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">My Bookings</h3>
                                <p className="text-sm sm:text-base text-gray-600">View all your orders</p>
                            </div>
                        </div>
                    </Link>

                    {/* Browse Tours */}
                    <Link
                        to="/excursions"
                        className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-300 p-6 sm:p-8"
                    >
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Package className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Browse Excursions</h3>
                                <p className="text-sm sm:text-base text-gray-600">Explore new adventures</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 font-semibold py-3 px-8 text-sm sm:text-base rounded-2xl transition-all transform hover:scale-105 shadow-lg border border-gray-200"
                        to={"/"}
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}