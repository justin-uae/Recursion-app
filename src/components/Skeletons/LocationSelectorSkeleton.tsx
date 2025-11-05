export const LocationSelectorSkeleton = () => (
    <div className="relative -mt-8 z-50 px-4">
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg px-4 py-3 border-2 border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-32"></div>
                </div>
            </div>
        </div>
    </div>
);