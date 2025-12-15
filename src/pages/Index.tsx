import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedChefs from "@/components/FeaturedChefs";
import HowItWorks from "@/components/HowItWorks";
import CuisineCategories from "@/components/CuisineCategories";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedChefs />
        <CuisineCategories />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
