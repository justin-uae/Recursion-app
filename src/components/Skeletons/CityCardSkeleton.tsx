export const CityCardSkeleton = () => (
    <div className="relative min-w-[250px] md:min-w-[300px] lg:min-w-[350px] rounded-xl overflow-hidden shadow-lg h-64">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
            <div className="h-8 bg-white/30 rounded w-32 animate-pulse"></div>
        </div>
    </div>
);