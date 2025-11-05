import { useEffect, useRef, useMemo } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllExcursions } from '../slices/productsSlice';
import { PopularToursSkeletonLoader } from './Skeletons/PopularToursSkeletonLoader';

export default function PopularTours() {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const { products: tours, loading } = useAppSelector((state) => state.products);

    // Fetch excursions on mount
    useEffect(() => {
        dispatch(fetchAllExcursions());
    }, [dispatch]);

    // Get top 10 tours with useMemo for performance
    const topTours = useMemo(() => {
        return tours.slice(0, 10);
    }, [tours]);

    const goToDetail = (productId: string) => {
        const numericId = productId?.split('/').pop() || productId;
        navigate(`/excursion/${numericId}`);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8; // scroll 80% of visible area
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (loading) {
        return <PopularToursSkeletonLoader />;
    }

    return (
        <div className="bg-white py-8 sm:py-12 md:py-16">
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

                /* Hide scrollbar for all browsers */
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                /* Fix for mobile tour image display */
                .tour-card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    display: block;
                    min-height: 100%;
                    min-width: 100%;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Popular Tours</h2>
                    <div className="hidden sm:flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 md:p-3 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 md:p-3 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Tours Scrollable Row */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
                >
                    {topTours.map((tour) => (
                        <div
                            key={tour.id}
                            className="group cursor-pointer min-w-[240px] sm:min-w-[260px] md:min-w-[300px] lg:min-w-[280px] flex-shrink-0"
                            onClick={() => goToDetail(tour.id)}
                        >
                            {/* Image */}
                            <div className="relative h-56 sm:h-60 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 bg-gray-200">
                                <img
                                    src={tour.images[0]}
                                    alt={tour.title}
                                    className="tour-card-image group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                    onError={(e) => {
                                        console.error('Tour image failed to load:', tour.images[0]);
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600';
                                    }}
                                />

                                {/* Price Badge */}
                                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-md">
                                    {tour.price && (
                                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                                            {/* Original (Strikethrough) Price */}
                                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                                                <span className="font-semibold">AED</span>
                                                {tour.price + 60}
                                            </span>
                                            {/* Current Price */}
                                            <span className="text-base sm:text-lg font-bold text-gray-900">
                                                AED {tour.price}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-1">
                                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                                    <span className="text-xs sm:text-sm text-gray-500 truncate max-w-[60%]">{tour.location}</span>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                            {tour.rating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                    {tour.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-8 sm:mt-10 md:mt-12">
                    <Link to={"/excursions"}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full transition-colors shadow-md hover:shadow-lg">
                            View All Tours
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}