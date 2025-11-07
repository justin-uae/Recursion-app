import { useNavigate } from "react-router-dom";
import { LazyImage } from "./LazyImage";
import { useCurrency } from "../hooks/useCurrency";
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

export const ExcursionCard = ({ excursion }: { excursion: Product }) => {
    const navigate = useNavigate();
    const { formatPrice } = useCurrency();

    const goToDetail = (productId: string) => {
        const numericId = productId.split('/').pop() || productId;
        navigate(`/excursion/${numericId}`);
    };

    return (
        <div className="bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="relative h-56 overflow-hidden"
                onClick={() => goToDetail(excursion.id)}
            >
                <LazyImage
                    src={`${excursion.images[0]}?width=400&height=300&crop=center`}
                    alt={excursion.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                {excursion.price && (
                    <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
                            {(Math.round(((60) / ((excursion.price) + 60)) * 100))}% OFF
                        </span>
                        {/* possible bug in future */}
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
                                {/* <span className="text-sm font-semibold text-gray-500">{selectedCurrency?.symbol}</span> */}
                                {formatPrice(excursion.price)}
                            </p>
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
