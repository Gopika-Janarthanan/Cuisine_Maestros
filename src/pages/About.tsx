import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
                            About Cuisine<span className="text-gold">Maestros</span>
                        </h1>

                        <div className="prose prose-lg dark:prose-invert mx-auto">
                            <p className="lead text-xl text-muted-foreground text-center mb-12">
                                We are on a mission to reconnect people through the universal language of food, bringing culinary excellence from professional kitchens to your dining table.
                            </p>

                            <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
                                    <p className="text-muted-foreground mb-4">
                                        Founded in 2024, CuisineMaestros began with a simple question: Why is fine dining restricted to restaurants? We believed that the intimacy of a home gathering combined with the skill of a professional chef could create magic.
                                    </p>
                                    <p className="text-muted-foreground">
                                        Today, we connect talented chefs with food enthusiasts across the country, creating unforgettable memories one meal at a time.
                                    </p>
                                </div>
                                <div className="rounded-xl overflow-hidden shadow-elevated">
                                    <img
                                        src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&h=600&fit=crop"
                                        alt="Chefs cooking"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="mb-16">
                                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Our Values</h2>
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="bg-card p-6 rounded-lg text-center">
                                        <h3 className="font-bold text-lg mb-2 text-gold">Authenticity</h3>
                                        <p className="text-sm text-muted-foreground">We celebrate real food, traditional techniques, and genuine connections.</p>
                                    </div>
                                    <div className="bg-card p-6 rounded-lg text-center">
                                        <h3 className="font-bold text-lg mb-2 text-gold">Quality</h3>
                                        <p className="text-sm text-muted-foreground">From ingredients to service, we maintain the highest standards.</p>
                                    </div>
                                    <div className="bg-card p-6 rounded-lg text-center">
                                        <h3 className="font-bold text-lg mb-2 text-gold">Community</h3>
                                        <p className="text-sm text-muted-foreground">Supporting local chefs and bringing friends and families together.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
