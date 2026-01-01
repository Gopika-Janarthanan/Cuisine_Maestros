import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bookingService } from "@/services/bookingService";
import { paymentService } from "@/services/paymentService";
import { apiClient } from "@/services/api";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, CreditCard, ChefHat } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import ChatWindow from "@/components/ChatWindow";

const Profile = () => {
    const { user, logout, updateProfile } = useAuth();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Payment Dialog State
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'ONLINE'>('ONLINE');
    const [processingPayment, setProcessingPayment] = useState(false);

    // Edit Profile State
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [editData, setEditData] = useState({ name: "", imageUrl: "" });
    const [activeChat, setActiveChat] = useState<any>(null);

    useEffect(() => {
        if (user) {
            setEditData({
                name: user.name,
                imageUrl: (user as any).imageUrl || "" // Handle missing field in interface safely
            });
            loadBookings();
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!user?.id) return;
        try {
            const updatedUser = await apiClient.put<any>(`/users/${user.id}`, editData);

            // Update context (this also handles local storage)
            updateProfile({
                name: updatedUser.name,
                imageUrl: updatedUser.imageUrl
            });

            toast.success("Profile updated successfully");
            setIsEditProfileOpen(false);
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile");
        }
    };

    const loadBookings = async () => {
        try {
            if (user?.id) {
                const data = await bookingService.getBookingsForUser(String(user.id));
                setBookings(data);
            }
        } catch (error) {
            console.error("Failed to load bookings", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayClick = (booking: any) => {
        setSelectedBooking(booking);
        setIsPaymentOpen(true);
    };

    const handlePaymentSubmit = async () => {
        if (!selectedBooking) return;
        setProcessingPayment(true);
        try {
            await paymentService.createPayment({
                bookingId: selectedBooking.id,
                method: paymentMethod
            });
            toast.success("Payment successful!");
            setIsPaymentOpen(false);
            loadBookings(); // Refresh status
        } catch (error) {
            toast.error("Payment failed. Please try again.");
        } finally {
            setProcessingPayment(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto px-4 pt-32 text-center">
                    <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                    <p>You need to be logged in to view your profile.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="font-display text-4xl font-bold text-foreground">My Profile</h1>
                        <Button variant="destructive" onClick={logout}>Sign Out</Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Profile Info */}
                        <div className="md:col-span-1">
                            <Card>
                                <CardHeader className="flex flex-col items-center text-center">
                                    <Avatar className="w-24 h-24 mb-4">
                                        <AvatarImage src={(user as any).imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="text-xl">{user.name}</CardTitle>
                                    <CardDescription>{user.email}</CardDescription>
                                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                        {user.role === 'CHEF' ? 'Chef' : 'Customer'}
                                    </div>
                                    <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsEditProfileOpen(true)}>
                                        Edit Profile
                                    </Button>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Bookings */}
                        <div className="md:col-span-2">
                            <Tabs defaultValue="bookings">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                                    <TabsTrigger value="messages">Messages</TabsTrigger>
                                </TabsList>
                                <TabsContent value="bookings" className="space-y-4">
                                    {bookings.length === 0 ? (
                                        <Card>
                                            <CardContent className="pt-6 text-center text-muted-foreground">
                                                No bookings found. Time to hire a chef!
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        bookings.map((booking) => (
                                            <Card key={booking.id}>
                                                <CardHeader>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                                                <ChefHat className="w-5 h-5" />
                                                                {booking.chef?.name || `Chef #${booking.chefId}`}
                                                            </CardTitle>
                                                            <CardDescription>
                                                                {new Date(booking.date).toLocaleDateString()} at {booking.time}
                                                            </CardDescription>
                                                        </div>
                                                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${booking.status === 'PAID' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                            booking.status === 'CONFIRMED' ? 'bg-green-50 text-green-700 border-green-200' :
                                                                booking.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                                                                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                            }`}>
                                                            {booking.status === 'PAID' ? 'PAID & SECURED' : booking.status}
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-2 text-sm">
                                                        {booking.status === 'PAID' && (
                                                            <div className="mb-4 p-2 bg-blue-50/50 rounded border border-blue-100/50 text-blue-700 text-xs flex items-center gap-2">
                                                                <CreditCard className="w-3 h-3" />
                                                                Payment confirmed. Your chef is notified!
                                                            </div>
                                                        )}
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Address:</span>
                                                            <span className="font-medium text-right">
                                                                {booking.address ? `${booking.address.street}, ${booking.address.city}` : 'N/A'}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Guests:</span>
                                                            <span className="font-medium">{booking.guests}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-muted-foreground">Total Amount:</span>
                                                            <span className="font-medium text-lg text-gold">
                                                                {booking.totalAmount ? `₹${booking.totalAmount}` : 'Pending'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                {booking.status === 'CONFIRMED' && (
                                                    <CardFooter>
                                                        <Button className="w-full" variant="gold" onClick={() => handlePayClick(booking)}>
                                                            <CreditCard className="w-4 h-4 mr-2" />
                                                            Pay Now (₹{booking.totalAmount})
                                                        </Button>
                                                    </CardFooter>
                                                )}
                                            </Card>
                                        ))
                                    )}
                                </TabsContent>
                                <TabsContent value="messages">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
                                        <div className="md:col-span-1 border rounded-lg bg-card p-4 space-y-2">
                                            <h3 className="font-semibold mb-4">Conversations</h3>
                                            {/* Mock list of chefs to chat with derived from bookings */}
                                            {bookings.map(booking => (
                                                <div
                                                    key={booking.id}
                                                    className={`p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors border ${activeChat?.id === booking.id ? 'bg-muted border-gold/50' : 'border-transparent'}`}
                                                    onClick={() => {
                                                        setActiveChat(booking);
                                                    }}
                                                >
                                                    <div className="font-medium">{booking.chef?.name || `Chef ${booking.chefId}`}</div>
                                                    <div className="text-xs text-muted-foreground truncate">Ref: Booking #{booking.id}</div>
                                                </div>
                                            ))}
                                            {bookings.length === 0 && <p className="text-sm text-muted-foreground">No active bookings to chat with.</p>}
                                        </div>
                                        <div className="md:col-span-2">
                                            {activeChat ? (
                                                <ChatWindow
                                                    otherUserId={activeChat.chef?.user?.id || activeChat.chef?.userId}
                                                    otherUserName={activeChat.chef?.name || "Chef"}
                                                    bookingId={activeChat.id}
                                                    className="h-full"
                                                />
                                            ) : (
                                                <div className="h-full flex items-center justify-center border rounded-lg bg-muted/10 text-muted-foreground text-center p-6">
                                                    <div>
                                                        <ChefHat className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                                        <p>Select a conversation with a chef <br /> to start chatting about your booking.</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Payment</DialogTitle>
                        <DialogDescription>
                            Total Amount: <span className="font-bold text-foreground">₹{selectedBooking?.totalAmount}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <Label className="mb-3 block">Payment Method</Label>
                        <RadioGroup value={paymentMethod} onValueChange={(v: "CASH" | "ONLINE") => setPaymentMethod(v)} className="space-y-3">
                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                                <RadioGroupItem value="ONLINE" id="online" />
                                <Label htmlFor="online" className="flex-1 cursor-pointer">Online Payment (Card/UPI)</Label>
                            </div>
                            <div className="flex items-center space-x-2 border p-3 rounded-md">
                                <RadioGroupItem value="CASH" id="cash" />
                                <Label htmlFor="cash" className="flex-1 cursor-pointer">Cash (Pay to Chef)</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>Cancel</Button>
                        <Button variant="gold" onClick={handlePaymentSubmit} disabled={processingPayment}>
                            {processingPayment ? 'Processing...' : 'Confirm Payment'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Update your personal information</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={editData.name}
                                onChange={e => setEditData({ ...editData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="avatar">Profile Image URL</Label>
                            <Input
                                id="avatar"
                                placeholder="https://..."
                                value={editData.imageUrl}
                                onChange={e => setEditData({ ...editData, imageUrl: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditProfileOpen(false)}>Cancel</Button>
                        <Button variant="gold" onClick={handleUpdateProfile}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default Profile;
