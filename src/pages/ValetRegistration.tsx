
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { User } from "lucide-react";

const ValetRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    drivingExperience: "",
    licenseNumber: "",
    licenseExpiry: "",
    employmentType: "full-time",
    workHours: "",
    additionalInfo: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEmploymentTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, employmentType: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['name', 'email', 'phone', 'address', 'drivingExperience', 'licenseNumber', 'licenseExpiry'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      toast.success("Registration submitted successfully!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        drivingExperience: "",
        licenseNumber: "",
        licenseExpiry: "",
        employmentType: "full-time",
        workHours: "",
        additionalInfo: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-12 pt-24">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <div className="bg-blue-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-parking-blue" />
              </div>
              <h1 className="text-3xl font-bold">Valet Driver Registration</h1>
              <p className="text-gray-600 mt-2">
                Join our team of professional valet drivers and earn competitive wages
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <CardDescription>
                  Please fill in all the required information to apply for a valet driver position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="font-medium text-lg mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john.doe@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="address">Residential Address *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Your full address"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Driving Information */}
                    <div>
                      <h3 className="font-medium text-lg mb-4">Driving Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="drivingExperience">Driving Experience (years) *</Label>
                          <Input
                            id="drivingExperience"
                            name="drivingExperience"
                            type="number"
                            min="1"
                            value={formData.drivingExperience}
                            onChange={handleChange}
                            placeholder="Number of years"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber">Driving License Number *</Label>
                          <Input
                            id="licenseNumber"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            placeholder="TN1234567890123"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="licenseExpiry">License Expiry Date *</Label>
                          <Input
                            id="licenseExpiry"
                            name="licenseExpiry"
                            type="date"
                            value={formData.licenseExpiry}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Employment Details */}
                    <div>
                      <h3 className="font-medium text-lg mb-4">Employment Details</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Employment Type *</Label>
                          <RadioGroup 
                            value={formData.employmentType}
                            onValueChange={handleEmploymentTypeChange}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="full-time" id="full-time" />
                              <Label htmlFor="full-time">Full-time</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="part-time" id="part-time" />
                              <Label htmlFor="part-time">Part-time</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="weekends" id="weekends" />
                              <Label htmlFor="weekends">Weekends Only</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="workHours">Preferred Work Hours</Label>
                          <Input
                            id="workHours"
                            name="workHours"
                            value={formData.workHours}
                            onChange={handleChange}
                            placeholder="e.g., 9 AM - 5 PM"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="additionalInfo">Additional Information</Label>
                          <Textarea
                            id="additionalInfo"
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            placeholder="Any additional information you'd like to share..."
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-sm text-gray-500 mb-4">
                      By submitting this application, you confirm that all the information provided is accurate and complete.
                    </p>
                    <Button 
                      type="submit" 
                      className="w-full bg-parking-blue hover:bg-blue-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t pt-6 flex flex-col items-start">
                <h3 className="font-medium mb-2">Application Process:</h3>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>Submit application form</li>
                  <li>Document verification</li>
                  <li>Driving test and interview</li>
                  <li>Training program</li>
                  <li>Start working as a valet driver</li>
                </ol>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ValetRegistration;
