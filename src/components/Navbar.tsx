
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-scroll";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-3 md:py-4", 
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="home" 
          spy={true} 
          smooth={true} 
          offset={-70} 
          duration={500} 
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span className={cn(
            "font-bold text-xl md:text-2xl transition-colors duration-300", 
            isScrolled ? "text-foreground" : "text-slate-50"
          )}>
            Boost
          </span>
          <span className="text-boost-orange text-xl md:text-2xl font-bold">∞</span>
        </Link>

        {isMobile ? (
          <button 
            className={cn(
              "p-2 rounded-full", 
              isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        ) : (
          <nav className="hidden md:flex items-center space-x-6">
            {["features", "workshops", "testimonials", "contact"].map((item) => (
              <Link
                key={item}
                to={item}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={cn(
                  "font-medium capitalize cursor-pointer hover:text-boost-orange transition-colors",
                  isScrolled ? "text-muted-foreground" : "text-white/80"
                )}
              >
                {item}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
