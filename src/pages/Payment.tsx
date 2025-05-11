
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { BadgeIndianRupee, CreditCard, Smartphone } from "lucide-react";

interface BookingDetails {
  parkingId: string;
  parkingName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  vehicleType: string;
  vehicleNumber: string;
  price: number;
}

const Payment = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state for card payment
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  
  // Form state for UPI payment
  const [upiId, setUpiId] = useState("");
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    // Get booking details from localStorage
    const storedDetails = localStorage.getItem("bookingDetails");
    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails));
    } else {
      // If no booking details, redirect to find parking
      toast.error("No booking details found");
      navigate("/find-parking");
    }
  }, [isAuthenticated, navigate]);
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingDetails) {
      toast.error("No booking details found");
      return;
    }
    
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        toast.error("Please fill in all card details");
        return;
      }
      
      // Validate card number (simple validation)
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Invalid card number");
        return;
      }
      
      // Validate CVV
      if (cardCvv.length !== 3) {
        toast.error("Invalid CVV");
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        toast.error("Please enter UPI ID");
        return;
      }
      
      // Simple UPI validation
      if (!upiId.includes("@")) {
        toast.error("Invalid UPI ID");
        return;
      }
    }
    
    // Process payment (mock)
    setIsProcessing(true);
    
    setTimeout(() => {
      // Clear the booking details from localStorage
      localStorage.removeItem("bookingDetails");
      
      // Navigate to success page
      navigate("/success");
      
      setIsProcessing(false);
    }, 1500);
  };
  
  if (!isAuthenticated || !bookingDetails) {
    return null; // Avoid rendering until redirected or booking details loaded
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-12 pt-24">
          <h1 className="text-3xl font-bold mb-8">Payment</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Payment Method</CardTitle>
                  <CardDescription>
                    Select a payment method to complete your booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment}>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="mb-6"
                    >
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="upi" id="upi" />
                          <Label htmlFor="upi" className="flex items-center">
                            <Smartphone className="h-5 w-5 mr-2" />
                            UPI Payment
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    {/* Card Payment Form */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={19}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Cardholder Name</Label>
                          <Input
                            id="card-name"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-expiry">Expiry Date (MM/YY)</Label>
                            <Input
                              id="card-expiry"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="card-cvv">CVV</Label>
                            <Input
                              id="card-cvv"
                              type="password"
                              placeholder="123"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              maxLength={3}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* UPI Payment Form */}
                    {paymentMethod === "upi" && (
                      <div className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="upi-id">UPI ID</Label>
                          <Input
                            id="upi-id"
                            placeholder="username@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                          <p className="text-sm text-gray-500">
                            Enter your UPI ID linked with your bank account
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full mt-8 bg-parking-blue hover:bg-blue-500"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : `Pay ₹${bookingDetails.price}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Booking Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">{bookingDetails.parkingName}</h3>
                    <p className="text-sm text-gray-500">Parking ID: {bookingDetails.parkingId}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date</span>
                      <span>{new Date(bookingDetails.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time</span>
                      <span>{bookingDetails.startTime} - {bookingDetails.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span>{bookingDetails.duration} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vehicle</span>
                      <span className="capitalize">{bookingDetails.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vehicle Number</span>
                      <span>{bookingDetails.vehicleNumber}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="flex items-center">
                        <BadgeIndianRupee className="h-4 w-4 mr-1" />
                        {bookingDetails.price}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      * Includes all taxes
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>* By proceeding with the payment, you agree to our terms and conditions.</p>
                <p>* A confirmation will be sent to your email after successful payment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Payment;
