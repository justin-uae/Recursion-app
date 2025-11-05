export const ImageGallerySkeleton = () => (
    <div className="relative">
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        <div className="flex gap-3 mt-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            ))}
        </div>
    </div>
);

export const DetailsSkeleton = () => (
    <div className="space-y-8">
        {/* Title Skeleton */}
        <div>
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg w-3/4 mb-3" />
            <div className="flex items-center gap-6">
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-32" />
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-24" />
            </div>
        </div>

        {/* Quick Info Skeleton */}
        <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded mx-auto mb-2" />
                    <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-16 mx-auto mb-1" />
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-20 mx-auto" />
                </div>
            ))}
        </div>

        {/* Description Skeleton */}
        <div>
            <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-32 mb-4" />
            <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-full" />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-full" />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-3/4" />
            </div>
        </div>

        {/* What's Included Skeleton */}
        <div>
            <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-40 mb-4" />
            <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full" />
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-full" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const BookingSkeleton = () => (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
        {/* Price Skeleton */}
        <div className="mb-6">
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-32 mb-2" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-20" />
        </div>

        {/* Date Selection Skeleton */}
        <div className="space-y-4 mb-6">
            <div>
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-24 mb-2" />
                <div className="h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl mb-3" />
                <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl" />
            </div>

            {/* Guests Skeleton */}
            <div>
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-16 mb-2" />
                <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl" />
                    <div className="h-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl" />
                </div>
            </div>
        </div>

        {/* Total Skeleton */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-32 mb-2" />
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-24" />
        </div>

        {/* Button Skeleton */}
        <div className="h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl" />
    </div>
);