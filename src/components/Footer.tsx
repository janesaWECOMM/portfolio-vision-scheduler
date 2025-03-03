
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-2xl text-boost-purple">Boost</span>
              <span className="text-boost-orange text-2xl font-bold">∞</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Transformative workshop experiences designed to elevate team performance and organizational success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-boost-purple transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-boost-purple transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-boost-purple transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-boost-purple transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/workshops/innovation-sprint" className="text-muted-foreground hover:text-boost-purple transition-colors">
                  Innovation Sprint
                </Link>
              </li>
              <li>
                <Link to="/workshops/team-synergy" className="text-muted-foreground hover:text-boost-purple transition-colors">
                  Team Synergy
                </Link>
              </li>
              <li>
                <Link to="/workshops/leadership-excellence" className="text-muted-foreground hover:text-boost-purple transition-colors">
                  Leadership Excellence
                </Link>
              </li>
              <li>
                <Link to="/workshops/digital-transformation" className="text-muted-foreground hover:text-boost-purple transition-colors">
                  Digital Transformation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-boost-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-muted-foreground hover:text-boost-purple transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-boost-purple transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-boost-purple transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start">
                <Mail size={20} className="mr-2 mt-1 flex-shrink-0 text-boost-purple" />
                <span className="text-muted-foreground">
                  hello@boostworkshops.com
                </span>
              </p>
              <p className="text-muted-foreground ml-7">
                Prepared by WE Communications Singapore
              </p>
              <p className="text-muted-foreground ml-7">
                Jane Chang / Associate Director, Innovation Lead
                <br />
                jchang@we-worldwide.com
              </p>
              <p className="text-muted-foreground ml-7">
                Janice Chiang / Associate Director, Innovation
                <br />
                jchiang@we-worldwide.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Boost Workshops. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-boost-purple transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-boost-purple transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
