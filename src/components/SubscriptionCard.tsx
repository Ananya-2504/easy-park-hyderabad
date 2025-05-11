
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { toast } from "sonner";

interface SubscriptionCardProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
}

const SubscriptionCard = ({
  id,
  name,
  price,
  currency,
  duration,
  features,
  isPopular = false
}: SubscriptionCardProps) => {
  const navigate = useNavigate();
  const { subscribeToPlan, activePlan } = useSubscription();
  
  const isActive = activePlan?.id === id;
  
  const handleSubscribe = async () => {
    if (isActive) {
      toast.info("You are already subscribed to this plan");
      return;
    }
    
    const success = await subscribeToPlan(id);
    if (success) {
      navigate("/success");
    }
  };

  return (
    <Card className={`w-full h-full flex flex-col ${isPopular ? 'border-parking-blue border-2' : ''} ${isActive ? 'bg-blue-50' : ''}`}>
      {(isPopular || isActive) && (
        <div className={`${isActive ? 'bg-green-500' : 'bg-parking-blue'} text-white text-center py-1 font-medium`}>
          {isActive ? 'Your Current Plan' : 'Most Popular'}
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{currency}{price}</span>
          <span className="text-gray-500">/{duration}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubscribe} 
          className={`w-full ${isActive ? 'bg-green-500 hover:bg-green-600' : isPopular ? 'bg-parking-blue hover:bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'}`}
          disabled={isActive}
        >
          {isActive ? "Current Plan" : "Subscribe Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
