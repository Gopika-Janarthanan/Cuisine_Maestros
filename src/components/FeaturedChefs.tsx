import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ChefCard from "./ChefCard";
import { useEffect, useState } from "react";
import { chefService, Chef } from "@/services/chefService";

// Mock data removed (using chefService)

const FeaturedChefs = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChefs = async () => {
      try {
        const data = await chefService.getFeaturedChefs();
        setChefs(data);
      } catch (error) {
        console.error("Failed to load chefs", error);
      } finally {
        setLoading(false);
      }
    };
    loadChefs();
  }, []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
        >
          <div>
            <span className="text-navy font-medium text-sm uppercase tracking-wider">Top Rated</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Featured Chefs
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/chefs">View All Chefs</Link>
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chefs.map((chef) => (
              <ChefCard key={chef.id} {...chef} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedChefs;
