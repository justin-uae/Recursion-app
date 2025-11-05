import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchCollectionsWithProducts } from '../slices/productsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getMediaUrls } from '../services/shopifyService';

// Skeleton Components
const BannerSkeleton = () => (
    <div className="relative h-64 sm:h-80 md:h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                <div className="max-w-2xl space-y-4">
                    <div className="h-12 sm:h-14 md:h-16 bg-white/20 rounded-lg w-64 sm:w-80 md:w-96 animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="h-5 sm:h-6 bg-white/20 rounded-lg w-40 sm:w-48 animate-pulse"></div>
                        <div className="h-12 sm:h-14 md:h-16 bg-white/20 rounded-lg w-48 sm:w-56 md:w-64 animate-pulse"></div>
                    </div>
                    <div className="h-10 sm:h-12 bg-white/30 rounded w-28 sm:w-32 animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

const LocationSelectorSkeleton = () => (
    <div className="relative -mt-6 sm:-mt-8 z-50 px-4">
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-5 bg-gray-300 rounded w-32 animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

const CityCardSkeleton = () => (
    <div className="relative min-w-[220px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] rounded-xl overflow-hidden h-48 sm:h-56 md:h-64 flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
            <div className="h-6 sm:h-7 md:h-8 bg-white/30 rounded w-24 sm:w-28 md:w-32 animate-pulse"></div>
        </div>
    </div>
);

const BestCitiesSkeleton = () => (
    <div className="bg-white py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="h-8 sm:h-9 bg-gray-300 rounded w-48 sm:w-56 md:w-64 animate-pulse"></div>
                <div className="hidden sm:flex gap-2">
                    <div className="w-9 h-9 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="w-9 h-9 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
            </div>
            <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-hidden pb-2">
                {[...Array(3)].map((_, index) => (
                    <CityCardSkeleton key={index} />
                ))}
            </div>
        </div>
    </div>
);

export default function HomepageBanner() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [bannerUrls, setBannerUrls] = useState<string[]>([]);
    const [loadingBanners, setLoadingBanners] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { collectionsWithProducts, loading } = useAppSelector((state) => state.products);

    // Fetch collections on mount
    useEffect(() => {
        dispatch(fetchCollectionsWithProducts());
    }, [dispatch]);

    // Fetch banner URLs from media IDs
    useEffect(() => {
        const fetchBannerUrls = async () => {
            const bannerCollection = collectionsWithProducts?.find((col: any) => col.handle === "banner");
            const mediaIds = bannerCollection?.bannerMediaIds || [];

            if (mediaIds.length > 0) {
                setLoadingBanners(true);
                try {
                    const urls = await getMediaUrls(mediaIds);
                    setBannerUrls(urls);
                } catch (error) {
                    console.error("Error fetching banner URLs:", error);
                } finally {
                    setLoadingBanners(false);
                }
            }
        };

        fetchBannerUrls();
    }, [collectionsWithProducts]);

    // Auto-rotate banner every 5 seconds
    useEffect(() => {
        if (bannerUrls.length > 0) {
            const interval = setInterval(() => {
                setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [bannerUrls.length]);

    // Get current banner image
    const currentBannerImage = bannerUrls[currentBannerIndex] || '';

    useEffect(() => {
        if (selectedLocation !== '') {
            console.log("selectedLocation", selectedLocation);
            navigate(`/excursions?location=${encodeURIComponent(selectedLocation)}`);
        }
    }, [selectedLocation, navigate]);

    // Get best cities to visit collection
    const bestCitiesCollection = collectionsWithProducts.find(
        (col: any) => col.handle === 'best-cities-to-visit'
    );

    const bestCitiesToVisit = bestCitiesCollection?.products || [];

    // Get unique locations for dropdown
    const uniqueLocations = [
        ...new Map(
            bestCitiesToVisit?.map((city: any) => [city?.location, city])
        ).values(),
    ];

    // Scroll Functionality
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8;
            const newScrollPosition =
                direction === 'left'
                    ? scrollLeft - scrollAmount
                    : scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleCityClick = (location: string) => {
        setSelectedLocation(location);
    };

    // Show full skeleton while loading
    if (loading && collectionsWithProducts.length === 0) {
        return (
            <div className="relative">
                <BannerSkeleton />
                <LocationSelectorSkeleton />
                <BestCitiesSkeleton />
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Hero Banner */}
            <div className="relative h-64 sm:h-80 md:h-96 bg-gray-900">
                <div className="absolute inset-0 overflow-hidden">
                    {loadingBanners ? (
                        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                    ) : currentBannerImage ? (
                        <>
                            <img
                                src={currentBannerImage}
                                alt="Banner"
                                className="w-full h-full object-cover object-center transition-opacity duration-500"
                                onError={(e) => {
                                    console.error('Banner image failed to load');
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-800/25 via-blue-800/20 to-purple-800/20"></div>
                        </>
                    ) : (
                        <>
                            <img
                                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200"
                                alt="Dubai"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-800/25 via-blue-800/20 to-purple-800/20"></div>
                        </>
                    )}
                </div>

                <div className="absolute inset-0 flex items-center z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        <div className="max-w-2xl">
                            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                                MOST POPULAR
                            </h1>
                            <div className="mb-4 sm:mb-6">
                                <p className="text-white text-base sm:text-lg md:text-xl drop-shadow-lg">Things To Do in</p>
                                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold border-b-2 sm:border-b-4 border-white inline-block pb-0.5 sm:pb-1 drop-shadow-lg">
                                    UAE
                                </h2>
                            </div>
                            <Link to={"/excursions"}>
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded transition-colors shadow-lg">
                                    View All
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Location Selector */}
            <div className="relative -mt-6 sm:-mt-8 z-50 px-4">
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <button
                            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                            className="w-full bg-white rounded-lg shadow-lg px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 hover:shadow-xl transition-shadow border-2 border-gray-200"
                        >
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                            <span className={`text-sm sm:text-base ${selectedLocation ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                                {selectedLocation || "Select Location"}
                            </span>
                        </button>

                        {showLocationDropdown && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl p-3 sm:p-4 max-h-80 sm:max-h-96 overflow-y-auto z-50 border border-gray-200">
                                {loading ? (
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 p-2 sm:p-3">
                                                <div className="w-full h-20 sm:h-24 rounded-lg bg-gray-300 animate-pulse"></div>
                                                <div className="h-3 sm:h-4 bg-gray-300 rounded w-16 sm:w-20 animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        {uniqueLocations?.map((city: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    handleCityClick(city?.location);
                                                    setShowLocationDropdown(false);
                                                }}
                                                className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="w-full h-20 sm:h-24 rounded-lg overflow-hidden bg-gray-200">
                                                    <img
                                                        src={city?.images?.edges?.[0]?.node?.url || city?.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400'}
                                                        alt={city.location}
                                                        className="w-full h-full object-cover object-center"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400';
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">{city?.location}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Best Cities to Visit Section */}
            <div className="bg-white py-8 sm:py-10 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Best Cities to Visit</h2>
                        <div className="hidden sm:flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="bg-white border-2 border-gray-300 rounded-full p-2 hover:border-gray-400 transition-colors"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="bg-white border-2 border-gray-300 rounded-full p-2 hover:border-gray-400 transition-colors"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-hidden pb-2">
                            {[...Array(3)].map((_, index) => (
                                <CityCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {bestCitiesToVisit.map((city: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => handleCityClick(city?.location)}
                                    className="relative min-w-[220px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] rounded-xl overflow-hidden shadow-lg group cursor-pointer h-48 sm:h-56 md:h-64 hover:shadow-2xl transition-shadow flex-shrink-0 bg-gray-200"
                                >
                                    <img
                                        src={city?.images?.edges?.[0]?.node?.url || city?.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800'}
                                        alt={city.title}
                                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                                        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold drop-shadow-lg">{city?.location}</h3>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}