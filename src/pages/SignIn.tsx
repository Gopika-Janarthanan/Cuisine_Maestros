import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChefHat, User } from "lucide-react";
import { apiClient } from "@/services/api";

const SignIn = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Login State
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register State
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [role, setRole] = useState<"USER" | "CHEF">("USER");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // In a real app, use the backend. For demo/fallback, sim success if backend fails/mocks.
            try {
                await apiClient.post("/auth/login", { email: loginEmail, password: loginPassword });
            } catch (err) {
                console.warn("Backend unavailable, using mock login");
            }
            // Store user session via Context
            const mockRole = loginEmail.includes("chef") ? "CHEF" : "USER";
            const mockUser = { name: "John Doe", email: loginEmail, role: mockRole };
            // Assuming 'login' function is provided by a context or similar mechanism
            // login(mockUser); 

            toast.success("Welcome back!", { description: "You have successfully signed in." });
            navigate(mockRole === "CHEF" ? "/dashboard" : "/");
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            try {
                await apiClient.post("/auth/register", { name: regName, email: regEmail, password: regPassword, role });
            } catch (err) {
                console.warn("Backend unavailable, using mock register");
                // Store user session via Context
                const mockUser = { name: regName || "New User", email: regEmail, role };
                // Assuming 'login' function is provided by a context or similar mechanism
                // login(mockUser);
            }

            const roleMsg = role === "CHEF" ? "Your chef application has been initialized." : "Ready to hire a chef?";
            toast.success("Account created successfully!", { description: roleMsg });
            navigate(role === "CHEF" ? "/dashboard" : "/");
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4 pt-20">
                <Card className="w-full max-w-md shadow-elevated border-none bg-card/90 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="font-display text-3xl font-bold text-foreground">
                            Welcome to Cuisine<span className="text-gold">Maestros</span>
                        </CardTitle>
                        <CardDescription>
                            Sign in to manage your bookings or create a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="login">Sign In</TabsTrigger>
                                <TabsTrigger value="register">Create Account</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login">
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" variant="gold" disabled={loading}>
                                        {loading ? "Signing in..." : "Sign In"}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="register">
                                <form onSubmit={handleRegister} className="space-y-4">
                                    {/* Role Selection */}
                                    <div className="space-y-3 mb-6">
                                        <Label className="text-base font-semibold">I want to...</Label>
                                        <RadioGroup defaultValue="USER" onValueChange={(v) => setRole(v as "USER" | "CHEF")} className="grid grid-cols-2 gap-4">
                                            <div>
                                                <RadioGroupItem value="USER" id="role-user" className="peer sr-only" />
                                                <Label
                                                    htmlFor="role-user"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gold peer-data-[state=checked]:bg-gold/5 [&:has([data-state=checked])]:border-gold cursor-pointer transition-all"
                                                >
                                                    <User className="mb-2 h-6 w-6" />
                                                    <span className="font-semibold">Hire a Chef</span>
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="CHEF" id="role-chef" className="peer sr-only" />
                                                <Label
                                                    htmlFor="role-chef"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-gold peer-data-[state=checked]:bg-gold/5 [&:has([data-state=checked])]:border-gold cursor-pointer transition-all"
                                                >
                                                    <ChefHat className="mb-2 h-6 w-6" />
                                                    <span className="font-semibold">Be a Chef</span>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="reg-name">Full Name</Label>
                                        <Input
                                            id="reg-name"
                                            placeholder="John Doe"
                                            required
                                            value={regName}
                                            onChange={(e) => setRegName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-email">Email Address</Label>
                                        <Input
                                            id="reg-email"
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            value={regEmail}
                                            onChange={(e) => setRegEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-pass">Password</Label>
                                        <Input
                                            id="reg-pass"
                                            type="password"
                                            required
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" variant="gold" disabled={loading}>
                                        {loading ? "Creating Account..." : "Create Account"}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="justify-center text-sm text-muted-foreground">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </CardFooter>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;
