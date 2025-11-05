import { TourCardSkeleton } from "./TourCardSkeleton";

export const PopularToursSkeletonLoader = () => (
    <div className="bg-white py-16">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-10">
                <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-64"></div>
                <div className="flex gap-2">
                    <div className="w-11 h-11 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-11 h-11 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                </div>
            </div>

            {/* Tours Skeleton Row */}
            <div className="flex gap-6 overflow-x-hidden">
                {[...Array(4)].map((_, index) => (
                    <TourCardSkeleton key={index} />
                ))}
            </div>

            {/* Button Skeleton */}
            <div className="text-center mt-12">
                <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full w-48 mx-auto"></div>
            </div>
        </div>
    </div>
);
