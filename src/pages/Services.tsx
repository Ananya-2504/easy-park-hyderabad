import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ListCheck, Calendar, CreditCard, MapPin, Star, CalendarPlus } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const handleServiceBooking = (serviceName: string, price: number, serviceType: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to book services");
      navigate("/login");
      return;
    }
    
    // Store selected service details in localStorage for the booking form
    const serviceDetails = {
      serviceName,
      price,
      serviceType
    };
    
    localStorage.setItem("selectedService", JSON.stringify(serviceDetails));
    navigate("/book");
  };
  
  const parkingServices = [
    {
      title: "Regular Parking",
      description: "Find and book regular parking spots across Hyderabad with real-time availability updates.",
      price: "₹40/hr",
      basePrice: 40,
      icon: <MapPin className="h-6 w-6 text-parking-blue" />,
      buttonText: "Find Parking",
      onButtonClick: () => handleServiceBooking("Regular Parking", 40, "parking")
    },
    {
      title: "Premium Parking",
      description: "Book exclusive premium parking spots with wider spaces and better security.",
      price: "₹60/hr",
      basePrice: 60,
      icon: <Star className="h-6 w-6 text-parking-blue" />,
      buttonText: "Book Premium",
      onButtonClick: () => handleServiceBooking("Premium Parking", 60, "parking")
    },
    {
      title: "Advanced Booking",
      description: "Reserve parking spots up to 30 days in advance to ensure availability.",
      price: "₹50/hr",
      basePrice: 50,
      icon: <Calendar className="h-6 w-6 text-parking-blue" />,
      buttonText: "Book Now",
      onButtonClick: () => handleServiceBooking("Advanced Booking", 50, "parking")
    },
    {
      title: "Monthly Pass",
      description: "Get dedicated parking spots with monthly subscriptions for regular commuters.",
      price: "₹3000/month",
      basePrice: 3000,
      icon: <CalendarPlus className="h-6 w-6 text-parking-blue" />,
      buttonText: "Subscribe",
      onButtonClick: () => navigate("/subscriptions")
    }
  ];
  
  const additionalServices = [
    {
      title: "Valet Parking",
      description: "Our professional drivers park your vehicle for you. Available at selected locations.",
      price: "₹100/service",
      basePrice: 100,
      icon: <ListCheck className="h-6 w-6 text-parking-blue" />,
      buttonText: "Book Valet",
      onButtonClick: () => handleServiceBooking("Valet Parking", 100, "valet")
    },
    {
      title: "Car Wash",
      description: "Get your car cleaned while it's parked. Available at premium parking locations.",
      price: "₹250/service",
      basePrice: 250,
      icon: <ListCheck className="h-6 w-6 text-parking-blue" />,
      buttonText: "Add Service",
      onButtonClick: () => handleServiceBooking("Car Wash", 250, "additional")
    },
    {
      title: "EV Charging",
      description: "Electric vehicle charging stations available at select parking locations.",
      price: "₹80/hr",
      basePrice: 80,
      icon: <ListCheck className="h-6 w-6 text-parking-blue" />,
      buttonText: "Find EV Spots",
      onButtonClick: () => handleServiceBooking("EV Charging", 80, "charging")
    },
    {
      title: "Vehicle Insurance",
      description: "Optional insurance for your vehicle during parking duration.",
      price: "₹50/day",
      basePrice: 50,
      icon: <ListCheck className="h-6 w-6 text-parking-blue" />,
      buttonText: "Learn More",
      onButtonClick: () => handleServiceBooking("Vehicle Insurance", 50, "insurance")
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-12 pt-24">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Easy Park & Pay offers comprehensive parking services to make your parking experience seamless and hassle-free.
            </p>
          </div>
          
          {/* Parking Services */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Parking Services</h2>
              <Button
                onClick={() => navigate("/find-parking")}
                variant="outline"
                className="text-parking-blue border-parking-blue hover:bg-blue-50"
              >
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {parkingServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  icon={service.icon}
                  buttonText={service.buttonText}
                  onButtonClick={service.onButtonClick}
                />
              ))}
            </div>
          </section>
          
          {/* Additional Services */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold mr-3">Additional Services</h2>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">New</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  icon={service.icon}
                  buttonText={service.buttonText}
                  onButtonClick={service.onButtonClick}
                />
              ))}
            </div>
          </section>
          
          {/* Subscription Promo */}
          <section className="bg-blue-900 text-white rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold mb-4">Subscribe for Premium Benefits</h2>
                <p className="text-blue-100 mb-6">
                  Get exclusive perks, discounts, and priority access with our subscription plans.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority access to premium parking spots</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Up to 20% discount on regular bookings</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Complimentary valet service twice a month</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 premium customer support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate("/subscriptions")} 
                  className="bg-parking-blue hover:bg-blue-500"
                >
                  View Subscription Plans
                </Button>
              </div>
              <div className="hidden lg:flex items-center justify-center bg-blue-800 p-12">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">₹999</div>
                  <div className="text-blue-300 mb-6">Premium Plan / month</div>
                  <Button 
                    onClick={() => navigate("/subscriptions")} 
                    className="bg-white text-blue-900 hover:bg-gray-100"
                  >
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;
