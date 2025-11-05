export const ExcursionCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Image Skeleton */}
        <div className="relative h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            {/* Badges Skeleton */}
            <div className="absolute top-3 left-3">
                <div className="h-6 w-20 bg-white/50 rounded-full"></div>
            </div>
            <div className="absolute top-3 right-3">
                <div className="h-6 w-16 bg-white/50 rounded-full"></div>
            </div>
            <div className="absolute bottom-3 right-3">
                <div className="h-6 w-12 bg-white/50 rounded-full"></div>
            </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-5">
            {/* Title */}
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-3/4 mb-2"></div>

            {/* Description */}
            <div className="space-y-2 mb-4">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-full"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-5/6"></div>
            </div>

            {/* Icons row */}
            <div className="flex items-center gap-4 mb-4">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-16"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-20"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-16"></div>
            </div>

            {/* Price and button */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="space-y-1">
                    <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-20"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-16"></div>
                </div>
                <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-28"></div>
            </div>
        </div>
    </div>
);