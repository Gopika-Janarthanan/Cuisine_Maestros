import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Calendar, UtensilsCrossed, Star } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: <Search className="w-12 h-12 text-gold" />,
            title: "1. Discover Chefs",
            description: "Browse our curated list of professional chefs. Filter by cuisine, location, and price to find the perfect match for your taste."
        },
        {
            icon: <Calendar className="w-12 h-12 text-gold" />,
            title: "2. Book Your Date",
            description: "Select your preferred date and time. Communicate directly with the chef to discuss your menu preferences and any dietary requirements."
        },
        {
            icon: <UtensilsCrossed className="w-12 h-12 text-gold" />,
            title: "3. Enjoy the Experience",
            description: "Your chef arrives with fresh ingredients, prepares a gourmet meal in your kitchen, serves it, and even handles the cleanup."
        },
        {
            icon: <Star className="w-12 h-12 text-gold" />,
            title: "4. Rate & Review",
            description: "Share your experience with the community. Your reviews help our chefs maintain top-quality service."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                            How Cuisine<span className="text-gold">Maestros</span> Works
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Bringing the fine dining experience directly to your home has never been easier.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-card p-8 rounded-xl shadow-soft flex flex-col items-center text-center">
                                <div className="mb-6 bg-gold/10 p-4 rounded-full">
                                    {step.icon}
                                </div>
                                <h3 className="font-display text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 bg-muted/30 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Ready to elevate your dining?</h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Join thousands of food lovers who have transformed their home dining into an unforgettable event.
                        </p>
                        <a href="/chefs" className="inline-flex items-center justify-center px-8 py-3 bg-gold text-primary-foreground font-semibold rounded-lg hover:bg-gold/90 transition-colors">
                            Find a Chef Now
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HowItWorks;
