import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, MapPin, Clock, Users, Calendar, Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchExcursionById } from '../slices/productsSlice';
import { addToCartAsync } from '../slices/cartSlice';

export default function ItemDetailpage() {
    const { id: encodedId } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Get product and cart state from Redux
    const { selectedProduct: excursion, loading } = useAppSelector((state) => state.products);
    const { checkout } = useAppSelector((state) => state.cart);

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [addingToCart, setAddingToCart] = useState(false);

    const id = decodeURIComponent(encodedId ?? '');

    // Fetch excursion details
    useEffect(() => {
        if (id) {
            dispatch(fetchExcursionById(id));
        }
    }, [id, dispatch]);

    const nextImage = () => {
        if (excursion) {
            setCurrentImageIndex((prev) => (prev + 1) % excursion.images.length);
        }
    };

    const prevImage = () => {
        if (excursion) {
            setCurrentImageIndex((prev) => (prev - 1 + excursion.images.length) % excursion.images.length);
        }
    };

    const totalGuests = adults + children;
    const subtotal = excursion && excursion?.price * totalGuests || 0;

    // Format date for display
    const formatDateDisplay = (dateString: string) => {
        if (!dateString) return 'Select a date';
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Handle Book Now
    const handleBookNow = async () => {
        if (!excursion) return;

        setAddingToCart(true);
        try {
            const result = await dispatch(
                addToCartAsync({
                    item: {
                        variantId: excursion.variants[0].id,
                        quantity: totalGuests,
                        title: `${excursion.title} - ${selectedDate}`,
                        price: excursion.price,
                        image: excursion.images[0],
                        productId: excursion.id,
                        customAttributes: {
                            date: selectedDate,
                            adults: adults.toString(),
                            children: children.toString(),
                            totalGuests: totalGuests.toString(),
                        }
                    },
                    currentCheckout: checkout
                })
            );

            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart. Please try again.');
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Loading excursion details...
            </div>
        );
    }

    if (!excursion) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Excursion not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Custom Styles for Date Picker */}
            <style>{`
                input[type="date"] {
                    position: relative;
                    cursor: pointer;
                }

                input[type="date"]::-webkit-calendar-picker-indicator {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: auto;
                    height: auto;
                    color: transparent;
                    background: transparent;
                    cursor: pointer;
                }

                input[type="date"]:hover {
                    border-color: #3B82F6 !important;
                }

                input[type="date"]:focus {
                    border-color: #3B82F6 !important;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
                }

                .date-input-wrapper {
                    position: relative;
                }

                .date-input-wrapper .calendar-icon {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    pointer-events: none;
                    color: #3B82F6;
                }
            `}</style>

            {/* Breadcrumb */}
            <div className="border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link to="/" className="hover:text-blue-600">Home</Link>
                        <span> / </span>
                        <Link to="/excursions" className="hover:text-blue-600">Excursions</Link>
                        <span> / </span>
                        <span className="text-gray-900">{excursion.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="relative">
                            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
                                <img
                                    src={excursion.images[currentImageIndex]}
                                    alt={excursion.title}
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                                >
                                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                                >
                                    <ChevronRight className="w-6 h-6 text-gray-900" />
                                </button>

                                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} / {excursion.images.length}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-3 mt-4">
                                {excursion.images.map((image: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-20 h-20 rounded-lg overflow-hidden ${index === currentImageIndex
                                            ? 'ring-2 ring-blue-600'
                                            : 'opacity-60 hover:opacity-100'
                                            } transition-all`}
                                    >
                                        <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title & Details */}
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                        {excursion.title}
                                    </h1>
                                    <div className="flex items-center gap-6 text-gray-600">
                                        {excursion.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-5 h-5" />
                                                <span>{excursion.location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold text-gray-900">
                                                {excursion.rating?.toFixed(1)}
                                            </span>
                                            <span>({excursion.reviewsCount} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsFavorite(!isFavorite)}
                                        className="p-3 rounded-full border border-gray-200 hover:border-gray-300 transition-colors"
                                    >
                                        <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                                    </button>
                                    <button className="p-3 rounded-full border border-gray-200 hover:border-gray-300 transition-colors">
                                        <Share2 className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-50 rounded-2xl p-6 text-center">
                                <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                    {excursion.duration || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-600">Duration</div>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-6 text-center">
                                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900 mb-1">
                                    {excursion.groupSize || 'N/A'}
                                </div>
                                <div className="text-sm text-gray-600">Group Size</div>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-6 text-center">
                                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900 mb-1">Daily</div>
                                <div className="text-sm text-gray-600">Availability</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                            <div
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: excursion.descriptionHtml }}
                            />
                        </div>

                        {/* What's Included */}
                        {excursion.whatsIncluded?.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                                <div className="space-y-3">
                                    {excursion.whatsIncluded.map((item: string, i: number) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                                                <Check className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Booking */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
                                {/* Price */}
                                <div className="mb-6">
                                    {excursion.originalPrice && (
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <span className="text-sm text-gray-500 line-through">
                                                ${excursion.originalPrice}
                                            </span>
                                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                                                {Math.round(
                                                    100 - (excursion.price / excursion.originalPrice) * 100
                                                )}
                                                % OFF
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-4xl font-bold text-gray-900">
                                        ${excursion.price}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">per person</div>
                                </div>

                                {/* Date Selection */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Select Date
                                        </label>

                                        {/* Date Display Box */}
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-3 border-2 border-blue-200">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-600 rounded-lg p-2">
                                                    <Calendar className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-xs text-gray-600 mb-1">Selected Date</div>
                                                    <div className="text-sm font-bold text-gray-900">
                                                        {formatDateDisplay(selectedDate)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Styled Date Input */}
                                        <div className="date-input-wrapper">
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                min={getTodayDate()}
                                                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-gray-900 hover:border-blue-400 cursor-pointer"
                                            />
                                            <Calendar className="calendar-icon w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Guests
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Adults</label>
                                                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 transition-colors">
                                                    <button
                                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                                        className="px-3 py-2 hover:bg-blue-50 transition-colors font-bold text-gray-700"
                                                        type="button"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 text-center font-bold text-gray-900">{adults}</span>
                                                    <button
                                                        onClick={() => setAdults(adults + 1)}
                                                        className="px-3 py-2 hover:bg-blue-50 transition-colors font-bold text-gray-700"
                                                        type="button"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Children</label>
                                                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 transition-colors">
                                                    <button
                                                        onClick={() => setChildren(Math.max(0, children - 1))}
                                                        className="px-3 py-2 hover:bg-blue-50 transition-colors font-bold text-gray-700"
                                                        type="button"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 text-center font-bold text-gray-900">{children}</span>
                                                    <button
                                                        onClick={() => setChildren(children + 1)}
                                                        className="px-3 py-2 hover:bg-blue-50 transition-colors font-bold text-gray-700"
                                                        type="button"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2 text-sm">
                                            <Users className="w-4 h-4 text-blue-600" />
                                            <span className="text-gray-700">
                                                Total: <span className="font-bold text-gray-900">{totalGuests}</span> {totalGuests === 1 ? 'guest' : 'guests'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-600">
                                            Subtotal ({totalGuests} {totalGuests === 1 ? 'guest' : 'guests'})
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2 mt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-blue-600">${subtotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBookNow}
                                    disabled={addingToCart}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/30"
                                >
                                    {addingToCart ? 'Adding to Cart...' : 'Book Now →'}
                                </button>

                                <p className="text-xs text-center text-gray-500 mt-4">
                                    Free cancellation up to 24 hours before
                                </p>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 bg-gray-50 rounded-2xl p-6">
                                <div className="text-center mb-4">
                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                        {excursion.rating?.toFixed(1)}/5
                                    </div>
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Based on {excursion.reviewsCount} reviews
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}