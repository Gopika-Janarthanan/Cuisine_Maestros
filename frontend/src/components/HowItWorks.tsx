import { motion } from "framer-motion";
import { Search, Calendar, ChefHat, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover Chefs",
    description: "Browse our curated selection of professional chefs filtered by cuisine, location, and availability.",
  },
  {
    icon: Calendar,
    title: "Book Your Date",
    description: "Select your preferred date, time, and number of guests. Review the chef's menu options.",
  },
  {
    icon: ChefHat,
    title: "Enjoy the Experience",
    description: "Your chef arrives with fresh ingredients and prepares an unforgettable meal in your home.",
  },
  {
    icon: Star,
    title: "Share Your Feedback",
    description: "Rate your experience and help other food lovers discover exceptional culinary talent.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Book your private chef experience in just a few simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-xl p-6 shadow-soft text-center h-full">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gold text-charcoal font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
