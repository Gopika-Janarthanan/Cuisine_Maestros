import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { bookingService } from "@/services/bookingService";
import { Check, X, Clock, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Mock Booking Data
const INITIAL_BOOKINGS = [
    {
        id: 1,
        clientName: "Alice Johnson",
        date: "2024-06-15",
        time: "19:00",
        guests: 4,
        occasion: "Birthday Dinner",
        status: "PENDING",
        price: 340
    },
    {
        id: 2,
        clientName: "Michael Smith",
        date: "2024-06-18",
        time: "20:00",
        guests: 2,
        occasion: "Anniversary",
        status: "PENDING",
        price: 200
    },
    {
        id: 3,
        clientName: "Sarah Williams",
        date: "2024-06-22",
        time: "18:30",
        guests: 6,
        occasion: "Family Gathering",
        status: "CONFIRMED",
        price: 510
    }
];

const ChefDashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<any[]>([]); // Use bookingService.Booking type properly in real code
    const [loading, setLoading] = useState(true);

    // Services imported at top


    useEffect(() => {
        if (user?.chefId) {
            bookingService.getBookingsForChef(String(user.chefId))
                .then((data: any) => setBookings(data))
                .catch((err: any) => toast.error("Failed to load bookings"))
                .finally(() => setLoading(false));
        } else if (user?.role === "CHEF" && !user.chefId) {
            // Should not happen if auth flow is correct, but handle grace
            setLoading(false);
        }
    }, [user]);

    const handleAction = async (id: number, action: "CONFIRMED" | "REJECTED") => {
        try {
            await bookingService.updateBookingStatus(id, action);
            setBookings(prev => prev.map(booking =>
                booking.id === id ? { ...booking, status: action } : booking
            ));
            toast.success(`Booking ${action.toLowerCase()} successfully`);
        } catch (error) {
            toast.error("Failed to update booking status");
        }
    };

    const pendingBookings = bookings.filter(b => b.status === "PENDING");
    const upcomingBookings = bookings.filter(b => b.status === "CONFIRMED");

    if (!user || user.role !== "CHEF") {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 pt-32 text-center">
                    <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                    <p>You need to be logged in as a Chef to view this dashboard.</p>
                    <Button className="mt-4" variant="gold" onClick={() => window.location.href = '/login'}>Go to Login</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground">Chef Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Welcome back, Chef {user.name}</p>
                    </div>

                    <Tabs defaultValue="requests" className="w-full">
                        <TabsList className="mb-8">
                            <TabsTrigger value="requests">Requests ({pendingBookings.length})</TabsTrigger>
                            <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                        </TabsList>

                        <TabsContent value="requests">
                            <div className="grid gap-6">
                                <AnimatePresence>
                                    {pendingBookings.length > 0 ? pendingBookings.map((booking) => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            layout
                                        >
                                            <Card>
                                                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                                    <div>
                                                        <CardTitle className="text-xl font-bold">{booking.clientName}</CardTitle>
                                                        <CardDescription>{booking.occasion} • {booking.guests} Guests</CardDescription>
                                                    </div>
                                                    <div className="font-bold text-lg text-gold">₹{booking.price}</div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            {booking.date}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4" />
                                                            {booking.time}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 justify-end">
                                                        <Button
                                                            variant="outline"
                                                            className="border-red-500 text-red-500 hover:bg-red-50"
                                                            onClick={() => handleAction(booking.id, "REJECTED")}
                                                        >
                                                            <X className="w-4 h-4 mr-2" />
                                                            Reject
                                                        </Button>
                                                        <Button
                                                            variant="gold"
                                                            onClick={() => handleAction(booking.id, "CONFIRMED")}
                                                        >
                                                            <Check className="w-4 h-4 mr-2" />
                                                            Accept
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )) : (
                                        <p className="text-muted-foreground text-center py-8">No pending requests at the moment.</p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </TabsContent>

                        <TabsContent value="upcoming">
                            <div className="grid gap-6">
                                {upcomingBookings.length > 0 ? upcomingBookings.map((booking) => (
                                    <Card key={booking.id}>
                                        <CardHeader>
                                            <CardTitle>{booking.clientName}</CardTitle>
                                            <CardDescription>Confirmed for {booking.date} at {booking.time}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Confirmed</span>
                                                <Button variant="outline">View Details</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )) : (
                                    <p className="text-muted-foreground text-center py-8">No upcoming bookings.</p>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Settings</CardTitle>
                                    <CardDescription>Manage your public chef profile</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Profile editing functionality coming soon...</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ChefDashboard;
