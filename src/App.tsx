import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Newcomers from "./pages/Newcomers";
import Institutions from "./pages/Institutions";
import Employers from "./pages/Employers";
import Agents from "./pages/Agents";
import VisaRefusal from "./pages/VisaRefusal";
import VisitorVisas from "./pages/VisitorVisas";
import PGWP from "./pages/PGWP";
import ExpressEntry from "./pages/ExpressEntry";
import IEC from "./pages/IEC";
import BecomeMember from "./pages/BecomeMember";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/newcomers" element={<Newcomers />} />
              <Route path="/institutions" element={<Institutions />} />
              <Route path="/employers" element={<Employers />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/visa-refusal" element={<VisaRefusal />} />
              <Route path="/visitor-visas" element={<VisitorVisas />} />
              <Route path="/pgwp" element={<PGWP />} />
              <Route path="/express-entry" element={<ExpressEntry />} />
              <Route path="/iec" element={<IEC />} />
              <Route path="/become-a-member" element={<BecomeMember />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
