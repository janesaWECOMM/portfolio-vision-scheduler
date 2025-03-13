
import { Link } from "react-scroll";
import { Linkedin, Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Boost</h3>
            <p className="text-muted-foreground">
              Supercharge your team with our specialized communication workshops.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="home" spy={true} smooth={true} className="text-muted-foreground hover:text-primary cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link to="features" spy={true} smooth={true} className="text-muted-foreground hover:text-primary cursor-pointer">
                  Why Boost
                </Link>
              </li>
              <li>
                <Link to="workshops" spy={true} smooth={true} className="text-muted-foreground hover:text-primary cursor-pointer">
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="testimonials" spy={true} smooth={true} className="text-muted-foreground hover:text-primary cursor-pointer">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="contact" spy={true} smooth={true} className="text-muted-foreground hover:text-primary cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@boostworkshops.com" className="text-muted-foreground hover:text-primary">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-muted-foreground">
              © {currentYear} Boost Workshops. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
