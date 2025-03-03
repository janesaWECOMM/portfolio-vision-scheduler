
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkshopSection from "@/components/WorkshopSection";
import CTASection from "@/components/CTASection";

const Workshops = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="py-24 px-4 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Workshop</span> Programs
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover our comprehensive range of workshop programs designed to transform your team's capabilities and performance.
            </p>
          </div>
        </div>
        <WorkshopSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Workshops;
