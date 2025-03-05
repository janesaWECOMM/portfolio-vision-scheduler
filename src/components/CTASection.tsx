
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to <span className="text-gradient">Boost</span> Your Team?
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Schedule a consultation to discuss how our workshops can transform your team's capabilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="button-gradient">
            Schedule a Consultation
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
