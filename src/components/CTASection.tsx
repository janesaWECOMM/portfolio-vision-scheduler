
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-boost-orange/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-boost-purple/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="container mx-auto">
        <div className="glass rounded-2xl p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient">Transform</span> Your Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a discovery call with our workshop specialists to discuss your team's needs and how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="button-gradient text-white h-12 px-8 rounded-full text-lg" asChild>
              <Link to="/schedule">
                Schedule a Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" className="h-12 px-8 rounded-full border-boost-purple text-boost-purple hover:bg-boost-purple/5 text-lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
