import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-scroll";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-boost-purple/90 to-boost-deep-purple/90 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-boost-orange/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-boost-light-purple/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <span className="text-boost-orange text-7xl font-bold">*</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-slide-down opacity-0" style={{
          animationDelay: "0.1s"
        }}>
            Boost is WE Communications
            <br />
            Singapore's community for <span className="text-boost-orange">creative exchange</span> and <span className="text-boost-orange">holistic learning</span>.
          </h1>
          
          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-down opacity-0" style={{
          animationDelay: "0.4s"
        }}>
            
            
            
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-down opacity-0" style={{
          animationDelay: "0.5s"
        }}>
            
            
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button className="button-gradient text-white h-12 px-6 rounded-full animate-slide-down opacity-0" style={{
            animationDelay: "0.6s"
          }}>
              <Link to="workshops" spy={true} smooth={true} offset={-70} duration={500} className="flex items-center">
                Explore Workshops
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;