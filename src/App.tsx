
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { MapProvider } from "./contexts/MapContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FindParking from "./pages/FindParking";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";
import Payment from "./pages/Payment";
import Services from "./pages/Services";
import Subscriptions from "./pages/Subscriptions";
import SuccessPage from "./pages/SuccessPage";
import ValetRegistration from "./pages/ValetRegistration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <MapProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/find-parking" element={<FindParking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/book/:parkingId?" element={<Book />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/services" element={<Services />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/valet-registration" element={<ValetRegistration />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </MapProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
