import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ChefCard from "./ChefCard";
import { useEffect, useState } from "react";
import { chefService, Chef } from "@/services/chefService";

// Mock data for featured chefs
const featuredChefs = [
  {
    id: "1",
    name: "Chef Alessandro Romano",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=450&fit=crop",
    specialty: "Michelin-trained Italian cuisine specialist",
    cuisines: ["Italian", "Mediterranean", "French"],
    rating: 4.9,
    reviewCount: 127,
    pricePerHour: 85,
    location: "New York, NY",
    available: true,
  },
  {
    id: "2",
    name: "Chef Yuki Tanaka",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&h=450&fit=crop",
    specialty: "Authentic Japanese omakase experience",
    cuisines: ["Japanese", "Sushi", "Kaiseki"],
    rating: 4.8,
    reviewCount: 89,
    pricePerHour: 120,
    location: "Los Angeles, CA",
    available: true,
  },
  {
    id: "3",
    name: "Chef Maria Santos",
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=600&h=450&fit=crop",
    specialty: "Farm-to-table Mexican fusion",
    cuisines: ["Mexican", "Latin American", "Fusion"],
    rating: 4.9,
    reviewCount: 156,
    pricePerHour: 75,
    location: "Miami, FL",
    available: false,
  },
  {
    id: "4",
    name: "Chef Pierre Dubois",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&h=450&fit=crop",
    specialty: "Classic French fine dining",
    cuisines: ["French", "Contemporary", "European"],
    rating: 5.0,
    reviewCount: 203,
    pricePerHour: 150,
    location: "Chicago, IL",
    available: true,
  },
];

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
