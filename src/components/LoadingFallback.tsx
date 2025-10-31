
export function BrandedFallback() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            <div className="text-center">
                {/* Desert/Travel themed icon animation */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            className="w-16 h-16 text-orange-500 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-ping opacity-25"></div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Dubai Excursions
                </h2>
                <p className="text-gray-600">
                    Loading your adventure...
                </p>
            </div>
        </div>
    );
}