
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const CTASection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
          Ready to <span className="text-gradient">Boost</span> Your Team?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Schedule a consultation to discuss how our workshops can transform your team's capabilities.
        </p>
        
        <Button size={isMobile ? "default" : "lg"} className="button-gradient text-white rounded-full">
          <Mail className="mr-2 h-4 w-4" />
          Contact Us Today
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
