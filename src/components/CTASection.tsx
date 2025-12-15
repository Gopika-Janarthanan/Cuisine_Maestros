import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, DollarSign, Calendar, Users } from "lucide-react";

const benefits = [
  { icon: DollarSign, text: "Set your own rates" },
  { icon: Calendar, text: "Flexible scheduling" },
  { icon: Users, text: "Connect with new clients" },
];

const CTASection = () => {
  return (
    <section className="py-20 bg-hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Are You a Chef?{" "}
              <span className="text-gold">Join Our Platform</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Share your culinary passion with food lovers in your area. Create memorable 
              dining experiences and build your personal brand as a private chef.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-2 text-primary-foreground/90">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            <Button variant="gold" size="xl" asChild>
              <Link to="/register">
                Become a Chef
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
                alt="Chef preparing food"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-elevated p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">$2,500</div>
                  <div className="text-muted-foreground text-sm">Avg. monthly earnings</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
