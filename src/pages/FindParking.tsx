
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import ParkingSpotCard from "@/components/ParkingSpotCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMap } from "@/contexts/MapContext";
import { Loader2 } from "lucide-react";

const FindParking = () => {
  const navigate = useNavigate();
  const { isLoading, filteredSpots, applyFilters, userLocation } = useMap();
  
  // Filter states
  const [priceFilter, setPriceFilter] = useState<number>(100);
  const [distanceFilter, setDistanceFilter] = useState<number>(10);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  
  // State to track if filters have been applied
  const [filtersApplied, setFiltersApplied] = useState(false);
  
  const handleApplyFilters = () => {
    applyFilters(priceFilter, distanceFilter, ratingFilter);
    setFiltersApplied(true);
  };
  
  const handleResetFilters = () => {
    setPriceFilter(100);
    setDistanceFilter(10);
    setRatingFilter(0);
    applyFilters(null, null, null);
    setFiltersApplied(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="pt-16 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Find Parking in Hyderabad</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                
                <div className="space-y-6">
                  {/* Price Filter */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Price (Max ₹{priceFilter}/hr)
                    </label>
                    <Slider
                      value={[priceFilter]} 
                      min={10} 
                      max={100} 
                      step={5}
                      onValueChange={(value) => setPriceFilter(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>₹10</span>
                      <span>₹100</span>
                    </div>
                  </div>
                  
                  {/* Distance Filter */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Distance (Max {distanceFilter} km)
                    </label>
                    <Slider
                      value={[distanceFilter]} 
                      min={1} 
                      max={10} 
                      step={0.5}
                      onValueChange={(value) => setDistanceFilter(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>1 km</span>
                      <span>10 km</span>
                    </div>
                  </div>
                  
                  {/* Rating Filter */}
                  <div>
                    <label className="block mb-2 font-medium">
                      Rating (Min {ratingFilter})
                    </label>
                    <Slider
                      value={[ratingFilter]} 
                      min={0} 
                      max={5} 
                      step={0.5}
                      onValueChange={(value) => setRatingFilter(value[0])}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0</span>
                      <span>5</span>
                    </div>
                  </div>
                  
                  {/* Filter Buttons */}
                  <div className="flex flex-col space-y-2">
                    <Button onClick={handleApplyFilters} className="bg-parking-blue hover:bg-blue-500">
                      Apply Filters
                    </Button>
                    <Button onClick={handleResetFilters} variant="outline">
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-bold mb-4">Your Location</h2>
                {userLocation ? (
                  <p className="text-gray-700">
                    Lat: {userLocation.lat.toFixed(4)}, Long: {userLocation.lng.toFixed(4)}
                  </p>
                ) : (
                  <p className="text-gray-700">Detecting your location...</p>
                )}
                
                <h3 className="font-medium mt-4 mb-2">Results</h3>
                <p className="text-gray-700">
                  Found {filteredSpots.length} parking spot{filteredSpots.length !== 1 ? 's' : ''}
                  {filtersApplied ? ' with applied filters' : ''}
                </p>
              </div>
            </div>
            
            {/* Map & Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Google Map */}
              <div className="h-[400px] md:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
                <GoogleMap height="100%" />
              </div>
              
              {/* Parking Results */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Available Parking Spots</h2>
                
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 text-parking-blue animate-spin mb-4" />
                    <p className="text-gray-500">Loading parking spots...</p>
                  </div>
                ) : filteredSpots.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSpots.map((spot) => (
                      <ParkingSpotCard 
                        key={spot.id}
                        id={spot.id}
                        name={spot.name}
                        address={spot.address}
                        price={spot.price}
                        available={spot.available}
                        total={spot.total}
                        distance={spot.distance}
                        rating={spot.rating}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <p className="text-yellow-700">
                      No parking spots found matching your filters. Try adjusting your filters or search in a different area.
                    </p>
                    <Button onClick={handleResetFilters} variant="link" className="text-parking-blue p-0 mt-2">
                      Reset all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FindParking;
