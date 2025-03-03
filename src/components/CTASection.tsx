
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-boost-purple/90 to-boost-deep-purple/90 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-boost-orange/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-boost-light-purple/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="container mx-auto">
        <div className="glass bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="text-boost-orange text-5xl font-bold">*</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Boost Workshops & Pricing
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to supercharge your team's skills? Schedule a workshop today!
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="glass p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-2">101 Workshop</h3>
              <p className="text-4xl font-bold text-boost-orange mb-2">SGD 3,000</p>
              <p className="text-sm">Perfect for beginners</p>
            </div>
            
            <div className="glass p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-2">Deep-dive Series</h3>
              <p className="text-4xl font-bold text-boost-orange mb-2">SGD 4,500</p>
              <p className="text-sm">For experienced professionals</p>
            </div>
            
            <div className="glass p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-2">Mastery Level</h3>
              <p className="text-4xl font-bold text-boost-orange mb-2">SGD 10,000</p>
              <p className="text-sm">For C-suite and leaders</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="button-gradient text-white h-12 px-8 rounded-full text-lg">
              Schedule a Workshop
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="h-12 px-8 rounded-full border-white/40 text-white hover:bg-white/10 text-lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
