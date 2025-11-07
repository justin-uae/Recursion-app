export function BrandedFallback() {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            {/* Animated Background Particles */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.7 + 0.3
                        }}
                    />
                ))}
            </div>

            {/* Main Loader Container */}
            <div className="relative z-10 text-center">
                {/* Circular Loader with Rings */}
                <div className="relative w-40 h-40 mx-auto mb-8">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin-slow"></div>
                    
                    {/* Middle Ring */}
                    <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-cyan-400 border-r-pink-400 animate-spin-reverse"></div>
                    
                    {/* Inner Ring */}
                    <div className="absolute inset-6 rounded-full border-4 border-transparent border-t-indigo-400 border-r-violet-400 animate-spin-slower"></div>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {/* Plane Icon */}
                            <svg
                                className="w-16 h-16 text-white animate-pulse-scale"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                            </svg>
                            
                            {/* Glowing Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Orbiting Dots */}
                    <div className="absolute inset-0 animate-spin-orbital">
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full -translate-x-1/2 shadow-lg shadow-cyan-500/50"></div>
                    </div>
                    <div className="absolute inset-0 animate-spin-orbital-reverse">
                        <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full -translate-x-1/2 shadow-lg shadow-pink-500/50"></div>
                    </div>
                </div>

                {/* Brand Text */}
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                        Dubai Excursions
                    </h1>
                    
                    {/* Animated Subtitle */}
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                        <span className="text-lg font-medium animate-fade-in">Discovering</span>
                        <span className="text-lg font-bold text-cyan-400 animate-text-glow">adventures</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-64 h-1 mx-auto bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-progress rounded-full"></div>
                    </div>

                    {/* Loading Dots */}
                    <div className="flex items-center justify-center gap-2 pt-4">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce-dot shadow-lg shadow-cyan-400/50"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce-dot shadow-lg shadow-blue-400/50" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce-dot shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top Right */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-float-slow"></div>
                
                {/* Bottom Left */}
                <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-float-slower"></div>
                
                {/* Middle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>

            {/* Custom Animations */}
            <style>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes spin-reverse {
                    from {
                        transform: rotate(360deg);
                    }
                    to {
                        transform: rotate(0deg);
                    }
                }

                @keyframes spin-slower {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes spin-orbital {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes spin-orbital-reverse {
                    from {
                        transform: rotate(360deg);
                    }
                    to {
                        transform: rotate(0deg);
                    }
                }

                @keyframes pulse-scale {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                @keyframes fade-in {
                    0%, 50% {
                        opacity: 0.5;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                @keyframes text-glow {
                    0%, 100% {
                        text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
                    }
                    50% {
                        text-shadow: 0 0 20px rgba(34, 211, 238, 0.8), 0 0 30px rgba(34, 211, 238, 0.6);
                    }
                }

                @keyframes progress {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                @keyframes bounce-dot {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }

                @keyframes float-slow {
                    0%, 100% {
                        transform: translate(0, 0);
                    }
                    50% {
                        transform: translate(20px, -20px);
                    }
                }

                @keyframes float-slower {
                    0%, 100% {
                        transform: translate(0, 0);
                    }
                    50% {
                        transform: translate(-30px, 30px);
                    }
                }

                @keyframes twinkle {
                    0%, 100% {
                        opacity: 0.3;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.5);
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 0.1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.2;
                        transform: scale(1.05);
                    }
                }

                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }

                .animate-spin-reverse {
                    animation: spin-reverse 2s linear infinite;
                }

                .animate-spin-slower {
                    animation: spin-slower 4s linear infinite;
                }

                .animate-spin-orbital {
                    animation: spin-orbital 3s linear infinite;
                }

                .animate-spin-orbital-reverse {
                    animation: spin-orbital-reverse 4s linear infinite;
                }

                .animate-pulse-scale {
                    animation: pulse-scale 2s ease-in-out infinite;
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                .animate-fade-in {
                    animation: fade-in 2s ease-in-out infinite;
                }

                .animate-text-glow {
                    animation: text-glow 2s ease-in-out infinite;
                }

                .animate-progress {
                    animation: progress 1.5s ease-in-out infinite;
                }

                .animate-bounce-dot {
                    animation: bounce-dot 1s ease-in-out infinite;
                }

                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }

                .animate-float-slower {
                    animation: float-slower 8s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}