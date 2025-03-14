import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Listings from "../admin/managelistings";

const AdminPanel = () => {
  return (
    <div>
      {/* Admin Panel Content */}

      {/* Hero Section */}
      <HeroSection />

      {/* Listings Section */}
      <Listings />

      {/* About Section */}
      <About />
    </div>
  );
};

export default AdminPanel;
