import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Listings from "./components/Listings";
import PropertyPage from "./components/PropertyPage/PropertyPage";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import About from "./components/About";
import LoginPage from "./components/login";
import AdminPanel from "./components/AdminPanel";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user if logged in
      } else {
        setUser(null); // Clear the user if logged out
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  // Function to check if the user is an admin
  const isAdmin = () => {
    return user && user.email === "hammadbuttyk2@gmail.com";
  };

  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Listings />
              <About />
              <Testimonial />
            </>
          }
        />
        <Route path="/property/:id" element={<PropertyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={isAdmin() ? <AdminPanel /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;