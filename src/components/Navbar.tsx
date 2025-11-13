import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, Mail, MapPin, LogOut, User as UserIcon, Calendar } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { logout } from '../slices/authSlice';
import { CurrencySwitcher } from './CurrencySwitcher';
import { clearOrders } from '../slices/ordersSlice';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Get auth state from Redux
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    // Get cart state from Redux
    const { items } = useAppSelector((state) => state.cart);

    // Calculate cart count from items
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Click-outside handler for desktop user menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    const handleLogout = () => {
        dispatch(clearOrders());
        dispatch(logout());
        setShowUserMenu(false);
        navigate('/login');
    };

    return (
        <>
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-10 text-sm">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3" />
                                <span>+971 54561 3397</span>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                <span>info@excursionsdubai.ae</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                <span className="hidden sm:inline">Hor Al Anz Building 101 , Dubai, UAE</span>
                                <span className="sm:hidden">UAE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                                    <span className="text-white font-bold text-xl">E</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Excursions Dubai
                                </span>
                                <span className="text-xs text-gray-500">Explore the Emirates</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/excursions"
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                            >
                                Tours & Excursions
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                            >
                                About Us
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>

                            <Link
                                to="/contact"
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
                            >
                                Contact
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </div>

                        {/* Right Side - User Menu or Login */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="border-r border-gray-200 pr-4">
                                <CurrencySwitcher />
                            </div>
                            <Link
                                to="/cart"
                                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ShoppingCart className="w-6 h-6 text-gray-700" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {isAuthenticated ? (
                                // User Menu
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm">
                                                {user?.email?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user?.email}</p>
                                            </div>

                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <UserIcon className="w-5 h-5" />
                                                <span>My Profile</span>
                                            </Link>

                                            <Link
                                                to="/bookings"
                                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Calendar className="w-5 h-5" />
                                                <span>My Bookings</span>
                                            </Link>

                                            <hr className="my-2 border-gray-100" />

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Login/Register Buttons
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-md"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-700 hover:text-blue-600 p-2"
                                aria-label="mobile-menu-button"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="lg:hidden pb-4 border-t">
                            <div className="flex flex-col space-y-1 pt-4">
                                <Link
                                    to="/"
                                    className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/excursions"
                                    className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Tours & Excursions
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About Us
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium py-3 px-4 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                                <div className="py-3 px-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg my-2">
                                    <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Currency</p>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <CurrencySwitcher />
                                    </div>
                                </div>

                                <div className="border-t pt-4 mt-4 px-4 space-y-3">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="px-3 py-2 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600">Signed in as</p>
                                                <p className="font-semibold text-gray-900 truncate">{user?.email}</p>
                                            </div>

                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 py-2"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <UserIcon className="w-5 h-5" />
                                                <span className="font-medium">My Profile</span>
                                            </Link>

                                            <Link
                                                to="/bookings"
                                                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 py-2"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <Calendar className="w-5 h-5" />
                                                <span className="font-medium">My Bookings</span>
                                            </Link>

                                            <Link
                                                to="/cart"
                                                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 py-2"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                <span className="font-medium">Cart</span>
                                                {cartCount > 0 && (
                                                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                        {cartCount}
                                                    </span>
                                                )}
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 text-red-600 hover:text-red-700 py-2"
                                            >
                                                <LogOut className="w-5 h-5" />
                                                <span className="font-medium">Sign Out</span>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="block text-center border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-full transition-colors"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Sign In
                                            </Link>

                                            <Link
                                                to="/register"
                                                className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-full"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}