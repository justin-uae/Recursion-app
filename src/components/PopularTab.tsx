import { useEffect, useRef, useMemo } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllExcursions } from '../slices/productsSlice';

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
        return (
            <div className="flex justify-center items-center py-20 text-gray-600">
                Loading excursions...
            </div>
        );
    }

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-4xl font-bold text-gray-900">Popular Tours</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Tours Scrollable Row */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
                >
                    {topTours.map((tour) => (
                        <div
                            key={tour.id}
                            className="group cursor-pointer min-w-[250px] md:min-w-[300px] lg:min-w-[280px] flex-shrink-0"
                            onClick={() => goToDetail(tour.id)}
                        >
                            {/* Image */}
                            <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={`${tour.images[0]}?width=600&height=500&crop=center`}
                                    alt={tour.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Price Badge */}
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        {tour.price && (
                                            <div className="flex items-baseline gap-3 mb-2">
                                                {/* Original (Strikethrough) Price */}
                                                <span className="text-sm text-gray-500 line-through">
                                                    <span className="text-sm font-semibold text-gray-500">AED</span>
                                                    {tour.price + 60}
                                                </span>
                                                {/* Discount Percentage */}
                                                <span className="text-lg font-bold text-gray-900">
                                                    ${tour.price}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="px-1">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-500">{tour.location}</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-900">
                                            {tour.rating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {tour.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link to={"/excursions"}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors">
                            View All Tours
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}