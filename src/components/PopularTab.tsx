import { useEffect, useState } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllExcursions } from '../services/shopifyService';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number | null;
    images: string[];
    location: string;
    duration: string;
    rating: number;
    reviewsCount: number;
    groupSize: string;
}

export default function PopularTours() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [tours, setTours] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch excursions from Shopify
    useEffect(() => {
        const fetchExcursions = async () => {
            try {
                const data = await getAllExcursions();
                console.log("data", data);

                setTours(data.slice(0, 8)); // only take first 8
            } catch (error) {
                console.error('Error fetching excursions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchExcursions();
    }, []);

    const toggleFavorite = (tourId: string) => {
        setFavorites((prev) =>
            prev.includes(tourId)
                ? prev.filter((id) => id !== tourId)
                : [...prev, tourId]
        );
    };

    const goToDetail = (productId: string) => {
        console.log("productId", productId);
        const encodedId = encodeURIComponent(productId);
        navigate(`/excursion/${encodedId}`);

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
                        <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition-colors">
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition-colors">
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tours.map((tour) => (
                        <div key={tour.id} className="group cursor-pointer"
                            onClick={() => goToDetail(tour.id)} // Navigate on card click
                        >
                            {/* Image */}
                            <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                                <img
                                    src={`${tour.images[0]}?width=600&height=500&crop=center`}
                                    alt={tour.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(tour.id)
                                    }}

                                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${favorites.includes(tour.id)
                                            ? 'fill-red-500 text-red-500'
                                            : 'text-gray-700'
                                            }`}
                                    />
                                </button>

                                {/* Price Badge */}
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        {tour.originalPrice && tour.originalPrice > tour.price && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ${tour.originalPrice}
                                            </span>
                                        )}
                                        <span className="text-lg font-bold text-gray-900">
                                            ${tour.price}
                                        </span>
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
