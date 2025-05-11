
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface ParkingSpot {
  id: string;
  name: string;
  location: Location;
  address: string;
  distance: number;
  price: number;
  available: number;
  total: number;
  rating: number;
}

interface MapContextType {
  userLocation: Location | null;
  parkingSpots: ParkingSpot[];
  selectedParking: ParkingSpot | null;
  isLoading: boolean;
  setUserLocation: (location: Location) => void;
  getNearbyParkingSpots: () => void;
  selectParkingSpot: (id: string) => void;
  clearSelectedParking: () => void;
  calculateDistance: (point1: Location, point2: Location) => number;
  filteredSpots: ParkingSpot[];
  applyFilters: (priceMax: number | null, distanceMax: number | null, ratingMin: number | null) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};

const mockParkingSpots: ParkingSpot[] = [
  {
    id: "p1",
    name: "Jubilee Hills Parking",
    location: { lat: 17.431, lng: 78.409 },
    address: "Road No. 10, Jubilee Hills, Hyderabad",
    distance: 0,
    price: 50,
    available: 15,
    total: 30,
    rating: 4.5
  },
  {
    id: "p2",
    name: "Banjara Hills Parking",
    location: { lat: 17.416, lng: 78.434 },
    address: "Road No. 3, Banjara Hills, Hyderabad",
    distance: 0,
    price: 40,
    available: 8,
    total: 20,
    rating: 4.2
  },
  {
    id: "p3",
    name: "HITEC City Parking",
    location: { lat: 17.445, lng: 78.381 },
    address: "HITEC City, Hyderabad",
    distance: 0,
    price: 60,
    available: 25,
    total: 50,
    rating: 4.7
  },
  {
    id: "p4",
    name: "Gachibowli Parking",
    location: { lat: 17.441, lng: 78.348 },
    address: "Financial District, Gachibowli, Hyderabad",
    distance: 0,
    price: 55,
    available: 12,
    total: 25,
    rating: 4.0
  },
  {
    id: "p5",
    name: "Begumpet Parking",
    location: { lat: 17.444, lng: 78.466 },
    address: "Begumpet, Hyderabad",
    distance: 0,
    price: 35,
    available: 5,
    total: 15,
    rating: 3.8
  }
];

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<ParkingSpot[]>([]);
  const [selectedParking, setSelectedParking] = useState<ParkingSpot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Haversine formula to calculate distance between two points
  const calculateDistance = (point1: Location, point2: Location): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(point2.lat - point1.lat);
    const dLng = toRad(point2.lng - point1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get nearby parking spots based on user location
  const getNearbyParkingSpots = () => {
    setIsLoading(true);
    
    // In a real app, this would be an API call with user location
    setTimeout(() => {
      if (userLocation) {
        const spotsWithDistance = mockParkingSpots.map(spot => ({
          ...spot,
          distance: calculateDistance(userLocation, spot.location)
        }));
        
        // Sort by distance
        spotsWithDistance.sort((a, b) => a.distance - b.distance);
        
        setParkingSpots(spotsWithDistance);
        setFilteredSpots(spotsWithDistance);
      } else {
        setParkingSpots(mockParkingSpots);
        setFilteredSpots(mockParkingSpots);
      }
      
      setIsLoading(false);
    }, 1000);
  };

  // Initialize with browser geolocation if available
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
        },
        () => {
          // Default to Hyderabad center if geolocation fails
          setUserLocation({ lat: 17.385, lng: 78.4867 });
        }
      );
    } else {
      // Default to Hyderabad center if geolocation not supported
      setUserLocation({ lat: 17.385, lng: 78.4867 });
    }
  }, []);

  // Update parking spots when user location changes
  useEffect(() => {
    if (userLocation) {
      getNearbyParkingSpots();
    }
  }, [userLocation]);

  const selectParkingSpot = (id: string) => {
    const spot = parkingSpots.find(spot => spot.id === id);
    if (spot) {
      setSelectedParking(spot);
    }
  };

  const clearSelectedParking = () => {
    setSelectedParking(null);
  };

  const applyFilters = (priceMax: number | null, distanceMax: number | null, ratingMin: number | null) => {
    let filtered = [...parkingSpots];
    
    if (priceMax !== null) {
      filtered = filtered.filter(spot => spot.price <= priceMax);
    }
    
    if (distanceMax !== null && userLocation) {
      filtered = filtered.filter(spot => spot.distance <= distanceMax);
    }
    
    if (ratingMin !== null) {
      filtered = filtered.filter(spot => spot.rating >= ratingMin);
    }
    
    setFilteredSpots(filtered);
  };

  return (
    <MapContext.Provider
      value={{
        userLocation,
        parkingSpots,
        selectedParking,
        isLoading,
        setUserLocation,
        getNearbyParkingSpots,
        selectParkingSpot,
        clearSelectedParking,
        calculateDistance,
        filteredSpots,
        applyFilters
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
