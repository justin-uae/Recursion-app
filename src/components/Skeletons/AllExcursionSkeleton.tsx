import { ExcursionCardSkeleton } from "./ExcursionCardSkeleton";

export const FilterSidebarSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-20"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-16"></div>
        </div>

        <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
            ))}
        </div>
    </div>
);

// Hero Section Skeleton
export const HeroSectionSkeleton = () => (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="h-12 bg-white/20 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
            <div className="h-14 bg-white/30 rounded-full w-full max-w-2xl mx-auto animate-pulse"></div>
        </div>
    </div>
);

// Full Loading State with Skeleton
export const LoadingStateWithSkeleton = () => (
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

        {/* Hero Skeleton */}
        <HeroSectionSkeleton />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Skeleton */}
                <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                    <FilterSidebarSkeleton />
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Sort and Results Skeleton */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-48"></div>
                        <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-48"></div>
                    </div>

                    {/* Cards Grid Skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <ExcursionCardSkeleton key={index} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    </div>
);