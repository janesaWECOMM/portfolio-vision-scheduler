
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4", 
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
            "font-bold text-2xl transition-colors duration-300", 
            isScrolled ? "text-foreground" : "text-slate-50"
          )}>
            Boost
          </span>
          <span className="text-boost-orange text-2xl font-bold">∞</span>
        </Link>

        {/* Navigation links would go here if needed */}
      </div>
    </header>
  );
};

export default Navbar;
