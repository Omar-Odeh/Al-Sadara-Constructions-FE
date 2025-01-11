import { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "@/pages/LandingPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import ProductsPage from "@/pages/ProductsPage";
import TestPage from "@/pages/TestPage";
import ProductConfigurationPage from "@/pages/ProductConfigurationPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";

function App() {
  return (
    <RecoilRoot>
      <TooltipProvider delayDuration={0}>
        <AnimatePresence mode="wait">
          <Router>
            <Header />
            <AnimatedRoutes
              routes={[
                { path: "/", element: <LandingPage /> },
                { path: "/login", element: <LoginPage /> },
                { path: "/products", element: <ProductsPage /> },
                {
                  path: "/products/:id",
                  element: <ProductConfigurationPage />,
                },
                { path: "/test", element: <TestPage /> },
                // { path: "/profile", element: <ProfilePage /> },
                // { path: "/marketplace", element: <MarketPlacePage /> },
                // { path: "/offers", element: <OffersPage /> },
                // { path: "*", element: <LandingPage /> },
              ]}
            />
            <Footer />
          </Router>
        </AnimatePresence>
      </TooltipProvider>
    </RecoilRoot>
  );
}

function AnimatedPage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="flex flex-1 justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes({
  routes,
}: {
  routes: { path: string; element: ReactNode }[];
}) {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={<AnimatedPage>{element}</AnimatedPage>}
            />
          ))}
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;
