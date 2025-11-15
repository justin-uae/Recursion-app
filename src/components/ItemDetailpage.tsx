import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Calendar, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchExcursionById } from '../slices/productsSlice';
import { addToCartAsync } from '../slices/cartSlice';
import { LazyImage } from './LazyImage';
import { BookingSkeleton, DetailsSkeleton, ImageGallerySkeleton } from './Skeletons/ItemDetailPage';
import { FaWhatsapp } from 'react-icons/fa';
import { useCurrency } from '../hooks/useCurrency';
import ExcursionDetailPageCommonSection from './ExcursionDetailPageCommonSection';

export default function ItemDetailpage() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Get product and cart state from Redux
    const { selectedProduct: excursion, loading } = useAppSelector((state) => state.products);
    const { formatPrice } = useCurrency();

    const { checkout } = useAppSelector((state) => state.cart);

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [addingToCart, setAddingToCart] = useState(false);

    // Fetch excursion details
    useEffect(() => {
        if (id) {
            const gidId = id.startsWith('gid://') ? id : `gid://shopify/Product/${id}`;
            dispatch(fetchExcursionById(gidId));
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

    const pricePerPerson = excursion?.price || 0; // This is in AED from Shopify
    const subtotal = formatPrice(pricePerPerson * totalGuests);

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

    const handleWhatsAppInquiry = () => {
        if (!excursion) return;

        const phoneNumber = `${import.meta.env.VITE_CONTACT_NUMBER}`; // UAE format: 971 + number without leading zero
        console.log("phoneNumber", phoneNumber);

        const message = `Hi! I'm interested in booking this excursion:

    📍 *${excursion.title}*
    ${excursion.location ? `📌 Location: ${excursion.location}` : ''}

    *Booking Details:*
    📅 Date: ${formatDateDisplay(selectedDate)}
    👥 Adults: ${adults}
    👶 Children: ${children}
    🎟️ Total Guests: ${totalGuests}

    💰 Total Price: AED ${subtotal}

    Can you help me with the booking?`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
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
                        price: excursion?.price,
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
            <div className="min-h-screen bg-white">
                {/* Custom Styles for Date Picker */}
                <style>{`
                    @keyframes shimmer {
                        0% {
                            background-position: -1000px 0;
                        }
                        100% {
                            background-position: 1000px 0;
                        }
                    }

                    .animate-pulse {
                        animation: shimmer 2s infinite;
                        background-size: 1000px 100%;
                    }
                `}</style>

                {/* Breadcrumb Skeleton */}
                <div className="border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-48 sm:w-64" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                        {/* Left Column - Skeletons */}
                        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                            <ImageGallerySkeleton />
                            <DetailsSkeleton />
                        </div>

                        {/* Right Column - Skeleton */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4 sm:top-8">
                                <BookingSkeleton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!excursion) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600 px-4">
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

                @keyframes shimmer {
                    0% {
                        background-position: -1000px 0;
                    }
                    100% {
                        background-position: 1000px 0;
                    }
                }

                .animate-pulse {
                    animation: shimmer 2s infinite;
                    background-size: 1000px 100%;
                }
            `}</style>

            {/* Breadcrumb */}
            <div className="border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
                        <Link to="/" className="hover:text-blue-600">Home</Link>
                        <span> / </span>
                        <Link to="/excursions" className="hover:text-blue-600">Excursions</Link>
                        <span> / </span>
                        <span className="text-gray-900 truncate">{excursion.title}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                    {/* Left Column - Images & Details */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {/* Image Gallery */}
                        <div className="relative">
                            <div className="relative aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden">
                                <LazyImage
                                    src={excursion.images[currentImageIndex]}
                                    alt={excursion.title}
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full transition-all"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full transition-all"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                                </button>

                                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/50 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                    {currentImageIndex + 1} / {excursion.images.length}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2">
                                {excursion.images.map((image: string, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 ${index === currentImageIndex
                                            ? 'ring-2 ring-blue-600'
                                            : 'opacity-60 hover:opacity-100'
                                            } transition-all`}
                                    >
                                        <LazyImage
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title & Details */}
                        <div>
                            <div className="flex items-start justify-between mb-3 sm:mb-4 gap-3">
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                                        {excursion.title}
                                    </h1>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-600">
                                        {excursion.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                                <span className="truncate">{excursion.location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                                            <span className="font-semibold text-gray-900">
                                                {excursion.rating?.toFixed(1)}
                                            </span>
                                            <span className="truncate">({excursion.reviewsCount} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1.5 sm:mb-2" />
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                                    {excursion.duration || 'N/A'}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">Duration</div>
                            </div>
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1.5 sm:mb-2" />
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                                    {excursion.groupSize || 'N/A'}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">Group Size</div>
                            </div>
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
                                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-1.5 sm:mb-2" />
                                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">Daily</div>
                                <div className="text-xs sm:text-sm text-gray-600">Availability</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Overview</h2>
                            <div
                                className="text-sm sm:text-base text-gray-700 leading-relaxed prose prose-sm sm:prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: excursion.descriptionHtml }}
                            />
                        </div>
                        <ExcursionDetailPageCommonSection />
                    </div>

                    {/* Right Column - Booking */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 sm:top-8">
                            <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-lg">
                                {/* Price */}
                                <div className="mb-5 sm:mb-6">
                                    {excursion.price && (
                                        <div className="flex items-baseline gap-2 sm:gap-3 mb-2">
                                            {/* Original (Strikethrough) Price */}
                                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                                                {/* <span className="font-semibold"></span> */}
                                                {formatPrice(excursion.price + 60)}
                                            </span>
                                            {/* Discount Percentage */}
                                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                                                {Math.round(((60) / (excursion.price + 60)) * 100)}% OFF
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                                        {/* <span className="text-sm font-semibold text-gray-500">AED</span> */}
                                        {formatPrice(excursion.price)}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 mt-1">per person</div>
                                </div>

                                {/* Date Selection */}
                                <div className="space-y-3.5 sm:space-y-4 mb-5 sm:mb-6">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                                            Select Date
                                        </label>

                                        {/* Date Display Box */}
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2.5 sm:mb-3 border-2 border-blue-200">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="bg-blue-600 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs text-gray-600 mb-0.5 sm:mb-1">Selected Date</div>
                                                    <div className="text-xs sm:text-sm font-bold text-gray-900 truncate">
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
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium text-sm sm:text-base text-gray-900 hover:border-blue-400 cursor-pointer"
                                            />
                                            <Calendar className="calendar-icon w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
                                            Guests
                                        </label>
                                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Adults</label>
                                                <div className="flex items-center border-2 border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-blue-400 transition-colors">
                                                    <button
                                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                                        className="px-2.5 sm:px-3 py-2 hover:bg-blue-50 transition-colors font-bold text-gray-700 text-sm sm:text-base"
                                                        type="button"
                                                        aria-label="Decrease adults"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 text-center font-bold text-gray-900 text-sm sm:text-base">{adults}</span>
                                                    <button
                                                        onClick={() => setAdults(adults + 1)}
                                                        className="px-2.5 sm:px-3 py-2 hover:bg-blue-50 transition-colors font-bold text-gray-700 text-sm sm:text-base"
                                                        type="button"
                                                        aria-label="Increase adults"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Children</label>
                                                <div className="flex items-center border-2 border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-blue-400 transition-colors">
                                                    <button
                                                        onClick={() => setChildren(Math.max(0, children - 1))}
                                                        className="px-2.5 sm:px-3 py-2 hover:bg-blue-50 transition-colors font-bold text-gray-700 text-sm sm:text-base"
                                                        type="button"
                                                        aria-label="Decrease children"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 text-center font-bold text-gray-900 text-sm sm:text-base">{children}</span>
                                                    <button
                                                        onClick={() => setChildren(children + 1)}
                                                        className="px-2.5 sm:px-3 py-2 hover:bg-blue-50 transition-colors font-bold text-gray-700 text-sm sm:text-base"
                                                        type="button"
                                                        aria-label="Increase children"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                                            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                                            <span className="text-gray-700">
                                                Total: <span className="font-bold text-gray-900">{totalGuests}</span> {totalGuests === 1 ? 'guest' : 'guests'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3.5 sm:p-4 mb-5 sm:mb-6">
                                    <div className="flex items-center justify-between mb-2 text-xs sm:text-sm">
                                        <span className="text-gray-600">
                                            Subtotal ({totalGuests} {totalGuests === 1 ? 'guest' : 'guests'})
                                        </span>
                                        <span className="font-semibold text-gray-900">
                                            {/* <span className="text-xs sm:text-sm font-semibold text-gray-500">AED</span> */}
                                            {subtotal}
                                        </span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2 mt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-xl sm:text-2xl font-bold text-blue-600">
                                                {/* <span className="text-xs sm:text-sm font-semibold text-gray-500">AED</span> */}
                                                {subtotal}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleBookNow}
                                        disabled={addingToCart}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/30"
                                    >
                                        {addingToCart ? 'Adding to Cart...' : 'Book Now →'}
                                    </button>
                                    <button
                                        onClick={handleWhatsAppInquiry}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                                    >
                                        Inquire via WhatsApp
                                        <FaWhatsapp className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-xs text-center text-gray-500 mt-3 sm:mt-4">
                                    Free cancellation up to 24 hours before
                                </p>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-4 sm:mt-6 bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                <div className="text-center mb-3 sm:mb-4">
                                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                                        {excursion.rating?.toFixed(1)}/5
                                    </div>
                                    <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600">
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