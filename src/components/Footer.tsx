import { Link } from "react-router-dom";
import { ChefHat, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-charcoal" />
              </div>
              <span className="font-display text-xl font-bold">
                Cuisine<span className="text-gold">Maestros</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Connecting food lovers with exceptional private chefs for unforgettable dining experiences at home.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Guests */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">For Guests</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/chefs" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Find a Chef
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/cuisines" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Browse Cuisines
                </Link>
              </li>
              <li>
                <Link to="/occasions" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Special Occasions
                </Link>
              </li>
            </ul>
          </div>

          {/* For Chefs */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">For Chefs</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/register" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Become a Chef
                </Link>
              </li>
              <li>
                <Link to="/chef-resources" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Chef Resources
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary-foreground/70 hover:text-gold transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Cuisine Maestros. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
