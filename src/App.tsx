
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import DeliveryDetailsPage from "./pages/checkout/DeliveryDetailsPage";
import OrderReviewPage from "./pages/checkout/OrderReviewPage";
import OrderConfirmationPage from "./pages/checkout/OrderConfirmationPage";
import OrderApprovalPage from "./pages/admin/OrderApprovalPage";
import ManageOrdersPage from "./pages/admin/ManageOrdersPage";
import ReportsPage from "./pages/admin/ReportsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              
              {/* Checkout Flow */}
              <Route path="/checkout/address" element={<DeliveryDetailsPage />} />
              <Route path="/checkout/review" element={<OrderReviewPage />} />
              <Route path="/checkout/confirmation" element={<OrderConfirmationPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/approvals" element={<OrderApprovalPage />} />
              <Route path="/admin/orders" element={<ManageOrdersPage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
              
              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
