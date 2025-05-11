
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, CreditCard, Star, Check as CheckIcon } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

const Index = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      title: "Find Parking",
      description: "Easily find available parking spots near your destination in real-time.",
      icon: <MapPin className="h-6 w-6 text-parking-blue" />,
      buttonText: "Find Parking",
      onButtonClick: () => navigate("/find-parking")
    },
    {
      title: "Advanced Booking",
      description: "Reserve parking spots in advance to ensure availability when you arrive.",
      icon: <Calendar className="h-6 w-6 text-parking-blue" />,
      buttonText: "Book Now",
      onButtonClick: () => navigate("/find-parking")
    },
    {
      title: "Easy Payments",
      description: "Securely pay for parking using multiple payment options including UPI.",
      icon: <CreditCard className="h-6 w-6 text-parking-blue" />,
      buttonText: "Learn More",
      onButtonClick: () => navigate("/services")
    },
    {
      title: "Premium Services",
      description: "Access exclusive parking spots and valet services with our subscription plans.",
      icon: <Star className="h-6 w-6 text-parking-blue" />,
      buttonText: "View Plans",
      onButtonClick: () => navigate("/subscriptions")
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Find and Book Parking Easily in Hyderabad
            </h1>
            <p className="text-xl mb-6 text-blue-100">
              Discover available parking spots, reserve in advance, and pay securely with Easy Park & Pay.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate("/find-parking")} 
                className="bg-parking-blue hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-md text-lg"
              >
                Find Parking
              </Button>
              <Button 
                onClick={() => navigate("/book")} 
                className="bg-white hover:bg-gray-100 text-blue-700 font-bold py-3 px-6 rounded-md text-lg"
                variant="outline"
              >
                Book Now
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative h-72 w-full max-w-md md:h-96 rounded-lg shadow-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-lg font-semibold mb-2">Google Map Preview</p>
                <p className="text-sm opacity-70">Map will display here with your Google Maps API integration</p>
                <Button 
                  onClick={() => navigate("/find-parking")} 
                  className="mt-4 bg-parking-blue hover:bg-blue-500"
                >
                  View Full Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Easy Park & Pay offers comprehensive parking solutions to make your experience seamless and stress-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                buttonText={service.buttonText}
                onButtonClick={service.onButtonClick}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Easy Park & Pay makes finding and booking parking spots simple with just a few steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center text-parking-blue font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Find Parking</h3>
              <p className="text-gray-600">
                Search for available parking spots near your destination with real-time availability.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center text-parking-blue font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Book a Spot</h3>
              <p className="text-gray-600">
                Select your preferred parking location, enter your vehicle details, and choose your time slot.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center text-parking-blue font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Pay & Park</h3>
              <p className="text-gray-600">
                Complete payment securely and receive your parking pass. Simply show it when you arrive.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button 
              onClick={() => navigate("/find-parking")} 
              className="bg-parking-blue hover:bg-blue-500"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Subscription Promo Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Save More with Our Subscription Plans</h2>
              <p className="text-xl mb-6 text-blue-100">
                Get exclusive benefits, discounts on bookings, and premium services with our monthly subscription plans.
              </p>
              <Button 
                onClick={() => navigate("/subscriptions")} 
                className="bg-parking-blue hover:bg-blue-500"
              >
                View Subscription Plans
              </Button>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <span className="text-parking-blue font-bold">BEST VALUE</span>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">₹999</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority parking access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>20% discount on all bookings</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>Free valet service (twice/month)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>24/7 VIP customer support</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => navigate("/subscriptions")} 
                  className="w-full bg-parking-blue hover:bg-blue-500"
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
