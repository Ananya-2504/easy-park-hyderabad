
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
}

interface SubscriptionContextType {
  plans: SubscriptionPlan[];
  subscribeToPlan: (planId: string) => Promise<boolean>;
  activePlan: SubscriptionPlan | null;
  expiryDate: Date | null;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 299,
    currency: "₹",
    duration: "monthly",
    features: [
      "Find parking spots",
      "Basic navigation",
      "Email support"
    ]
  },
  {
    id: "standard",
    name: "Standard",
    price: 599,
    currency: "₹",
    duration: "monthly",
    features: [
      "Find parking spots",
      "Advanced navigation",
      "Priority booking",
      "24/7 customer support",
      "Cashback on bookings"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 999,
    currency: "₹",
    duration: "monthly",
    features: [
      "Find parking spots",
      "Advanced navigation",
      "Priority booking with discounts",
      "24/7 VIP customer support",
      "Monthly parking passes",
      "Free valet service (twice/month)",
      "Exclusive parking spots"
    ]
  }
];

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
  const [activePlan, setActivePlan] = useState<SubscriptionPlan | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user has an active subscription in localStorage
    if (isAuthenticated) {
      const storedPlan = localStorage.getItem("activePlan");
      const storedExpiry = localStorage.getItem("expiryDate");
      
      if (storedPlan) {
        const plan = subscriptionPlans.find(p => p.id === storedPlan);
        if (plan) {
          setActivePlan(plan);
        }
      }
      
      if (storedExpiry) {
        setExpiryDate(new Date(storedExpiry));
      }
    } else {
      // Clear subscription if user logs out
      setActivePlan(null);
      setExpiryDate(null);
    }
  }, [isAuthenticated]);

  const subscribeToPlan = async (planId: string): Promise<boolean> => {
    if (!isAuthenticated) {
      toast.error("Please login to subscribe");
      return false;
    }

    try {
      // Mock subscription process - in a real app, this would involve payment processing
      const plan = subscriptionPlans.find(p => p.id === planId);
      if (!plan) {
        toast.error("Invalid subscription plan");
        return false;
      }

      // Set expiration date to one month from now
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 1);
      
      // Update state and localStorage
      setActivePlan(plan);
      setExpiryDate(expiry);
      localStorage.setItem("activePlan", planId);
      localStorage.setItem("expiryDate", expiry.toISOString());
      
      toast.success(`Successfully subscribed to ${plan.name} plan!`);
      return true;
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
      return false;
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        plans: subscriptionPlans,
        subscribeToPlan,
        activePlan,
        expiryDate
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
