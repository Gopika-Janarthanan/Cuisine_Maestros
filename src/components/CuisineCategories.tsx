import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cuisines = [
  { name: "Italian", image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=300&fit=crop", count: 45 },
  { name: "Japanese", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop", count: 32 },
  { name: "French", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop", count: 28 },
  { name: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop", count: 36 },
  { name: "Indian", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop", count: 41 },
  { name: "Thai", image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=300&fit=crop", count: 25 },
];

const CuisineCategories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">Explore</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Popular Cuisines
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover chefs specializing in cuisines from around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/chefs?cuisine=${cuisine.name.toLowerCase()}`}
                className="group block relative rounded-xl overflow-hidden aspect-square"
              >
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="font-display text-lg font-semibold text-primary-foreground">
                    {cuisine.name}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {cuisine.count} chefs
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuisineCategories;
