import { LazyLoadImage } from "react-lazy-load-image-component";

const AdditionalServices = () => {

    const InfoCard = ({ title, main, sub }: any) => (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-pink-700 text-lg font-semibold mb-2">{title}</h3>
            <p className="text-2xl font-bold mb-1">{main}</p>
            <p className="text-gray-500 text-sm">{sub}</p>
        </div>
    );
    return (
        <div>
            <div className="font-sans">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl text-gray-600 mb-2 text-center">Additional Services</h1>
                    <p className="text-gray-600 mb-6 text-center">
                        Corporate Travel, Events Management, Photo/Video Services, VIP & Customised Travel
                    </p>
                </div>
                {/* Hero Section */}
                <section
                    className="relative bg-cover bg-center h-[80vh] flex flex-col justify-center items-center text-white text-center"
                    style={{
                        backgroundImage:
                            "url('https://www.excursionsdubai.com/public/images/2000x600_1.jpg')",
                    }}
                >
                    <div className="bg-black/40 absolute inset-0"></div>
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-6xl font-semibold mb-4">
                            Tailored For You
                        </h1>
                        <p className="text-xl mb-6">
                            Let Our Experts Plan Your Trip To Dubai.
                        </p>
                        <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-md transition">
                            Contact Us
                        </button>
                    </div>
                </section>
                <section
                    className="relative bg-cover bg-center h-[80vh] flex flex-col justify-center items-center text-white text-center"
                    style={{
                        backgroundImage:
                            "url('https://www.excursionsdubai.com/public/images/1s.jpg')",
                    }}
                >
                    <div className="bg-black/40 absolute inset-0"></div>
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-6xl font-semibold mb-4">
                            VIP
                        </h1>
                        <p className="text-xl mb-6">
                            VIP Travel Services
                        </p>
                        <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-md transition">
                            Contact Us
                        </button>
                    </div>
                </section>
                <section
                    className="relative bg-cover bg-center h-[80vh] flex flex-col justify-center items-center text-white text-center"
                    style={{
                        backgroundImage:
                            "url('https://www.excursionsdubai.com/public/images/3s.jpg')",
                    }}
                >
                    <div className="bg-black/40 absolute inset-0"></div>
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-6xl font-semibold mb-4">
                            Corporate Travel / Events Management
                        </h1>
                        <p className="text-xl mb-6">
                            Team Building, Events, Weddings & Photography Services
                        </p>
                        <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-md transition">
                            Contact Us
                        </button>
                    </div>
                </section>

                {/* Trust Logos */}
                <section className="py-12 bg-white text-center">
                    <h3 className="text-2xl font-semibold mb-2">Book With Confidence</h3>
                    <p className="text-gray-600 mb-8">
                        Secure Payments, SSL Encryption, Trusted Dubai Agents & Thousands of
                        Positive Reviews
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <LazyLoadImage src="https://www.excursionsdubai.com/common/cms_image/554/0/0/1" alt="WorldPay" className="h-13" />
                        <LazyLoadImage src="https://www.excursionsdubai.com/common/cms_image/555/0/0/1" alt="Dubai" className="h-13" />
                        <LazyLoadImage src="https://www.excursionsdubai.com/common/cms_image/604/0/0/1" alt="SSL" className="h-13" />
                        <LazyLoadImage src="https://www.excursionsdubai.com/common/cms_image/557/0/0/1" alt="Tripadvisor" className="h-13" />
                        <LazyLoadImage src="https://www.excursionsdubai.com/common/cms_image/567/0/0/1" alt="Trustpilot" className="h-13" />
                    </div>
                </section>

                {/* Subscribe Section */}
                <section className="bg-pink-700 text-white py-12 text-center">
                    <h2 className="text-3xl font-semibold mb-3">Get All The Latest Offers!</h2>
                    <p className="mb-6 text-lg">
                        Discover exciting travel tips, city guides and top deals every week on
                        Excursions Dubai.
                    </p>
                    <div className="flex justify-center">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            className="p-3 w-64 md:w-96 rounded-l-md text-gray-700"
                        />
                        <button className="bg-sky-600 hover:bg-sky-700 px-6 py-3 rounded-r-md font-semibold">
                            Subscribe
                        </button>
                    </div>
                </section>

                {/* Good To Know Section */}
                <section className="bg-gray-100 py-16 text-center">
                    <h2 className="text-3xl font-semibold mb-10">Good To Know</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
                        <InfoCard title="Language" main="Arabic" sub="English Also Widely Spoken" />
                        <InfoCard title="Currency" main="AED" sub="United Arab Emirates Dirham" />
                        <InfoCard title="Time" main="UTC (+4:00)" sub="Dubai Time Zone" />
                        <InfoCard title="Code" main="+971" sub="Country Area Code" />
                        <InfoCard title="Visa" main="30 Day Free" sub="(UK Passport Holders)" />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AdditionalServices