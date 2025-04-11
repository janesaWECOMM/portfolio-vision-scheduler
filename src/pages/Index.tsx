
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
        <Element name="home" className="section-padding">
          <HeroSection />
          <TeaserVideoSection />
        </Element>
        <Element name="features" className="section-padding">
          <FeaturesSection />
        </Element>
        <Element name="workshops" className="section-padding">
          <WorkshopSection />
        </Element>
        <Element name="testimonials" className="section-padding">
          <TestimonialsSection />
        </Element>
        <Element name="contact" className="section-padding">
          <CTASection />
        </Element>
      </main>
      <FloatingContactButton />
    </div>
  );
};

export default Index;
