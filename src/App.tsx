
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AITutorPage from "./pages/AITutorPage";
import ProgressPage from "./pages/ProgressPage";
import CoursesPage from "./pages/CoursesPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

const RedirectToAuth = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/auth');
  }, [navigate]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectToAuth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-tutor" element={<AITutorPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
