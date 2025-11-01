import { Mail, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';

export default function ProfilePage() {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        My Profile
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Manage your account information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    {/* Gradient Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                        {/* Profile Image */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center text-blue-600 text-4xl sm:text-5xl font-bold shadow-md">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>

                        {/* Profile Info */}
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-1 break-all">{user?.email}</h2>
                            <p className="text-blue-100 text-sm sm:text-base">
                                Member since {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-6 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                            Account Information
                        </h3>

                        <div className="space-y-5 sm:space-y-6">
                            {/* Email */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-semibold text-gray-900 break-all">{user?.email}</p>
                                </div>
                            </div>

                            {/* Member Since */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Member Since</p>
                                    <p className="font-semibold text-gray-900">
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Location</p>
                                    <p className="font-semibold text-gray-900">United Arab Emirates</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                        to={"/"}
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}