import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchCollectionsWithProducts } from '../slices/productsSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getMediaUrls } from '../services/shopifyService';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function HomepageBanner() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [bannerUrls, setBannerUrls] = useState<string[]>([]);
    const [loadingBanners, setLoadingBanners] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const autoRotateRef = useRef<any | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { collectionsWithProducts, loading } = useAppSelector((state) => state.products);

    // Fetch collections on mount
    useEffect(() => {
        dispatch(fetchCollectionsWithProducts());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowLocationDropdown(false);
            }
        };

        if (showLocationDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLocationDropdown]);

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
        if (bannerUrls.length > 1) {
            autoRotateRef.current = setInterval(() => {
                setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
            }, 5000);

            return () => {
                if (autoRotateRef.current) {
                    clearInterval(autoRotateRef.current);
                }
            };
        }
    }, [bannerUrls.length]);

    // Banner navigation functions
    const goToPreviousBanner = () => {
        // Reset auto-rotate timer
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }

        setCurrentBannerIndex((prev) =>
            prev === 0 ? bannerUrls.length - 1 : prev - 1
        );

        // Restart auto-rotate
        if (bannerUrls.length > 1) {
            autoRotateRef.current = setInterval(() => {
                setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
            }, 5000);
        }
    };

    const goToNextBanner = () => {
        // Reset auto-rotate timer
        if (autoRotateRef.current) {
            clearInterval(autoRotateRef.current);
        }

        setCurrentBannerIndex((prev) =>
            (prev + 1) % bannerUrls.length
        );

        // Restart auto-rotate
        if (bannerUrls.length > 1) {
            autoRotateRef.current = setInterval(() => {
                setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
            }, 5000);
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

    const bestCitiesToVisit = bestCitiesCollection?.citiesData  || [];

    // Get unique locations for dropdown
    const uniqueLocations = [
        ...new Map(
            bestCitiesToVisit?.map((city: any) => [city?.name, city])
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
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[30rem] group">
                <div className="absolute inset-0 overflow-hidden">
                    {loadingBanners || !currentBannerImage ? (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-teal-700/40 via-blue-900/30 to-purple-900/30">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                    ) : (
                        <>
                            <LazyLoadImage
                                loading='lazy'
                                src={`${currentBannerImage}?width=1920&height=1080`}
                                alt="Banner"
                                className="w-full h-full object-cover transition-opacity duration-500"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </>
                    )}
                </div>

                {/* Banner Navigation Arrows - Only show if more than 1 banner */}
                {bannerUrls.length > 1 && !loadingBanners && (
                    <>
                        {/* Left Arrow */}
                        <button
                            onClick={goToPreviousBanner}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                            aria-label="Previous banner"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={goToNextBanner}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                            aria-label="Next banner"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                        </button>

                        {/* Banner Indicators/Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {bannerUrls.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentBannerIndex(index);
                                        if (autoRotateRef.current) {
                                            clearInterval(autoRotateRef.current);
                                            autoRotateRef.current = setInterval(() => {
                                                setCurrentBannerIndex((prev) => (prev + 1) % bannerUrls.length);
                                            }, 5000);
                                        }
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all ${index === currentBannerIndex
                                        ? 'bg-white w-8'
                                        : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                    aria-label={`Go to banner ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}

                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-2xl">
                            <h1 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2">
                                MOST POPULAR
                            </h1>
                            <div className="mb-4 sm:mb-6">
                                <p className="text-white text-lg sm:text-xl md:text-2xl">Things To Do in</p>
                                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold border-b-4 border-white inline-block pb-1">
                                    UAE
                                </h2>
                            </div>
                            <Link to={"/excursions"}>
                                <button
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded transition-colors text-sm sm:text-base">
                                    View All
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Location Selector */}
            <div className="relative -mt-8 z-40 px-4">
                <div className="max-w-md mx-auto">
                    <div className="relative" ref={dropdownRef}>
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
                                                    handleCityClick(city?.name);
                                                    setShowLocationDropdown(false);
                                                }}
                                                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="w-full h-24 rounded-lg overflow-hidden">
                                                    <LazyLoadImage
                                                        loading='lazy'
                                                        src={city?.image|| 'https://via.placeholder.com/400x300'}
                                                        alt={city.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{city?.name}</span>
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
            <div className="bg-white py-8 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Best Cities to Visit</h2>
                        <div className="hidden sm:flex gap-2">
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
                                    onClick={() => handleCityClick(city?.name)}
                                    className="relative min-w-[250px] md:min-w-[300px] lg:min-w-[350px] rounded-xl overflow-hidden shadow-lg group cursor-pointer h-64 hover:shadow-2xl transition-shadow"
                                >
                                    <LazyLoadImage
                                        loading='lazy'
                                        src={city?.image || 'https://via.placeholder.com/400x300'}
                                        alt={city?.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-white text-2xl font-bold">{city?.name}</h3>
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