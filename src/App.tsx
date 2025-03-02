import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./components/home/Home";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AuthGuard from "./components/auth/AuthGuard"; // Import the AuthGuard component

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

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
