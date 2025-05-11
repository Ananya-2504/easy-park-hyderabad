
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SuccessPage = () => {
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 text-center max-w-lg">
          <div className="bg-green-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
            <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Success!</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <p className="text-gray-700 text-lg mb-6">
              Your transaction has been completed successfully. A confirmation has been sent to your email.
            </p>
            
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-600 mb-2">Your booking reference:</p>
              <p className="text-xl font-bold text-gray-900 mb-6">EZP-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
              
              <p className="text-sm text-gray-500 mb-4">
                Please keep this reference number for any future communication regarding this booking.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-parking-blue hover:bg-blue-500"
            >
              View My Bookings
            </Button>
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SuccessPage;
