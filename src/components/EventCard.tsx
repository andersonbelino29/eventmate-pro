import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  availableSpots: number;
  price?: number; // preço por pessoa (opcional)
  pricingType?: 'per_person' | 'per_table';
  tables?: Array<{ id: string; name: string; seats: number; price: number; available: number }>;
  image: string;
  category: string;
}

const EventCard = ({ 
  id, 
  title, 
  description, 
  date, 
  time, 
  location, 
  capacity, 
  availableSpots, 
  price,
  pricingType = 'per_person',
  tables = [],
  image, 
  category 
}: EventCardProps) => {
  const { tenantSlug } = useParams();
  const basePath = tenantSlug ? `/${tenantSlug}` : "";

  // Calcular preço de exibição baseado no tipo
  const displayPrice = () => {
    if (pricingType === 'per_person' && price) {
      return `R$ ${price.toFixed(2)}`;
    } else if (pricingType === 'per_table' && tables.length > 0) {
      const minPrice = Math.min(...tables.map(t => t.price));
      const maxPrice = Math.max(...tables.map(t => t.price));
      if (minPrice === maxPrice) {
        return `R$ ${minPrice.toFixed(2)}`;
      }
      return `R$ ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`;
    }
    return 'Consulte';
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-gradient-card border-0">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
              {category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {displayPrice()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            {date}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            {time}
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {location}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-primary" />
            {availableSpots} de {capacity} vagas disponíveis
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Link to={`${basePath}/evento/${id}`} className="w-full">
          <Button
            variant="hero" 
            className="w-full"
            disabled={availableSpots === 0}
          >
            {availableSpots === 0 ? 'Esgotado' : 'Ver Detalhes'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;