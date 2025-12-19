import Brand from './Brand';
import { Header } from './Header';
import HeroSection from './HeroSection';
import PartnerBenefitsSection from './PartnerBenefitsSection';
import { TopProduct } from './TopProduct';
import Trending from './Trending';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <Brand id="brands-section" />
            <Trending id="trending-section" />
            <PartnerBenefitsSection id="partner-benefits-section" />
            <TopProduct />
        </div>
    );
};

export default LandingPage;
