
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useMap } from "@/contexts/MapContext";
import { MapPin, ArrowRight } from "lucide-react";

interface ParkingSpotCardProps {
  id: string;
  name: string;
  address: string;
  price: number;
  available: number;
  total: number;
  distance: number;
  rating: number;
}

const ParkingSpotCard = ({
  id,
  name,
  address,
  price,
  available,
  total,
  distance,
  rating
}: ParkingSpotCardProps) => {
  const navigate = useNavigate();
  const { selectParkingSpot } = useMap();
  
  const handleSelectParking = () => {
    selectParkingSpot(id);
    navigate(`/book/${id}`);
  };

  const getAvailabilityColor = () => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-green-600";
    if (percentage > 20) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
          <div className="flex items-center">
            <span className="text-yellow-500 text-lg font-bold">{rating}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 ml-1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start mb-2">
          <MapPin className="mr-2 h-5 w-5 text-parking-blue flex-shrink-0" />
          <p className="text-gray-600">{address}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-bold">₹{price}/hr</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">Distance</p>
            <p className="font-bold">{distance.toFixed(1)} km</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-500">Available</p>
            <p className={`font-bold ${getAvailabilityColor()}`}>{available}/{total}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button onClick={handleSelectParking} className="w-full bg-parking-blue hover:bg-blue-500 flex items-center justify-center">
          Book Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ParkingSpotCard;
