import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedSection from '../components/home/FeaturedSection';
import BestSellersSection from '../components/home/BestSellersSection';
import NewReleasesSection from '../components/home/NewReleasesSection';
import WeeklyDealsSection from '../components/home/WeeklyDealsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <FeaturedSection />
        <BestSellersSection />
        <NewReleasesSection />
        <WeeklyDealsSection />
      </main>
      <Footer />
    </div>
  );
}
