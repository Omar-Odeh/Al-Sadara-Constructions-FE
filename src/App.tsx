import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <div className="flex flex-1 justify-center">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="/marketplace" element={<MarketPlacePage />} /> */}
          {/* <Route path="/offers" element={<OffersPage />} /> */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
