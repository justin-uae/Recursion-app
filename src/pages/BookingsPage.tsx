import { useEffect } from "react";
import { Home, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingsPage() {
    const shopifyAccountUrl = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/account`;
    const navigate = useNavigate();

    useEffect(() => {
        window.open(shopifyAccountUrl, "_blank");
    }, [shopifyAccountUrl]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
                <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-6" />
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Redirecting to your Shopify account</h2>
                <p className="text-sm text-gray-500">This may take a moment. Please wait...</p>
            </div>
            <button
                onClick={() => navigate("/")}
                className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300"
            >
                <Home className="w-5 h-5" />
                Go to Home Page
            </button>
        </div>
    );
}