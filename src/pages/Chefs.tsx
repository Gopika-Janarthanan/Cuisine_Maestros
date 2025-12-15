import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChefCard from "@/components/ChefCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";

// Mock data for chefs
const allChefs = [
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
  {
    id: "5",
    name: "Chef Raj Patel",
    image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=600&h=450&fit=crop",
    specialty: "Modern Indian cuisine with traditional roots",
    cuisines: ["Indian", "Asian Fusion", "Vegetarian"],
    rating: 4.7,
    reviewCount: 94,
    pricePerHour: 70,
    location: "San Francisco, CA",
    available: true,
  },
  {
    id: "6",
    name: "Chef Emma Wilson",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=450&fit=crop",
    specialty: "Contemporary American farm-to-table",
    cuisines: ["American", "Farm-to-Table", "Seasonal"],
    rating: 4.8,
    reviewCount: 112,
    pricePerHour: 90,
    location: "Seattle, WA",
    available: true,
  },
  {
    id: "7",
    name: "Chef Carlos Mendez",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=450&fit=crop",
    specialty: "Spanish tapas and paella expert",
    cuisines: ["Spanish", "Mediterranean", "Seafood"],
    rating: 4.6,
    reviewCount: 78,
    pricePerHour: 80,
    location: "Austin, TX",
    available: false,
  },
  {
    id: "8",
    name: "Chef Lisa Chen",
    image: "https://images.unsplash.com/photo-1551218372-a8789b81b253?w=600&h=450&fit=crop",
    specialty: "Authentic Cantonese dim sum master",
    cuisines: ["Chinese", "Dim Sum", "Cantonese"],
    rating: 4.9,
    reviewCount: 167,
    pricePerHour: 95,
    location: "Boston, MA",
    available: true,
  },
];

const cuisineOptions = [
  "All Cuisines",
  "Italian",
  "Japanese",
  "French",
  "Mexican",
  "Indian",
  "Chinese",
  "Spanish",
  "American",
];

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "reviews", label: "Most Reviews" },
];

const Chefs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort chefs
  const filteredChefs = allChefs
    .filter((chef) => {
      const matchesSearch =
        chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chef.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chef.cuisines.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCuisine =
        selectedCuisine === "All Cuisines" ||
        chef.cuisines.some((c) => c.toLowerCase() === selectedCuisine.toLowerCase());

      const matchesPrice =
        chef.pricePerHour >= priceRange[0] && chef.pricePerHour <= priceRange[1];

      return matchesSearch && matchesCuisine && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.pricePerHour - b.pricePerHour;
        case "price-high":
          return b.pricePerHour - a.pricePerHour;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Find Your Perfect Chef
              </h1>
              <p className="text-muted-foreground text-lg">
                Browse our curated selection of talented private chefs
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, cuisine, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-12 text-base bg-card border-border"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex flex-wrap gap-4 flex-1">
                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger className="w-full sm:w-48 bg-card">
                    <SelectValue placeholder="Cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineOptions.map((cuisine) => (
                      <SelectItem key={cuisine} value={cuisine}>
                        {cuisine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 bg-card">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  More Filters
                </Button>
              </div>

              <div className="text-muted-foreground text-sm self-center">
                {filteredChefs.length} chef{filteredChefs.length !== 1 ? "s" : ""} found
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card rounded-xl p-6 mb-8 shadow-soft"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Price Range</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="max-w-md">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={200}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}/hr</span>
                    <span>${priceRange[1]}/hr</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Chef Grid */}
            {filteredChefs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredChefs.map((chef) => (
                  <ChefCard key={chef.id} {...chef} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No chefs found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCuisine("All Cuisines");
                    setPriceRange([0, 200]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Chefs;
