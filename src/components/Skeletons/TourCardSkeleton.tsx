export const TourCardSkeleton = () => (
    <div className="min-w-[250px] md:min-w-[300px] lg:min-w-[280px] flex-shrink-0">
        {/* Image Skeleton */}
        <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>

            {/* Price Badge Skeleton */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-20"></div>
            </div>
        </div>

        {/* Content Skeleton */}
        <div className="px-1">
            <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-24"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-12"></div>
            </div>

            <div className="space-y-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-full"></div>
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-3/4"></div>
            </div>
        </div>
    </div>
);
