import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchAllExcursions } from '../slices/productsSlice';
import { LoadingStateWithSkeleton } from '../components/Skeletons/AllExcursionSkeleton';
import { ExcursionCard } from '../components/ExcursionCard';

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

const ViewAllExcursion = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { products: excursions, loading } = useAppSelector((state) => state.products);
    const [filteredExcursions, setFilteredExcursions] = useState<Product[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Get location from query parameter
    const locationFromQuery = searchParams.get('location') || '';

    // Filter states - Dubai and price-low as defaults
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(locationFromQuery || 'Dubai');
    const [sortBy, setSortBy] = useState('price-low');

    // Get unique locations from excursions - Dubai first, Abu Dhabi second, rest alphabetically
    const uniqueLocations = Array.from(
        new Set(excursions.map((exc: Product) => exc.location).filter(Boolean))
    ).map((location) => ({
        value: location,
        label: location,
    })).sort((a, b) => {
        // Dubai comes first
        if (a.value.toLowerCase() === 'dubai') return -1;
        if (b.value.toLowerCase() === 'dubai') return 1;

        // Abu Dhabi comes second
        if (a.value.toLowerCase() === 'abu dhabi') return -1;
        if (b.value.toLowerCase() === 'abu dhabi') return 1;

        // Rest alphabetically
        return a.value.localeCompare(b.value);
    });

    // Fetch excursions on mount
    useEffect(() => {
        dispatch(fetchAllExcursions());
    }, [dispatch]);

    // Update selected location when query parameter changes
    useEffect(() => {
        if (locationFromQuery) {
            setSelectedLocation(locationFromQuery);
        }
    }, [locationFromQuery]);

    // Filter and search logic
    useEffect(() => {
        let filtered = [...excursions];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(exc =>
                exc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exc.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Location filter
        if (selectedLocation) {
            filtered = filtered.filter(exc =>
                exc.location.toLowerCase() === selectedLocation.toLowerCase()
            );
        }

        // Sort
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredExcursions(filtered);
    }, [searchQuery, selectedLocation, sortBy, excursions]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedLocation('');
        setSortBy('price-low');
        navigate('/excursions');
    };

    const activeFiltersCount = () => {
        let count = 0;
        if (searchQuery) count++;
        if (selectedLocation) count++;
        return count;
    };

    if (loading) {
        return <LoadingStateWithSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
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

            {/* Hero Section */}
            <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                totalCount={excursions.length}
                selectedLocation={selectedLocation}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span className="font-medium">
                            Filters {activeFiltersCount() > 0 && `(${activeFiltersCount()})`}
                        </span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                        <FilterSidebar
                            uniqueLocations={uniqueLocations}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            clearFilters={clearFilters}
                        />
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {showMobileFilters && (
                        <MobileFilterDrawer
                            uniqueLocations={uniqueLocations}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            clearFilters={clearFilters}
                            onClose={() => setShowMobileFilters(false)}
                        />
                    )}

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Sort and Results */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <p className="text-gray-600">
                                <span className="font-semibold text-gray-800">{filteredExcursions.length}</span> {filteredExcursions.length === 1 ? 'experience' : 'experiences'} found
                                {selectedLocation && <span className="ml-2 text-blue-600">in {selectedLocation}</span>}
                            </p>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>

                        {/* Results Grid */}
                        {filteredExcursions.length === 0 ? (
                            <EmptyState clearFilters={clearFilters} />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredExcursions.map((excursion) => (
                                    <ExcursionCard key={excursion.id} excursion={excursion} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

// Hero Section Component
const HeroSection = ({ searchQuery, setSearchQuery, totalCount, selectedLocation }: any) => (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
                {selectedLocation ? `Explore ${selectedLocation}` : 'Explore Dubai & UAE'}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6">
                Discover {totalCount}+ unforgettable experiences
            </p>

            <div className="w-full">
                <div className="relative">
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search tours, activities, destinations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 md:py-4 rounded-full text-gray-800 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                    />
                </div>
            </div>
        </div>
    </div>
);

// Filter Sidebar Component
const FilterSidebar = ({
    uniqueLocations,
    selectedLocation,
    setSelectedLocation,
    clearFilters
}: any) => (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:underline"
            >
                Clear all
            </button>
        </div>

        {/* Location Filter */}
        <FilterSection title="Location">
            <button
                onClick={() => setSelectedLocation('')}
                className={`block w-full text-left px-2 py-2 rounded ${!selectedLocation ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-50'}`}
            >
                All Locations
            </button>
            {uniqueLocations.map((location: any) => (
                <button
                    key={location.value}
                    onClick={() => setSelectedLocation(location.value)}
                    className={`block w-full text-left px-2 py-2 rounded transition-colors ${selectedLocation === location.value ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-50 text-gray-700'
                        }`}
                >
                    {location.label}
                </button>
            ))}
        </FilterSection>
    </div>
);

// Mobile Filter Drawer
const MobileFilterDrawer = ({
    uniqueLocations,
    selectedLocation,
    setSelectedLocation,
    clearFilters,
    onClose
}: any) => (
    <>
        {/* Overlay */}
        <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
        />

        {/* Drawer */}
        <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 lg:hidden overflow-y-auto">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <FilterSidebar
                    uniqueLocations={uniqueLocations}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    clearFilters={clearFilters}
                />

                <button
                    onClick={onClose}
                    className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                    Show Results
                </button>
            </div>
        </div>
    </>
);

// Filter Section Component
const FilterSection = ({ title, children }: any) => (
    <div className="mb-6 pb-6 border-b border-gray-200 last:border-0">
        <h3 className="font-semibold text-gray-700 mb-3">{title}</h3>
        <div className="space-y-1">
            {children}
        </div>
    </div>
);

// Excursion Card Component

// Empty State
const EmptyState = ({ clearFilters }: any) => (
    <div className="text-center py-16 bg-white rounded-lg shadow-md">
        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tours found</h3>
        <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
        <button
            onClick={clearFilters}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
            Clear All Filters
        </button>
    </div>
);

export default ViewAllExcursion;