import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/store/AppContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import ProductListing from "./pages/ProductListing";
import ProductDetail from '@/pages/ProductDetail';
import MenShirtDetail from '@/pages/MenShirtDetail';
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import MenShirts from './pages/MenShirts';
import { ThemeProvider } from './theme/ThemeProvider';
import MuiDemo from './pages/MuiDemo';
import MenTShirts from './pages/MenTShirts';
import WomenSarees from './pages/WomenSarees';
import WomenSareeDetail from './pages/WomenSareeDetail';
import WomenKurtis from './pages/WomenKurtis';
import WomenKurtiDetail from './pages/WomenKurtiDetail';
import MenTrousers from './pages/MenTrousers';
import MenJeans from './pages/MenJeans';
import MenTShirtDetail from './pages/MenTShirtDetail';
import MenJeansDetail from './pages/MenJeansDetail';
import MenTrouserDetail from './pages/MenTrouserDetail';
import WomenDresses from '@/pages/WomenDresses';
import WomenDressDetail from '@/pages/WomenDressDetail';
import WomenTops from '@/pages/WomenTops';
import WomenTopDetail from '@/pages/WomenTopDetail';
import SearchResults from './pages/SearchResults';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <WishlistProvider>
          <CartProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/men" element={<ProductListing />} />
              <Route path="/men/shirts" element={<MenShirts />} />
              <Route path="/men/tshirts" element={<MenTShirts />} />
              <Route path="/men/trousers" element={<MenTrousers />} />
              <Route path="/men/jeans" element={<MenJeans />} />
              <Route path="/women" element={<ProductListing />} />
              <Route path="/women/sarees" element={<WomenSarees />} />
              <Route path="/womensaree/:id" element={<WomenSareeDetail />} />
              <Route path="/women/kurtis" element={<WomenKurtis />} />
              <Route path="/womenkurti/:id" element={<WomenKurtiDetail />} />
              <Route path="/women/dresses" element={<WomenDresses />} />
              <Route path="/womendress/:id" element={<WomenDressDetail />} />
              <Route path="/women/tops" element={<WomenTops />} />
              <Route path="/womentop/:id" element={<WomenTopDetail />} />
              <Route path="/kids" element={<ProductListing />} />
              <Route path="/beauty" element={<ProductListing />} />
              <Route path="/home" element={<ProductListing />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/menshirt/:id" element={<MenShirtDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/mui-demo" element={<MuiDemo />} />
              <Route path="/mentshirt/:id" element={<MenTShirtDetail />} />
              <Route path="/menjean/:id" element={<MenJeansDetail />} />
              <Route path="/mentrouser/:id" element={<MenTrouserDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
                </CartProvider>
        </WishlistProvider>
      </AppProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
