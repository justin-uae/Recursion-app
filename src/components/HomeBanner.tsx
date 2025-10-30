import { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomepageBanner() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    const cities = [
        {
            name: "Abu Dhabi",
            image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=400&q=80"
        },
        {
            name: "Dubai City",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"
        },
        {
            name: "Ras al Khaimah",
            image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&q=80"
        },
        {
            name: "Jeddah",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
        },
        {
            name: "Muscat",
            image: "https://d1i3enf1i5tb1f.cloudfront.net/Tour-Images/Final/Burj-Khalifa-At-The-Top-Tickets-18/1759833985818_S.jpg"
        },
        {
            name: "Riyadh",
            image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=400&q=80"
        },
        {
            name: "Singapore City",
            image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80"
        },
        {
            name: "Al Ula",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
        }
    ];

    const bestCitiesToVisit = [
        {
            name: "Mecca",
            image: "https://d1i3enf1i5tb1f.cloudfront.net/Tour-Images/Final/Burj-Khalifa-At-The-Top-Tickets-18/1759833985818_S.jpg"
        },
        {
            name: "Dubai",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
        },
        {
            name: "Cairo",
            image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&q=80"
        },
        {
            name: "Istanbul",
            image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80"
        }
    ];

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
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/80 via-blue-900/30 to-purple-900/30"></div>
                </div>

                {/* Content */}
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

                {/* Navigation Arrows for Hero */}
                <button className="absolute right-20 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all">
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all">
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>

            {/* Location Selector - Outside overflow container */}
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

                        {/* Dropdown */}
                        {showLocationDropdown && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl p-4 max-h-96 overflow-y-auto z-50 border border-gray-200">
                                <div className="grid grid-cols-2 gap-3">
                                    {cities.map((city, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedLocation(city.name);
                                                setShowLocationDropdown(false);
                                            }}
                                            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-full h-24 rounded-lg overflow-hidden">
                                                <img
                                                    src={city.image}
                                                    alt={city.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">{city.name}</span>
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
                            <button className="bg-white border-2 border-gray-300 rounded-full p-2 hover:border-gray-400 transition-colors">
                                <ChevronLeft className="w-5 h-5 text-gray-700" />
                            </button>
                            <button className="bg-white border-2 border-gray-300 rounded-full p-2 hover:border-gray-400 transition-colors">
                                <ChevronRight className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bestCitiesToVisit.map((city, index) => (
                            <div
                                key={index}
                                className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer h-64"
                            >
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-white text-2xl font-bold">{city.name}</h3>
                                </div>
                                {index === 2 && (
                                    <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}