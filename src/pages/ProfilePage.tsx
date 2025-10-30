import { Mail, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                                <span className="text-4xl font-bold text-blue-600">
                                    {user?.email?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-2">{user?.email}</h2>
                                <p className="text-blue-100">Member since {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-semibold text-gray-900">{user?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Member Since</p>
                                    <p className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-pink-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Location</p>
                                    <p className="font-semibold text-gray-900">United Arab Emirates</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {/* <div className="mt-8 flex gap-4">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                                Edit Profile
                            </button>
                            <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-xl transition-colors">
                                Change Password
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}