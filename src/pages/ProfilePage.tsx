import { Mail, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';

export default function ProfilePage() {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className="min-h-screen bg-gray-50 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        My Profile
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Manage your account information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                    {/* Gradient Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8">
                        {/* Profile Image */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center text-blue-600 text-3xl sm:text-4xl md:text-5xl font-bold shadow-md flex-shrink-0">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>

                        {/* Profile Info */}
                        <div className="text-center sm:text-left flex-1 min-w-0">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 break-words">{user?.email}</h2>
                            <p className="text-blue-100 text-xs sm:text-sm md:text-base">
                                Member since {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-5 sm:p-6 md:p-8">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">
                            Account Information
                        </h3>

                        <div className="space-y-4 sm:space-y-5 md:space-y-6">
                            {/* Email */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 mb-0.5">Email</p>
                                    <p className="font-semibold text-sm sm:text-base text-gray-900 break-words">{user?.email}</p>
                                </div>
                            </div>

                            {/* Member Since */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 mb-0.5">Member Since</p>
                                    <p className="font-semibold text-sm sm:text-base text-gray-900">
                                        {new Date().toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 mb-0.5">Location</p>
                                    <p className="font-semibold text-sm sm:text-base text-gray-900">United Arab Emirates</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6 sm:mt-8">
                    <Link
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 sm:px-8 text-sm sm:text-base rounded-full transition-all transform hover:scale-105 shadow-lg"
                        to={"/"}
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}