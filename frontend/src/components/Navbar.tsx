import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Menu, X, UserCircle, LogOut, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Determine nav links based on role
  const navLinks = user?.role === "CHEF"
    ? [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/about", label: "About" },
    ]
    : [
      { href: "/", label: "Home" },
      { href: "/chefs", label: "Find Chefs" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/about", label: "About" },
    ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
            <ChefHat className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Cuisine<span className="text-gold">Maestros</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <UserCircle className="h-8 w-8 text-gold" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  My Profile
                </DropdownMenuItem>
                {/* Chat Links based on rol (Simplified: direct people to their respective dashboard pages where chat resides) */}
                {user.role === 'CHEF' && (
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="gold" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground py-2 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {user ? (
                  <div className="flex items-center justify-between py-2">
                    <span className="font-medium">{user.name}</span>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500">
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button variant="gold" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
