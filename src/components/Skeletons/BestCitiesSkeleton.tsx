import { CityCardSkeleton } from "./CityCardSkeleton";

export const BestCitiesSkeleton = () => (
    <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between mb-8">
                <div className="h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-64"></div>
                <div className="flex gap-2">
                    <div className="w-9 h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-9 h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full"></div>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-hidden">
                {[...Array(3)].map((_, index) => (
                    <CityCardSkeleton key={index} />
                ))}
            </div>
        </div>
    </div>
);
