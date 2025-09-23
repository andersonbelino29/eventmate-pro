import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TenantProvider } from "@/contexts/TenantContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/admin/Settings";
import EventList from "./pages/admin/events/EventList";
import EventForm from "./pages/admin/events/EventForm";
import EventView from "./pages/admin/events/EventView";
import TableManagement from "./pages/admin/tables/TableManagement";
import Reports from "./pages/admin/Reports";
import ReservationList from "./pages/admin/reservations/ReservationList";
import ReservationForm from "./pages/admin/reservations/ReservationForm";
import EventReservation from "./pages/EventReservation";
import TenantSelector from "./components/TenantSelector";
import TenantApp from "./components/TenantApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TenantProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/settings" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/events" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <EventList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/events/new" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <EventForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/events/:id" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <EventView />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/events/:id/edit" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <EventForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/events/:eventId/tables" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <TableManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/reports" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/reservations" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <ReservationList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/reservations/new" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <ReservationForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/reservations/:id" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <ReservationForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/reservations/:id/edit" 
                element={
                  <ProtectedRoute requireRole="admin">
                    <ReservationForm />
                  </ProtectedRoute>
                } 
              />
              <Route path="/evento/:eventId/reservar" element={<EventReservation />} />
              <Route path="/select-tenant" element={<TenantSelector />} />
              <Route path="/:tenantSlug/*" element={<TenantApp />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TenantProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
