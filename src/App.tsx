import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./components/home/UserHome";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AuthGuard from "./components/auth/AuthGuard";
import GuestHome from "./components/guest/GuestHome"; // Import the GuestHome component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Protect Routes with AuthGuard */}
          <Route 
            path="/home" 
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AuthGuard>
                <Admin />
              </AuthGuard>
            } 
          />

          {/* Guest Home Route */}
          <Route path="/guesthome" element={<GuestHome />} />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;