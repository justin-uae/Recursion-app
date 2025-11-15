import { Check, ChevronRight, Mail } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const ExcursionDetailPageCommonSection = () => {
    return (
        <div className='lg:col-span-2 space-y-6 sm:space-y-8'>
            {/* How It Works - Common for all */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">1</span>
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Choose & Book</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Select your date and number of guests</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">2</span>
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Get Confirmation</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Receive instant email</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl sm:text-2xl font-bold text-blue-600">3</span>
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Enjoy Your Tour</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Show voucher and have a great time</p>
                    </div>
                </div>
            </div>
            {/* Need Help - Common for all */}

            <div>
                {/* Important Information - Common for all */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Important Information</h2>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="bg-amber-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                                </div>
                                <span className="text-sm sm:text-base text-gray-700">Bring water and stay hydrated, especially during summer months</span>
                            </div>

                            {/* Option 3: Contact */}
                            <div className="flex items-start gap-3">
                                <div className="bg-amber-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                                </div>
                                <span className="text-sm sm:text-base text-gray-700">Save our WhatsApp number for instant support during your tour</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-amber-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                                </div>
                                <span className="text-sm sm:text-base text-gray-700">Bring valid ID/passport for verification</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-amber-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                                </div>
                                <span className="text-sm sm:text-base text-gray-700">Comfortable clothing and footwear recommended</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-amber-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                                </div>
                                <span className="text-sm sm:text-base text-gray-700">Children must be accompanied by an adult</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-amber-100 rounded-full p-1 mt-0.5 flex-shrink-0">
                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                                </div>
                                <span className="text-sm sm:text-base text-gray-700">Subject to weather conditions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Why Book With Us - Common for all */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Why Book With Us</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                            <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-900">Best Price Guarantee</span>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                            <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-900">24/7 Customer Support</span>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                            <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-900">Secure Online Payment</span>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                            <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-900">Instant Confirmation</span>
                    </div>
                </div>
            </div>
            {/* FAQ - Common for all */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                    <details className="bg-gray-50 rounded-lg sm:rounded-xl p-4 group">
                        <summary className="font-semibold text-sm sm:text-base text-gray-900 cursor-pointer list-none flex items-center justify-between">
                            How do I receive my booking confirmation?
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-open:rotate-90 transition-transform" />
                        </summary>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            You'll receive an instant confirmation email with your booking details immediately after payment.
                        </p>
                    </details>
                    <details className="bg-gray-50 rounded-lg sm:rounded-xl p-4 group">
                        <summary className="font-semibold text-sm sm:text-base text-gray-900 cursor-pointer list-none flex items-center justify-between">
                            What should I bring?
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-open:rotate-90 transition-transform" />
                        </summary>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            We recommend bringing sunscreen, sunglasses, comfortable shoes, camera, and light clothing. Don't forget your ID/passport.
                        </p>
                    </details>
                    <details className="bg-gray-50 rounded-lg sm:rounded-xl p-4 group">
                        <summary className="font-semibold text-sm sm:text-base text-gray-900 cursor-pointer list-none flex items-center justify-between">
                            Can I modify my booking?
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-open:rotate-90 transition-transform" />
                        </summary>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            Yes, you can modify your booking up to 24 hours before the tour. Contact our support team via WhatsApp or email.
                        </p>
                    </details>
                    <details className="bg-gray-50 rounded-lg sm:rounded-xl p-4 group">
                        <summary className="font-semibold text-sm sm:text-base text-gray-900 cursor-pointer list-none flex items-center justify-between">
                            Are your tours safe and insured?
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-open:rotate-90 transition-transform" />
                        </summary>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            Absolutely! All our tours are fully licensed and insured. Our experienced guides are trained in safety protocols to ensure a secure experience.
                        </p>
                    </details>
                </div>
            </div>
            {/* What's Included */}
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Need Help?</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100">
                    <p className="text-sm sm:text-base text-gray-700 mb-4">
                        Have questions or need assistance with your booking? Our team is here to help 24/7.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="https://wa.me/971545613397"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm sm:text-base"
                        >
                            <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                            Chat on WhatsApp
                        </a>
                        <a
                            href="mailto:info@excursionsdubai.ae"
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm sm:text-base"
                        >
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExcursionDetailPageCommonSection