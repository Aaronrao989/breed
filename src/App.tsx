import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { DashboardOverview } from "./components/dashboard/DashboardOverview"; 
import { BreedIdentification } from "./components/breed-identification/BreedIdentification";
import { AnimalRegistration } from "./components/registration/AnimalRegistration";
import { BreedDatabase } from "./components/breeds/BreedDatabase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/breed-identification" element={<BreedIdentification />} />
            <Route path="/registration" element={<AnimalRegistration />} />
            <Route path="/breeds" element={<BreedDatabase />} />
            {/* Placeholder routes - will be implemented next */}
            <Route path="/reports" element={<div className="p-8 text-center"><h2 className="text-xl">Reports & Analytics - Coming Soon</h2></div>} />
            <Route path="/help" element={<div className="p-8 text-center"><h2 className="text-xl">Help & Support - Coming Soon</h2></div>} />
            <Route path="/settings" element={<div className="p-8 text-center"><h2 className="text-xl">Settings - Coming Soon</h2></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;