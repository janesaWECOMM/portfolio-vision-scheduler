
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-boost-light-purple/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-boost-orange/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="container mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 max-w-xl">
          <div className="inline-block">
            <span className="bg-secondary text-boost-purple px-4 py-1.5 rounded-full text-sm font-medium">Transform Your Teams</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-slide-down opacity-0" style={{ animationDelay: "0.1s" }}>
            Boost <span className="text-gradient">Workshops</span> for Teams
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-down opacity-0" style={{ animationDelay: "0.3s" }}>
            Elevate your team's performance with our tailored workshop experiences. Designed to foster innovation, collaboration, and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-down opacity-0" style={{ animationDelay: "0.5s" }}>
            <Button className="button-gradient text-white h-12 px-6 rounded-full" asChild>
              <Link to="/schedule">
                Schedule a Workshop
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="h-12 px-6 rounded-full border-boost-purple text-boost-purple hover:bg-boost-purple/5" asChild>
              <Link to="/workshops">Explore Our Programs</Link>
            </Button>
          </div>
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="relative w-full h-full max-w-md mx-auto animate-scale-in opacity-0" style={{ animationDelay: "0.7s" }}>
            <div className="aspect-video rounded-2xl bg-black/5 backdrop-blur shadow-xl border border-white/20 overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <p className="text-muted-foreground text-sm mb-2">Teaser Video Coming Soon</p>
                  <Button variant="secondary" size="sm">
                    Watch Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
