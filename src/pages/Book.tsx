
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useMap } from "@/contexts/MapContext";
import { toast } from "sonner";
import { ArrowRight, BadgeIndianRupee } from "lucide-react";

interface ServiceDetails {
  serviceName: string;
  price: number;
  serviceType: string;
}

const Book = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isAuthenticated, user } = useAuth();
  const { selectedParking, parkingSpots } = useMap();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Find parking from URL parameter or use selected parking
  const parkingId = params.parkingId;
  const [parking, setParking] = useState(
    selectedParking || 
    (parkingId ? parkingSpots.find(spot => spot.id === parkingId) : null)
  );
  
  // Get any selected service from localStorage
  const [selectedService, setSelectedService] = useState<ServiceDetails | null>(null);
  
  useEffect(() => {
    const serviceData = localStorage.getItem("selectedService");
    if (serviceData) {
      try {
        const parsedService = JSON.parse(serviceData);
        setSelectedService(parsedService);
      } catch (error) {
        console.error("Error parsing service data:", error);
      }
    }
  }, []);
  
  // Booking state
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState("10:00");
  const [duration, setDuration] = useState(2);
  const [vehicleType, setVehicleType] = useState("car");
  const [vehicleNumber, setVehicleNumber] = useState(user?.vehicleNumber || "");
  
  // Calculation
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    // Calculate total price based on duration and parking spot price
    if (parking) {
      let basePrice = parking.price * duration;
      
      // Add vehicle type multiplier
      const vehicleMultiplier = vehicleType === "car" ? 1 : vehicleType === "bike" ? 0.7 : 1.5;
      let calculatedPrice = basePrice * vehicleMultiplier;
      
      // Add any additional service costs
      if (selectedService) {
        if (selectedService.serviceType === "parking") {
          // For parking-type services, replace the base rate with the service rate
          calculatedPrice = selectedService.price * duration * vehicleMultiplier;
        } else if (selectedService.serviceType === "charging") {
          // For EV charging, apply the rate to the duration
          calculatedPrice += selectedService.price * duration;
        } else {
          // For flat-fee services, just add the service price
          calculatedPrice += selectedService.price;
        }
      }
      
      setTotalPrice(Math.round(calculatedPrice));
    }
  }, [parking, duration, vehicleType, selectedService]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!parking) {
      toast.error("Please select a parking location");
      return;
    }
    
    if (!date || !startTime || duration <= 0 || !vehicleNumber) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // In a real app, this would send booking details to backend
    // For now, we'll just navigate to payment page with booking details
    const bookingDetails = {
      parkingId: parking.id,
      parkingName: parking.name,
      date,
      startTime,
      duration,
      endTime: calculateEndTime(startTime, duration),
      vehicleType,
      vehicleNumber,
      price: totalPrice,
      services: selectedService ? [selectedService.serviceName] : []
    };
    
    // Store booking details in localStorage for payment page
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    
    // Navigate to payment page
    navigate("/payment");
  };
  
  const calculateEndTime = (start: string, hours: number): string => {
    const [startHour, startMinute] = start.split(':').map(Number);
    let endHour = startHour + Math.floor(hours);
    const endMinute = startMinute + ((hours % 1) * 60);
    
    if (endMinute >= 60) {
      endHour += Math.floor(endMinute / 60);
    }
    
    endHour = endHour % 24;
    
    return `${String(endHour).padStart(2, '0')}:${String(Math.floor(endMinute % 60)).padStart(2, '0')}`;
  };
  
  if (!isAuthenticated) {
    return null; // Avoid rendering until redirected
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-12 pt-24">
          <h1 className="text-3xl font-bold mb-8">Book Parking</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>Fill in the details to book your parking spot</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Parking Location */}
                    <div className="space-y-2">
                      <Label htmlFor="parking-location">Parking Location</Label>
                      {parking ? (
                        <div className="p-4 bg-gray-50 rounded-md">
                          <p className="font-medium">{parking.name}</p>
                          <p className="text-sm text-gray-500">{parking.address}</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span>Price: ₹{parking.price}/hr</span>
                            <span>Available: {parking.available}/{parking.total} spots</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col space-y-2">
                          <p className="text-sm text-red-500">No parking location selected</p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/find-parking")}
                          >
                            Select Parking Location
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Selected Service (if any) */}
                    {selectedService && (
                      <div className="space-y-2">
                        <Label>Selected Service</Label>
                        <div className="p-4 bg-blue-50 rounded-md">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{selectedService.serviceName}</p>
                              <p className="text-sm text-gray-500">
                                {selectedService.serviceType === "parking" || selectedService.serviceType === "charging" 
                                  ? `₹${selectedService.price}/hr` 
                                  : `₹${selectedService.price} (flat fee)`}
                              </p>
                            </div>
                            <Button 
                              type="button" 
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedService(null);
                                localStorage.removeItem("selectedService");
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input
                          id="start-time"
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Duration */}
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (hours)</Label>
                      <div className="flex items-center space-x-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => duration > 1 && setDuration(duration - 1)}
                          className="h-10 w-10 p-0"
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-medium">{duration}</span>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setDuration(duration + 1)}
                          className="h-10 w-10 p-0"
                        >
                          +
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Expected end time: {calculateEndTime(startTime, duration)}
                      </p>
                    </div>
                    
                    {/* Vehicle Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-type">Vehicle Type</Label>
                        <Select value={vehicleType} onValueChange={setVehicleType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bike">Bike</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-number">Vehicle Number</Label>
                        <Input
                          id="vehicle-number"
                          value={vehicleNumber}
                          onChange={(e) => setVehicleNumber(e.target.value)}
                          placeholder="e.g., AP 12 AB 1234"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-parking-blue hover:bg-blue-500 flex items-center justify-center"
                        disabled={!parking}
                      >
                        Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Price Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Base Rate</span>
                    <span>₹{selectedService && selectedService.serviceType === "parking" 
                      ? selectedService.price 
                      : parking?.price || 0}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span>{duration} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vehicle Type</span>
                    <span className="capitalize">{vehicleType}</span>
                  </div>
                  
                  {/* Display additional services */}
                  {selectedService && selectedService.serviceType !== "parking" && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">{selectedService.serviceName}</span>
                      <span>₹{selectedService.price}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="flex items-center">
                        <BadgeIndianRupee className="h-4 w-4 mr-1" />
                        {totalPrice}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>* Prices include all applicable taxes</p>
                    <p>* Cancellation available up to 1 hour before booking time</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Book;
