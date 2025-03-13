
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TeaserVideoSection from "@/components/TeaserVideoSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorkshopSection from "@/components/WorkshopSection";
import CTASection from "@/components/CTASection";
import FloatingContactButton from "@/components/FloatingContactButton";
import { Element } from "react-scroll";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Element name="home">
          <HeroSection />
        </Element>
        <TeaserVideoSection />
        <Element name="features">
          <FeaturesSection />
        </Element>
        <Element name="workshops">
          <WorkshopSection />
        </Element>
        <Element name="testimonials">
          <TestimonialsSection />
        </Element>
        <Element name="contact">
          <CTASection />
        </Element>
      </main>
      <FloatingContactButton />
    </div>
  );
};

export default Index;
