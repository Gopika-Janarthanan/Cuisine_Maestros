import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Profile = () => {
    const { user, logout } = useAuth();

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
                <div className="container mx-auto px-4 max-w-2xl">
                    <h1 className="font-display text-4xl font-bold text-foreground mb-8">My Profile</h1>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-6">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">{user.name}</CardTitle>
                                <CardDescription>{user.email}</CardDescription>
                                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                    {user.role === 'CHEF' ? 'Chef' : 'Customer'}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <h3 className="font-semibold text-lg">Account Details</h3>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="font-medium text-muted-foreground">User ID</div>
                                    <div className="col-span-2">{user.id}</div>

                                    <div className="font-medium text-muted-foreground">Role</div>
                                    <div className="col-span-2">{user.role}</div>

                                    {user.chefId && (
                                        <>
                                            <div className="font-medium text-muted-foreground">Chef ID</div>
                                            <div className="col-span-2">{user.chefId}</div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button variant="destructive" onClick={logout}>Sign Out</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
