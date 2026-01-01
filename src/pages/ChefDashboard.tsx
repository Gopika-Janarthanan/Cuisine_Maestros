import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { bookingService } from "@/services/bookingService";
import { Check, X, Clock, Calendar, User, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChatWindow from "@/components/ChatWindow";
import { Textarea } from "@/components/ui/textarea";
import { chefService } from "@/services/chefService";

const ChefDashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Acceptance Dialog State
    const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const [cookingCharge, setCookingCharge] = useState("");
    const [groceryCost, setGroceryCost] = useState("");
    const [selectedBookingGroceryOption, setSelectedBookingGroceryOption] = useState<string>("");

    // Profile Edit State
    const [profileData, setProfileData] = useState({
        pricePerHour: "",
        specialty: "",
        bio: "",
        location: "",
        specialties: "", // comma separated for input
        experience: "",
        image: ""
    });

    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [activeChat, setActiveChat] = useState<any>(null);

    useEffect(() => {
        if (user?.chefId) {
            // Load bookings
            bookingService.getBookingsForChef(String(user.chefId))
                .then((data: any) => setBookings(data))
                .catch((err: any) => toast.error("Failed to load bookings"))
                .finally(() => setLoading(false));

            // Load profile data
            chefService.getChefById(String(user.chefId)).then(data => {
                if (data) {
                    setProfileData({
                        pricePerHour: String(data.pricePerHour || ""),
                        specialty: data.specialty || "",
                        bio: data.bio || "",
                        location: data.location || "",
                        specialties: data.specialties?.join(", ") || "",
                        experience: data.experience || "",
                        image: data.image || ""
                    });
                }
            });
        } else if (user?.role === "CHEF" && !user.chefId) {
            setLoading(false);
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.chefId) return;

        try {
            await chefService.updateChef(String(user.chefId), {
                pricePerHour: Number(profileData.pricePerHour),
                specialty: profileData.specialty,
                bio: profileData.bio,
                location: profileData.location,
                experience: profileData.experience,
                specialties: profileData.specialties.split(",").map(s => s.trim()).filter(s => s),
                image: profileData.image
            });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    const handleAction = async (id: number, action: "CONFIRMED" | "REJECTED") => {
        if (action === "CONFIRMED") {
            const booking = bookings.find(b => b.id === id);
            if (booking) {
                setSelectedBookingId(id);
                setSelectedBookingGroceryOption(booking.groceryOption);
                setIsAcceptDialogOpen(true);
            }
        } else {
            try {
                await bookingService.confirmBooking(id, { status: "REJECTED" });
                setBookings(prev => prev.map(booking =>
                    booking.id === id ? { ...booking, status: "REJECTED" } : booking
                ));
                toast.success(`Booking rejected`);
            } catch (error) {
                toast.error("Failed to reject booking");
            }
        }
    };

    const handleConfirmAccept = async () => {
        if (!selectedBookingId) return;
        try {
            await bookingService.confirmBooking(selectedBookingId, {
                status: "CONFIRMED",
                cookingCharge: Number(cookingCharge),
                groceryCost: selectedBookingGroceryOption === 'CHEF_PROVIDED' ? Number(groceryCost) : undefined
            });

            setBookings(prev => prev.map(booking =>
                booking.id === selectedBookingId ? {
                    ...booking,
                    status: "CONFIRMED",
                    cookingCharge: Number(cookingCharge),
                    groceryCost: selectedBookingGroceryOption === 'CHEF_PROVIDED' ? Number(groceryCost) : 0,
                    totalAmount: Number(cookingCharge) + (selectedBookingGroceryOption === 'CHEF_PROVIDED' ? Number(groceryCost) : 0)
                } : booking
            ));

            toast.success("Booking confirmed with price details updated sent to user");
            setIsAcceptDialogOpen(false);
            setCookingCharge("");
            setGroceryCost("");
        } catch (error) {
            toast.error("Failed to confirm booking");
        }
    };

    const pendingBookings = bookings.filter(b => b.status === "PENDING");
    const upcomingBookings = bookings.filter(b => b.status === "CONFIRMED" || b.status === "PAID");

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
                            <TabsTrigger value="messages">Messages</TabsTrigger>
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
                                                        <CardTitle className="text-xl font-bold">{booking.user?.name || 'Client'}</CardTitle>
                                                        <CardDescription>{booking.occasion || 'Private Chef Service'} • {booking.guests} Guests</CardDescription>
                                                    </div>
                                                    <div className="font-bold text-lg text-gold">
                                                        {booking.totalAmount ? `₹${booking.totalAmount}` : 'Price Pending'}
                                                    </div>
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
                                                        <div className="flex items-center gap-2">
                                                            <User className="w-4 h-4" />
                                                            <Button variant="link" className="p-0 h-auto text-xs" onClick={() => setSelectedUser(booking.user)}>
                                                                View User Profile
                                                            </Button>
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
                                            <CardTitle>{booking.user?.name || 'Client'}</CardTitle>
                                            <CardDescription>Confirmed for {booking.date} at {booking.time}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full w-fit">Confirmed</span>
                                                    <Button variant="link" className="p-0 h-auto text-xs w-fit" onClick={() => setSelectedUser(booking.user)}>
                                                        View User Profile
                                                    </Button>
                                                </div>
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
                                    <CardDescription>Update your public profile information</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="price">Price Per Hour (₹)</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    value={profileData.pricePerHour}
                                                    onChange={e => setProfileData({ ...profileData, pricePerHour: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="specialty">Headline Specialty</Label>
                                                <Input
                                                    id="specialty"
                                                    placeholder="e.g. Italian Cuisine Expert"
                                                    value={profileData.specialty}
                                                    onChange={e => setProfileData({ ...profileData, specialty: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    id="location"
                                                    value={profileData.location}
                                                    onChange={e => setProfileData({ ...profileData, location: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="experience">Experience</Label>
                                                <Input
                                                    id="experience"
                                                    placeholder="e.g. 10 Years"
                                                    value={profileData.experience}
                                                    onChange={e => setProfileData({ ...profileData, experience: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="specialties">Specialties (Comma separated)</Label>
                                            <Input
                                                id="specialties"
                                                placeholder="Pasta, Pizza, Risotto..."
                                                value={profileData.specialties}
                                                onChange={e => setProfileData({ ...profileData, specialties: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                rows={4}
                                                value={profileData.bio}
                                                onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="image">Profile Image URL</Label>
                                            <Input
                                                id="image"
                                                placeholder="https://..."
                                                value={profileData.image}
                                                onChange={e => setProfileData({ ...profileData, image: e.target.value })}
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <Button type="submit" variant="gold">Save Changes</Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="messages">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
                                <div className="md:col-span-1 border rounded-lg bg-card p-4 space-y-2">
                                    <h3 className="font-semibold mb-4">Conversations</h3>
                                    {/* Mock list of users to chat with derived from bookings */}
                                    {upcomingBookings.map(booking => (
                                        <div
                                            key={booking.id}
                                            className={`p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors border ${activeChat?.id === booking.id ? 'bg-muted border-gold/50' : 'border-transparent'}`}
                                            onClick={() => {
                                                setActiveChat(booking);
                                            }}
                                        >
                                            <div className="font-medium">{booking.user?.name || `Client #${booking.userId}`}</div>
                                            <div className="text-xs text-muted-foreground truncate">Ref: Booking #{booking.id}</div>
                                        </div>
                                    ))}
                                    {upcomingBookings.length === 0 && <p className="text-sm text-muted-foreground">No active bookings to chat with.</p>}
                                </div>
                                <div className="md:col-span-2">
                                    {activeChat ? (
                                        <ChatWindow
                                            otherUserId={activeChat.user?.id || activeChat.userId}
                                            otherUserName={activeChat.user?.name || "Client"}
                                            bookingId={activeChat.id}
                                            className="h-full"
                                        />
                                    ) : (
                                        <div className="h-full flex items-center justify-center border rounded-lg bg-muted/10 text-muted-foreground text-center p-6">
                                            <div>
                                                <User className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                                <p>Select a conversation with a client <br /> to start chatting about the booking.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />

            <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Booking</DialogTitle>
                        <DialogDescription>
                            Please enter the charges for this booking. The user will see this total before paying.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="cookingCharge">Cooking Charge (₹)</Label>
                            <Input
                                id="cookingCharge"
                                type="number"
                                placeholder="e.g. 5000"
                                value={cookingCharge}
                                onChange={(e) => setCookingCharge(e.target.value)}
                            />
                        </div>
                        {selectedBookingGroceryOption === 'CHEF_PROVIDED' && (
                            <div className="space-y-2">
                                <Label htmlFor="groceryCost">Grocery Cost (₹)</Label>
                                <Input
                                    id="groceryCost"
                                    type="number"
                                    placeholder="e.g. 2000"
                                    value={groceryCost}
                                    onChange={(e) => setGroceryCost(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="pt-2 text-right font-bold">
                            Total: ₹{Number(cookingCharge) + (selectedBookingGroceryOption === 'CHEF_PROVIDED' ? Number(groceryCost) : 0)}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAcceptDialogOpen(false)}>Cancel</Button>
                        <Button variant="gold" onClick={handleConfirmAccept}>Confirm & Send</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChefDashboard;
