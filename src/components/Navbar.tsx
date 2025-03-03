
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
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
          <span className="font-bold text-2xl text-boost-purple">Boost</span>
          <span className="text-boost-orange text-2xl font-bold">∞</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-foreground hover:text-boost-purple transition-colors cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="workshops"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-foreground hover:text-boost-purple transition-colors cursor-pointer"
          >
            Workshops
          </Link>
          <Link
            to="features"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-foreground hover:text-boost-purple transition-colors cursor-pointer"
          >
            Features
          </Link>
          <Link
            to="testimonials"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-foreground hover:text-boost-purple transition-colors cursor-pointer"
          >
            Testimonials
          </Link>
          <Button className="button-gradient text-white">
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="cursor-pointer"
            >
              Contact Us
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 p-4 flex flex-col space-y-4 animate-fade-in">
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-foreground hover:text-boost-purple transition-colors px-4 py-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="workshops"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-foreground hover:text-boost-purple transition-colors px-4 py-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Workshops
          </Link>
          <Link
            to="features"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-foreground hover:text-boost-purple transition-colors px-4 py-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="testimonials"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="text-foreground hover:text-boost-purple transition-colors px-4 py-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link
            to="contact"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="button-gradient text-white px-4 py-2 rounded-md cursor-pointer text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
