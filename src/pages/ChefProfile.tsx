import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { chefService } from "@/services/chefService";
import { bookingService } from "@/services/bookingService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Clock,
  Award,
  Calendar,
  ChefHat,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock chef data
const chefData = {
  id: "1",
  name: "Chef Alessandro Romano",
  image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=600&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop",
  specialty: "Michelin-trained Italian cuisine specialist",
  bio: "With over 15 years of culinary experience spanning from Rome to New York, I bring authentic Italian flavors to your table. Trained in traditional techniques at renowned Michelin-starred restaurants, I specialize in creating memorable dining experiences that celebrate the art of Italian cuisine.",
  cuisines: ["Italian", "Mediterranean", "French"],
  rating: 4.9,
  reviewCount: 127,
  pricePerHour: 85,
  location: "New York, NY",
  available: true,
  experience: "15+ years",
  specialties: ["Pasta Making", "Risotto", "Seafood", "Desserts"],
  languages: ["English", "Italian", "Spanish"],
  menuHighlights: [
    "Handmade Tagliatelle with Truffle",
    "Ossobuco alla Milanese",
    "Tiramisu with Espresso Gelato",
    "Caprese Salad with Buffalo Mozzarella",
  ],
  reviews: [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "November 2024",
      comment: "Alessandro created an unforgettable evening for our anniversary. The handmade pasta was divine!",
    },
    {
      id: 2,
      name: "Michael K.",
      rating: 5,
      date: "October 2024",
      comment: "Professional, creative, and incredibly talented. Our guests were blown away by every course.",
    },
    {
      id: 3,
      name: "Jennifer L.",
      rating: 4,
      date: "October 2024",
      comment: "Wonderful experience! Chef Alessandro was a pleasure to have in our home.",
    },
  ],
};

const ChefProfile = () => {
  const { id } = useParams();
  const [chefData, setChefData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const loadChef = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await chefService.getChefById(id);
        // Extend mock data with extra profile fields for demo if missing
        const fullData = {
          ...data,
          coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop",
          bio: "With over 15 years of culinary experience, I specialize in creating memorable dining experiences.",
          experience: "15+ years",
          specialties: ["Pasta Making", "Risotto", "Seafood", "Desserts"],
          languages: ["English", "Italian", "Spanish"],
          menuHighlights: ["Handmade Pasta", "Truffle Risotto", "Tiramisu"],
          reviews: [
            { id: 1, name: "Sarah M.", rating: 5, date: "Nov 2024", comment: "Amazing food!" },
            { id: 2, name: "Mike R.", rating: 5, date: "Oct 2024", comment: "Great experience." }
          ]
        };
        setChefData(fullData);
      } catch (error) {
        console.error("Error loading chef", error);
      } finally {
        setLoading(false);
      }
    };
    loadChef();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chefData) return;

    await bookingService.createBooking({
      chefId: chefData.id,
      date: bookingDate,
      time: bookingTime,
      guests: Number(guestCount),
      notes
    });

    toast.success("Booking request sent! The chef will confirm shortly.");
    setIsBookingOpen(false);
    setBookingDate("");
    setBookingTime("");
    setGuestCount("");
    setNotes("");
  };

  if (loading) return <div className="min-h-screen pt-20 text-center">Loading...</div>;
  if (!chefData) return <div className="min-h-screen pt-20 text-center">Chef not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80">
          <img
            src={chefData.coverImage}
            alt="Chef's cuisine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        </div>

        {/* Profile Content */}
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl shadow-card p-6 mb-6"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 ring-4 ring-card shadow-elevated">
                    <img
                      src={chefData.image}
                      alt={chefData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                          {chefData.name}
                        </h1>
                        <p className="text-muted-foreground">{chefData.specialty}</p>
                      </div>
                      {chefData.available && (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          <Clock className="w-3 h-3 mr-1" />
                          Available
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-gold text-gold" />
                        <span className="font-semibold">{chefData.rating}</span>
                        <span className="text-muted-foreground">
                          ({chefData.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {chefData.location}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Award className="w-4 h-4" />
                        {chefData.experience}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {chefData.cuisines.map((cuisine) => (
                        <Badge key={cuisine} variant="secondary">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl shadow-soft p-6 mb-6"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  About
                </h2>
                <p className="text-muted-foreground leading-relaxed">{chefData.bio}</p>
              </motion.div>

              {/* Specialties */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-card rounded-xl shadow-soft p-6 mb-6"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  <ChefHat className="w-5 h-5 inline mr-2" />
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {chefData.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Menu Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-xl shadow-soft p-6 mb-6"
              >
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Menu Highlights
                </h2>
                <ul className="space-y-3">
                  {chefData.menuHighlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-card rounded-xl shadow-soft p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    <MessageSquare className="w-5 h-5 inline mr-2" />
                    Reviews
                  </h2>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-gold text-gold" />
                    <span className="font-semibold text-lg">{chefData.rating}</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {chefData.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{review.name}</span>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating
                              ? "fill-gold text-gold"
                              : "text-muted"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl shadow-card p-6 sticky top-24"
              >
                <div className="text-center mb-6">
                  <div className="font-display text-3xl font-bold text-foreground">
                    ₹{chefData.pricePerHour}
                    <span className="text-lg font-normal text-muted-foreground">/hour</span>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  className="w-full mb-4"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>

                <Button variant="outline" size="lg" className="w-full mb-6">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </Button>

                <div className="border-t border-border pt-6 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response time</span>
                    <span className="font-medium text-foreground">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Languages</span>
                    <span className="font-medium text-foreground">
                      {chefData.languages.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minimum booking</span>
                    <span className="font-medium text-foreground">3 hours</span>
                  </div>
                </div>

                <Link
                  to="/chefs"
                  className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors mt-6 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all chefs
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                Book {chefData.name}
              </DialogTitle>
              <DialogDescription>
                Fill in your details to request a booking
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="e.g., 6"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Special Requests (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Dietary restrictions, preferences, occasion..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsBookingOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="gold" className="flex-1">
                  Send Request
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default ChefProfile;
