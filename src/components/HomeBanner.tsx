import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchCollectionsWithProducts } from '../slices/productsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getMediaUrls } from '../services/shopifyService';

export default function HomepageBanner() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [bannerUrls, setBannerUrls] = useState<string[]>([]);
    const [loadingBanners, setLoadingBanners] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
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

    // Handle banner navigation
    const handleBannerNext = () => {
        if (bannerUrls.length > 0) {
            setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
        }
    };

    const handleBannerPrev = () => {
        if (bannerUrls.length > 0) {
            setCurrentBannerIndex((prev) => (prev - 1 + bannerUrls.length) % bannerUrls.length);
        }
    };

    // Get current banner image
    const currentBannerImage = bannerUrls[currentBannerIndex] || '';

    useEffect(() => {
        if (selectedLocation !== '') {
            console.log("selectedLocation", selectedLocation);
            navigate(`/excursions?location=${encodeURIComponent(selectedLocation)}`);
        }
    }, [selectedLocation, navigate])

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

    return (
        <div className="relative">
            {/* Hero Banner */}
            <div className="relative h-96">
                <div className="absolute inset-0 overflow-hidden">
                    {loadingBanners ? (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : currentBannerImage ? (
                        <>
                            <img
                                // src={currentBannerImage}
                                src={`${currentBannerImage}?width=900&height=900`}

                                alt="Banner"
                                className="w-full h-full object-cover transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-700/40 via-blue-900/30 to-purple-900/30"></div>
                        </>
                    ) : (
                        <>
                            <img
                                src="https://wallpaperaccess.com/full/646452.jpg"
                                alt="Jeddah"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-700/40 via-blue-900/30 to-purple-900/30"></div>
                        </>
                    )}
                </div>

                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-8 w-full">
                        <div className="max-w-2xl">
                            <h1 className="text-white text-5xl md:text-6xl font-bold mb-2">
                                MOST POPULAR
                            </h1>
                            <div className="mb-6">
                                <p className="text-white text-xl">Things To Do in</p>
                                <h2 className="text-white text-5xl md:text-6xl font-bold border-b-4 border-white inline-block pb-1">
                                    UAE
                                </h2>
                            </div>
                            <Link to={"/excursions"}>
                                <button 
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded transition-colors">
                                    View All
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                {bannerUrls.length > 1 && (
                    <>
                        <button
                            onClick={handleBannerPrev}
                            className="absolute right-20 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:bg-gray-100"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                            onClick={handleBannerNext}
                            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:bg-gray-100"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </>
                )}

                {/* Banner Indicators */}
                {bannerUrls.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                        {bannerUrls.map((_: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => setCurrentBannerIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentBannerIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Location Selector */}
            <div className="relative -mt-8 z-50 px-4">
                <div className="max-w-md mx-auto">
                    <div className="relative">
                        <button
                            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                            className="w-full bg-white rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 hover:shadow-xl transition-shadow border-2 border-gray-200"
                        >
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span className={selectedLocation ? "text-gray-900 font-medium" : "text-gray-500"}>
                                {selectedLocation || "Select Location"}
                            </span>
                        </button>

                        {showLocationDropdown && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl p-4 max-h-96 overflow-y-auto z-50 border border-gray-200">
                                {loading ? (
                                    <div className="text-center py-8 text-gray-500">
                                        Loading locations...
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                        {uniqueLocations?.map((city: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    handleCityClick(city?.location);
                                                    setShowLocationDropdown(false);
                                                }}
                                                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="w-full h-24 rounded-lg overflow-hidden">
                                                    <img
                                                        src={city?.images?.edges?.[0]?.node?.url || city?.image || 'https://via.placeholder.com/400x300'}
                                                        alt={city.location}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{city?.location}</span>
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
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Best Cities to Visit</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="bg-white border-2 border-gray-300 rounded-full p-2 hover:border-gray-400 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-700" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="bg-white border-2 border-gray-300 rounded-full p-2 hover:border-gray-400 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-500">
                            Loading best cities...
                        </div>
                    ) : (
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {bestCitiesToVisit.map((city: any, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => handleCityClick(city?.location)}
                                    className="relative min-w-[250px] md:min-w-[300px] lg:min-w-[350px] rounded-xl overflow-hidden shadow-lg group cursor-pointer h-64 hover:shadow-2xl transition-shadow"
                                >
                                    <img
                                        src={city?.images?.edges?.[0]?.node?.url || city?.image || 'https://via.placeholder.com/400x300'}
                                        alt={city.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-white text-2xl font-bold">{city?.location}</h3>
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