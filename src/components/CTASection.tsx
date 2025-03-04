
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto">
        <div className="glass rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="text-gradient">Boost</span> Your Team?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Schedule a consultation with our team to discuss how our workshops can help your organization grow and thrive.
          </p>
          <Button className="button-gradient text-white" size="lg">
            Contact Us <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
