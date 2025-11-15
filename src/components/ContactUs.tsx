import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

function ContactForm() {
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [responseMessage, setResponseMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            setFormStatus('error');
            setResponseMessage('reCAPTCHA not loaded. Please refresh the page.');
            return;
        }

        setFormStatus('loading');
        setResponseMessage('');

        try {
            // Execute reCAPTCHA v3 (invisible)
            const recaptchaToken = await executeRecaptcha('contact_form');

            console.log('reCAPTCHA token generated');

            // Send form data with reCAPTCHA token
            const response = await fetch('https://www.excursionsdubai.ae/contact-handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    recaptchaToken
                })
            });

            const data = await response.json();

            if (response.ok) {
                setFormStatus('success');
                setResponseMessage(data.message || 'Your message has been sent successfully!');
                setFormData({ name: '', email: '', message: '' });

                setTimeout(() => {
                    setFormStatus('idle');
                    setResponseMessage('');
                }, 5000);
            } else {
                setFormStatus('error');
                setResponseMessage(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setFormStatus('error');
            setResponseMessage('Network error. Please check your connection and try again.');
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
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={formStatus === 'loading'}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={formStatus === 'loading'}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={formStatus === 'loading'}
                                    rows={5}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'loading'}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 text-sm sm:text-base rounded-lg sm:rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {formStatus === 'loading' ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {/* reCAPTCHA v3 Badge Notice */}
                            <p className="text-xs text-gray-500 text-center">
                                This site is protected by reCAPTCHA and the Google{' '}
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Privacy Policy
                                </a>{' '}
                                and{' '}
                                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Terms of Service
                                </a>{' '}
                                apply.
                            </p>
                        </form>

                        {/* Status Messages */}
                        {formStatus === 'success' && (
                            <div className="mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl">
                                <p className="text-green-600 font-semibold text-sm sm:text-base">
                                    ✅ {responseMessage}
                                </p>
                            </div>
                        )}
                        {formStatus === 'error' && (
                            <div className="mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
                                <p className="text-red-600 font-semibold text-sm sm:text-base">
                                    ❌ {responseMessage}
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
                                        <a href="tel:+971545613397" className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors break-all">
                                            +971 54561 3397
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="bg-purple-100 p-2.5 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1">Email</h3>
                                        <a href="mailto:info@excursionsdubai.ae" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600 transition-colors break-all">
                                            info@excursionsdubai.ae
                                        </a>
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

// Wrap with GoogleReCaptchaProvider
export default function ContactUsPage() {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
            <ContactForm />
        </GoogleReCaptchaProvider>
    );
}