
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { CalendarPlus, MapPin, BadgeIndianRupee } from "lucide-react";
import { toast } from "sonner";

// Mock booking data
interface Booking {
  id: string;
  parkingName: string;
  location: string;
  date: string;
  timeSlot: string;
  vehicle: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
}

const mockBookings: Booking[] = [
  {
    id: "b001",
    parkingName: "Jubilee Hills Parking",
    location: "Road No. 10, Jubilee Hills",
    date: "2025-05-12",
    timeSlot: "10:00 AM - 12:00 PM",
    vehicle: "AP 12 AB 1234",
    status: "upcoming",
    price: 100
  },
  {
    id: "b002",
    parkingName: "Banjara Hills Parking",
    location: "Road No. 3, Banjara Hills",
    date: "2025-05-14",
    timeSlot: "02:00 PM - 04:00 PM",
    vehicle: "AP 12 AB 1234",
    status: "upcoming",
    price: 80
  },
  {
    id: "b003",
    parkingName: "HITEC City Parking",
    location: "HITEC City",
    date: "2025-05-05",
    timeSlot: "09:00 AM - 11:00 AM",
    vehicle: "AP 12 AB 1234",
    status: "completed",
    price: 120
  },
  {
    id: "b004",
    parkingName: "Gachibowli Parking",
    location: "Financial District, Gachibowli",
    date: "2025-05-01",
    timeSlot: "03:00 PM - 05:00 PM",
    vehicle: "AP 12 AB 1234",
    status: "completed",
    price: 110
  },
  {
    id: "b005",
    parkingName: "Begumpet Parking",
    location: "Begumpet",
    date: "2025-04-28",
    timeSlot: "11:00 AM - 01:00 PM",
    vehicle: "AP 12 AB 1234",
    status: "cancelled",
    price: 70
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { activePlan, expiryDate } = useSubscription();
  
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Load bookings
  useEffect(() => {
    // Filter bookings based on status
    setUpcomingBookings(mockBookings.filter(b => b.status === "upcoming"));
    setPastBookings(mockBookings.filter(b => b.status === "completed" || b.status === "cancelled"));
  }, []);
  
  const handleCancelBooking = (bookingId: string) => {
    setUpcomingBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: "cancelled" as const } 
          : booking
      ).filter(b => b.status === "upcoming")
    );
    
    setPastBookings(prev => [
      ...prev,
      { ...mockBookings.find(b => b.id === bookingId)!, status: "cancelled" as const }
    ]);
    
    toast.success("Booking cancelled successfully");
  };
  
  const handleReschedule = (bookingId: string) => {
    // In a real app, this would navigate to a reschedule form
    toast.info("Reschedule functionality will be implemented soon");
  };
  
  if (!isAuthenticated || !user) {
    return null; // Avoid rendering until redirected
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-12 pt-24">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          
          {/* User Profile and Subscription */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* User Profile */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Vehicle Number</p>
                      <p className="text-gray-900">{user.vehicleNumber}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Edit Profile</Button>
              </CardFooter>
            </Card>
            
            {/* Subscription Status */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                {activePlan ? (
                  <div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                      Active
                    </div>
                    <h3 className="text-xl font-bold">{activePlan.name} Plan</h3>
                    <p className="text-gray-500 mt-1">
                      {activePlan.currency}{activePlan.price}/{activePlan.duration}
                    </p>
                    {expiryDate && (
                      <p className="text-sm text-gray-500 mt-3">
                        Expires on {new Date(expiryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                      No Active Plan
                    </div>
                    <p className="text-gray-500">
                      Subscribe to a plan to enjoy exclusive benefits and discounts.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate("/subscriptions")}
                  className="w-full bg-parking-blue hover:bg-blue-500"
                >
                  {activePlan ? "Manage Subscription" : "View Plans"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Bookings */}
          <div>
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
                <TabsTrigger value="past">Past Bookings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {upcomingBookings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle>{booking.parkingName}</CardTitle>
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              Upcoming
                            </div>
                          </div>
                          <CardDescription className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Date</p>
                                <p className="text-gray-900">{new Date(booking.date).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Time Slot</p>
                                <p className="text-gray-900">{booking.timeSlot}</p>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Vehicle</p>
                                <p className="text-gray-900">{booking.vehicle}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Amount</p>
                                <p className="text-gray-900 flex items-center">
                                  <BadgeIndianRupee className="h-4 w-4 mr-1" />
                                  {booking.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button 
                            variant="outline"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={() => handleReschedule(booking.id)}
                            className="bg-parking-blue hover:bg-blue-500"
                          >
                            Reschedule
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <CalendarPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                    <p className="text-gray-500 mb-4">You don't have any upcoming parking reservations.</p>
                    <Button 
                      onClick={() => navigate("/find-parking")}
                      className="bg-parking-blue hover:bg-blue-500"
                    >
                      Find Parking
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                {pastBookings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle>{booking.parkingName}</CardTitle>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === "completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {booking.status === "completed" ? "Completed" : "Cancelled"}
                            </div>
                          </div>
                          <CardDescription className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Date</p>
                                <p className="text-gray-900">{new Date(booking.date).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Time Slot</p>
                                <p className="text-gray-900">{booking.timeSlot}</p>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Vehicle</p>
                                <p className="text-gray-900">{booking.vehicle}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Amount</p>
                                <p className="text-gray-900 flex items-center">
                                  <BadgeIndianRupee className="h-4 w-4 mr-1" />
                                  {booking.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          {booking.status === "completed" && (
                            <Button 
                              className="w-full bg-parking-blue hover:bg-blue-500"
                              variant="outline"
                            >
                              Book Again
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <CalendarPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No past bookings</h3>
                    <p className="text-gray-500 mb-4">You don't have any past parking reservations.</p>
                    <Button 
                      onClick={() => navigate("/find-parking")}
                      className="bg-parking-blue hover:bg-blue-500"
                    >
                      Find Parking
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
