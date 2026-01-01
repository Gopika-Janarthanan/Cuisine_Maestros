import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-chef.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional chef preparing gourmet cuisine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-gold/20 text-gold border border-gold/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Premium Private Dining Experiences
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Book Elite Chefs for{" "}
            <span className="text-gold">Unforgettable</span> Home Dining
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary-foreground/80 text-lg sm:text-xl leading-relaxed mb-8"
          >
            From intimate dinners to grand celebrations, discover talented private chefs 
            who bring restaurant-quality experiences to your home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/chefs">
                <Search className="w-5 h-5 mr-2" />
                Find Your Chef
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/how-it-works">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20"
          >
            <div>
              <div className="font-display text-3xl font-bold text-gold">500+</div>
              <div className="text-primary-foreground/70 text-sm">Professional Chefs</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-gold">50+</div>
              <div className="text-primary-foreground/70 text-sm">Cuisines</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-gold">10K+</div>
              <div className="text-primary-foreground/70 text-sm">Happy Guests</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
