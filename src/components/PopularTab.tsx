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
            const scrollAmount = scrollRef.current.clientWidth * 0.8;
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
                    className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {topTours.map((tour) => (
                        <div
                            key={tour.id}
                            className="group cursor-pointer w-[75vw] sm:w-[45vw] md:w-[300px] lg:w-[280px] flex-shrink-0"
                            onClick={() => goToDetail(tour.id)}
                        >
                            {/* Image */}
                            <div className="relative h-52 sm:h-56 md:h-60 lg:h-64 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 bg-gray-200">
                                <img
                                    src={tour.images[0]}
                                    alt={tour.title}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                    onError={(e) => {
                                        console.error('Tour image failed to load:', tour.images[0]);
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600';
                                    }}
                                />

                                {/* Price Badge */}
                                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 bg-white/95 backdrop-blur-sm rounded-full px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 shadow-md">
                                    {tour.price && (
                                        <div className="flex flex-col">
                                            {/* Original (Strikethrough) Price */}
                                            <span className="text-[10px] sm:text-xs text-gray-500 line-through leading-tight">
                                                <span className="font-semibold">AED </span>
                                                {tour.price + 60}
                                            </span>
                                            {/* Current Price */}
                                            <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight">
                                                AED {tour.price}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-1">
                                <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                                    <span className="text-[11px] sm:text-xs md:text-sm text-gray-500 truncate max-w-[60%]">{tour.location}</span>
                                    <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-900">
                                            {tour.rating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
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