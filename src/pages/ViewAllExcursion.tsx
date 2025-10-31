import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllExcursions } from '../services/shopifyService';

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
    const [excursions, setExcursions] = useState<Product[]>([]);
    const [filteredExcursions, setFilteredExcursions] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('rating');

    const categories = [
        { value: 'all', label: 'All Tours' },
        { value: 'desert', label: 'Desert Safari' },
        { value: 'city', label: 'City Tours' },
        { value: 'water', label: 'Water Activities' },
        { value: 'adventure', label: 'Adventure' },
        { value: 'cultural', label: 'Cultural' },
    ];

    // Fetch excursions from Shopify
    useEffect(() => {
        fetchExcursions();
    }, []);

    const fetchExcursions = async () => {
        setLoading(true);
        try {
            const products = await getAllExcursions();
            setExcursions(products);
            setFilteredExcursions(products);
        } catch (error) {
            console.error('Error fetching excursions:', error);
            // TODO: Show error message to user
        } finally {
            setLoading(false);
        }
    };

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

        // Category filter - You'll need to add category logic based on your Shopify setup
        // Options: 
        // 1. Use product tags
        // 2. Use product type
        // 3. Add a category metafield
        if (selectedCategory !== 'all') {
            // Example: filter by title or description containing category keyword
            filtered = filtered.filter(exc =>
                exc.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                exc.description.toLowerCase().includes(selectedCategory.toLowerCase())
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
    }, [searchQuery, selectedCategory, sortBy, excursions]);

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSortBy('rating');
    };

    const activeFiltersCount = () => {
        let count = 0;
        if (selectedCategory !== 'all') count++;
        if (searchQuery) count++;
        return count;
    };

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                totalCount={excursions.length}
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
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            clearFilters={clearFilters}
                        />
                    </aside>

                    {/* Mobile Filter Drawer */}
                    {showMobileFilters && (
                        <MobileFilterDrawer
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
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
                            </p>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option value="rating">Highest Rated</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
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
const HeroSection = ({ searchQuery, setSearchQuery, totalCount }: any) => (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
                Explore Dubai & UAE
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
    categories,
    selectedCategory,
    setSelectedCategory,
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

        {/* Category Filter */}
        <FilterSection title="Category">
            {categories.map((cat: any) => (
                <label key={cat.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700">{cat.label}</span>
                </label>
            ))}
        </FilterSection>
    </div>
);

// Mobile Filter Drawer
const MobileFilterDrawer = ({
    categories,
    selectedCategory,
    setSelectedCategory,
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
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
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
const ExcursionCard = ({ excursion }: { excursion: Product }) => {
    const navigate = useNavigate();

    const goToDetail = (productId: string) => {
        console.log("productId", productId);
        const encodedId = encodeURIComponent(productId);
        navigate(`/excursion/${encodedId}`);

    };

    const hasDiscount = excursion.originalPrice && excursion.originalPrice > excursion.price;
    const discountPercentage = hasDiscount
        ? Math.round(((excursion.originalPrice! - excursion.price) / excursion.originalPrice!) * 100)
        : 0;

    return (
        <div
            className="bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
        >
            <div className="relative h-56 overflow-hidden"
                onClick={() => goToDetail(excursion.id)}
            >
                <img
                    src={`${excursion.images[0]}?width=400&height=300&crop=center`}
                    alt={excursion.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Location Badge */}
                {excursion.location && (
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-800 rounded-full shadow-md flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {excursion.location}
                        </span>
                    </div>
                )}

                {/* Discount Badge */}
                {hasDiscount && (
                    <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                            -{discountPercentage}%
                        </span>
                    </div>
                )}

                {/* Rating Badge */}
                {excursion.rating > 0 && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-md">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-semibold">{excursion.rating.toFixed(1)}</span>
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
                    {excursion.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {excursion.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    {/* Duration */}
                    {excursion.duration && (
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{excursion.duration}</span>
                        </div>
                    )}

                    {/* Reviews */}
                    {excursion.reviewsCount > 0 && (
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            <span>{excursion.reviewsCount} reviews</span>
                        </div>
                    )}

                    {/* Group Size */}
                    {excursion.groupSize && (
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>{excursion.groupSize}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold text-blue-600">
                                ${excursion.price.toFixed(2)}
                            </p>
                            {hasDiscount && (
                                <p className="text-sm text-gray-400 line-through">
                                    ${excursion.originalPrice!.toFixed(2)}
                                </p>
                            )}
                        </div>
                        <p className="text-xs text-gray-500">per person</p>
                    </div>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
                        onClick={() => goToDetail(excursion.id)}
                    >
                        View Detail
                    </button>
                </div>
            </div>
        </div>
    );
};

// Loading State
const LoadingState = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading experiences...</p>
        </div>
    </div>
);

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