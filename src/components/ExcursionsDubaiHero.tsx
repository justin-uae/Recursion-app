import WhyChooseUs from './WhyChooseUs';
import Header from './HomeBanner';
import PopularTab from './PopularTab';

export default function ExcursionsDubaiPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <main>
                <Header />
                <PopularTab />
                <WhyChooseUs />
            </main>
        </div>
    );
}