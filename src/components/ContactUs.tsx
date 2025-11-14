import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactUsPage() {
    const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const FormspreeURL = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_URL}`;

        try {
            const response = await fetch(FormspreeURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setFormStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">Contact Us</h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600">We'd love to hear from you</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Send a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
                            >
                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                Send Message
                            </button>
                        </form>

                        {/* Status Messages */}
                        {formStatus === 'success' && (
                            <div className="mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl">
                                <p className="text-green-600 font-semibold text-sm sm:text-base">
                                    ✅ Your message has been sent successfully!
                                </p>
                            </div>
                        )}
                        {formStatus === 'error' && (
                            <div className="mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
                                <p className="text-red-600 font-semibold text-sm sm:text-base">
                                    ❌ Something went wrong. Please try again.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Get in Touch</h2>

                            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="bg-blue-100 p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Phone</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 break-all">+971 54561 3397</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="bg-purple-100 p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Email</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 break-all">info@excursionsdubai.ae</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="bg-pink-100 p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Address</h3>
                                        <p className="text-xs sm:text-sm text-gray-600">Hor Al Anz Building 101,</p>
                                        <p className="text-xs sm:text-sm text-gray-600">Dubai, UAE</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden h-56 sm:h-64">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.550738524595!2d55.33634431502644!3d25.27235938385582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d1e1e1e1e1f%3A0x1e1e1e1e1e1e1e1e!2sHor%20Al%20Anz%2C%20Dubai%2C%20UAE!5e0!3m2!1sen!2sae!4v1234567890123!5m2!1sen!2sae"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Hor Al Anz Building 101, Dubai, UAE"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}