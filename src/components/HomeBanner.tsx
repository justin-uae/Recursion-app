import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCollectionsWithProducts } from '../services/shopifyService';

export default function HomepageBanner() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [bestCitiesToVisit, setBestCitiesToVisit] = useState<any[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const collections = await getCollectionsWithProducts();

                const bestCitiesCollection = collections.find(
                    (col: any) => col.handle === "best-cities-to-visit"
                );

                if (!bestCitiesCollection) {
                    console.warn("No 'Best Cities to Visit' collection found");
                    return;
                }

                const cityList = bestCitiesCollection.products.map((product: any) => ({
                    title: product.title,
                    image: product.image,
                    location: product.location,
                }));

                setBestCitiesToVisit(cityList);
            } catch (error) {
                console.error("Error fetching city collections:", error);
            }
        };

        fetchCities();
    }, []);

    // Scroll Functionality
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8; // scroll by 80% of visible width
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

    return (
        <div className="relative">
            {/* Hero Banner */}
            <div className="relative h-96">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://wallpaperaccess.com/full/646452.jpg"
                        alt="Jeddah"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-700/40 via-blue-900/30 to-purple-900/30"></div>
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
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded transition-colors">
                                BOOK NOW
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button className="absolute right-20 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all">
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all">
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
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
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        ...new Map(
                                            bestCitiesToVisit?.map((city) => [city?.location, city])
                                        ).values(), // 👈 ensures unique locations
                                    ]?.map((city, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedLocation(city?.location);
                                                setShowLocationDropdown(false);
                                            }}
                                            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-full h-24 rounded-lg overflow-hidden">
                                                <img
                                                    src={`${city?.image}?width=400&height=300&crop=center`}
                                                    alt={city.location}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{city?.location}</span>
                                        </button>
                                    ))}
                                </div>
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

                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {bestCitiesToVisit.map((city, index) => (
                            <div
                                key={index}
                                className="relative min-w-[250px] md:min-w-[300px] lg:min-w-[350px] rounded-xl overflow-hidden shadow-lg group cursor-pointer h-64"
                            >
                                <img
                                    src={`${city?.image}?width=400&height=300&crop=center`}
                                    alt={city.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white text-2xl font-bold">{city?.location}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}