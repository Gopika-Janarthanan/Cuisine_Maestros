import { Star, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface ChefCardProps {
  id: string;
  name: string;
  image: string;
  specialty: string;
  cuisines: string[];
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  location: string;
  available: boolean;
}

const ChefCard = ({
  id,
  name,
  image,
  specialty,
  cuisines,
  rating,
  reviewCount,
  pricePerHour,
  location,
  available,
}: ChefCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/chef/${id}`} className="group block">
        <article className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={`Chef ${name}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {available && (
              <div className="absolute top-3 left-3 bg-green-500 text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Available
              </div>
            )}
            <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground text-sm font-bold px-3 py-1 rounded-full">
              ${pricePerHour}/hr
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-sm shrink-0">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="font-semibold text-foreground">{rating}</span>
                <span className="text-muted-foreground">({reviewCount})</span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-3">{specialty}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {cuisines.slice(0, 3).map((cuisine) => (
                <span
                  key={cuisine}
                  className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md"
                >
                  {cuisine}
                </span>
              ))}
              {cuisines.length > 3 && (
                <span className="text-muted-foreground text-xs px-2 py-1">
                  +{cuisines.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default ChefCard;
