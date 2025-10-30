import { useState, useEffect } from 'react';
import { Calendar, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCustomerOrders } from '../services/shopifyService';

export default function BookingsPage() {
    const { accessToken } = useAuth();
    const [bookings, setBookings] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                if (accessToken) {
                    const orders = await getCustomerOrders(accessToken);
                    setBookings(orders);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (accessToken) {
            fetchBookings();
        }
    }, [accessToken]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading your bookings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 text-xl">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
                    <p className="text-gray-600">View and manage your tour bookings</p>
                </div>

                {/* Bookings List */}
                {bookings.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Yet</h3>
                        <p className="text-gray-600 mb-6">Start exploring our amazing tours and create unforgettable memories!</p>
                        <a
                            href="/tours"
                            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all"
                        >
                            Browse Tours
                        </a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking: any) => (
                            <div key={booking.id} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                                <div className="p-6">
                                    {/* Booking Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                Order #{booking.orderNumber}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {new Date(booking.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-900">${booking.total}</div>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'FULFILLED' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'UNFULFILLED' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {booking.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Booking Items */}
                                    <div className="space-y-4">
                                        {booking.items.map(({ item, index }: any) => (
                                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-20 h-20 rounded-lg object-cover"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-900">${item.price * item.quantity}</div>
                                                    <div className="text-sm text-gray-600">${item.price} each</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}