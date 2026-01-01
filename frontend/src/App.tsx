import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chefs from "./pages/Chefs";
import ChefProfile from "./pages/ChefProfile";
import SignIn from "./pages/SignIn";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import ChefDashboard from "./pages/ChefDashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignIn />} /> {/* Alias register to same page due to tabs */}
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/chefs" element={<Chefs />} />
            <Route path="/chef/:id" element={<ChefProfile />} />
            <Route path="/dashboard" element={<ChefDashboard />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
