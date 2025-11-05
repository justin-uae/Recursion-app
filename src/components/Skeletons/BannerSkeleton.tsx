export const BannerSkeleton = () => (
    <div className="relative h-96">
        <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-700/40 via-blue-900/30 to-purple-900/30"></div>
        </div>

        <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
                <div className="max-w-2xl space-y-4">
                    <div className="h-14 bg-white/20 rounded-lg w-96 animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="h-6 bg-white/20 rounded-lg w-48 animate-pulse"></div>
                        <div className="h-14 bg-white/20 rounded-lg w-64 animate-pulse"></div>
                    </div>
                    <div className="h-12 bg-white/30 rounded w-32 animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);
