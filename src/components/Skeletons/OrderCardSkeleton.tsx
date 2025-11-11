export const OrderCardSkeleton = () => (
    <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden border border-white/20 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-white/20 w-10 h-10 sm:w-14 sm:h-14 rounded-xl"></div>
                    <div className="h-6 sm:h-8 bg-white/20 rounded-lg w-32 sm:w-40"></div>
                </div>
                <div className="h-5 bg-white/20 rounded-lg w-24 sm:w-32 ml-9 sm:ml-0"></div>
            </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {[1, 2].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
                    <div className="w-full sm:w-24 md:w-28 h-48 sm:h-24 md:h-28 bg-slate-200 rounded-2xl"></div>
                    <div className="flex-1 space-y-3">
                        <div className="h-5 bg-slate-200 rounded-lg w-3/4"></div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="h-10 bg-slate-200 rounded-xl w-24"></div>
                            <div className="h-10 bg-slate-200 rounded-xl w-32"></div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between">
                    <div className="h-6 bg-slate-200 rounded-lg w-24"></div>
                    <div className="h-8 bg-slate-200 rounded-lg w-32"></div>
                </div>
            </div>
        </div>
    </div>
);
