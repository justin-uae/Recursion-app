import { CheckCircle, ArrowRight } from "lucide-react";

export default function OrderConfirmation() {
  const order = JSON.parse(localStorage.getItem("currentOrder") || "{}");

  if (!order || !order.orderNumber) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">No order found. Please return to checkout.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-lg w-full border border-gray-100">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed! 🎉</h1>
        <p className="text-gray-600 mb-6">
          Your booking <strong>{order.orderNumber}</strong> has been placed successfully.
        </p>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-5 mb-6 text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h3>
          <p className="text-sm text-gray-600 mb-1">Name: {order.customer?.name}</p>
          <p className="text-sm text-gray-600 mb-1">Email: {order.customer?.email}</p>
          <p className="text-sm text-gray-600 mb-1">Phone: {order.customer?.phone}</p>
          <p className="text-sm text-gray-600">
            Total: <strong>AED {order.total?.toFixed(2)}</strong>
          </p>
        </div>

        <a
          href="/excursions"
          className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          Continue Exploring <ArrowRight className="w-5 h-5 ml-2" />
        </a>
      </div>
    </div>
  );
}
