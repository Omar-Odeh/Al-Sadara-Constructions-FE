import { ReactNode, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { MainContextProvider, useMainContext } from "@/contexts/MainContext";
import { useUserData } from "@/hooks/use-user-data";
import LandingPage from "@/pages/LandingPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import ProductsPage from "@/pages/ProductsPage";
import ProductConfigurationPage from "@/pages/ProductConfigurationPage";
import EmailVerificationPage from "@/pages/EmailVerificationPage";
import NotFoundPage from "@/pages/NotFoundPage";
import OrdersPage from "@/pages/OrdersPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import LoaderIcon from "@/icons/LoaderIcon";

function App() {
  return (
    <RecoilRoot>
      <TooltipProvider delayDuration={0}>
        <AnimatePresence mode="wait">
          <Router>
            <MainContextProvider>
              <Header />
              <AnimatedRoutes
                routes={[
                  {
                    path: "/",
                    element: <LandingPage />,
                    visibility: ["none", "user", "confirmed"],
                  },
                  {
                    path: "/login",
                    element: <LoginPage />,
                    visibility: ["none"],
                  },
                  {
                    path: "/products",
                    element: <ProductsPage />,
                    visibility: ["confirmed"],
                  },
                  {
                    path: "/products/:id",
                    element: <ProductConfigurationPage />,
                    visibility: ["confirmed"],
                  },
                  {
                    path: "/verify-email",
                    element: <EmailVerificationPage />,
                    visibility: ["user"],
                  },
                  {
                    path: "*",
                    element: <NotFoundPage />,
                    visibility: ["none", "user", "confirmed"],
                  },
                  {
                    path: "/orders",
                    element: <OrdersPage />,
                    visibility: ["confirmed"],
                  },
                ]}
              />
              <Footer />
            </MainContextProvider>
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
  routes: {
    path: string;
    element: ReactNode;
    visibility: ("none" | "user" | "confirmed")[];
  }[];
}) {
  const location = useLocation();
  const { checkUser } = useUserData();
  const { user, getLoading, setLoading } = useMainContext();
  const userStatus = user?.confirmed ? "confirmed" : user ? "user" : "none";
  const userLoading = getLoading("user");
  const routeFallback = {
    none: "/",
    user: "/verify-email",
    confirmed: "/products?page=1",
  };

  useEffect(() => {
    setLoading("user", true);
    checkUser().finally(() =>
      setTimeout(() => setLoading("user", false), 1000)
    );
  }, []);

  return (
    <>
      {userLoading ? (
        <div className="flex flex-1 items-center justify-center text-primary">
          <LoaderIcon className="w-16 h-16 animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes.map(({ path, element, visibility }, index) => (
              <Route
                key={index}
                path={path}
                element={
                  visibility.includes(userStatus) ? (
                    <AnimatedPage>{element}</AnimatedPage>
                  ) : (
                    <Navigate to={routeFallback[userStatus]} />
                  )
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      )}
      <Toaster />
    </>
  );
}

export default App;
