
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscription } from "@/contexts/SubscriptionContext";

const Subscriptions = () => {
  const { plans } = useSubscription();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-12 pt-24">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Subscription Plans</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose a subscription plan that suits your parking needs and enjoy exclusive benefits and discounts.
            </p>
          </div>
          
          {/* Subscription Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <SubscriptionCard
                key={plan.id}
                id={plan.id}
                name={plan.name}
                price={plan.price}
                currency={plan.currency}
                duration={plan.duration}
                features={plan.features}
                isPopular={plan.id === "standard"}
              />
            ))}
          </div>
          
          {/* Benefits */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Subscription Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6 text-parking-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Priority Access</h3>
                </div>
                <p className="text-gray-600">
                  Get priority access to parking spots even during peak hours and special events.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6 text-parking-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Cost Savings</h3>
                </div>
                <p className="text-gray-600">
                  Save up to 20% on regular parking rates with our monthly subscription plans.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6 text-parking-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">Hassle-Free Parking</h3>
                </div>
                <p className="text-gray-600">
                  Skip the payment process each time with automatic billing and quick access.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6 text-parking-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg">24/7 Support</h3>
                </div>
                <p className="text-gray-600">
                  Get dedicated customer support and assistance with any parking-related issues.
                </p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">How do subscriptions work?</h3>
                <p className="text-gray-600">
                  Our subscriptions are billed monthly and provide various benefits based on the plan you choose. 
                  You can cancel anytime from your account dashboard.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">Can I upgrade my plan?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your subscription plan anytime. 
                  The price difference will be prorated for the remaining billing period.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">Are there any long-term contracts?</h3>
                <p className="text-gray-600">
                  No, all our subscription plans are month-to-month with no long-term commitment required. 
                  You can cancel anytime without any cancellation fees.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">How do I use my subscription benefits?</h3>
                <p className="text-gray-600">
                  Once subscribed, all benefits are automatically applied to your account. 
                  You'll see available discounts and priority options during the booking process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Subscriptions;
