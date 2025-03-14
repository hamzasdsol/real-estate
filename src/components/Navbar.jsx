import { useState, useEffect, useRef } from "react";
import logo from "../assets/images/Logo RealEstate.svg";
import arrow from "../assets/images/Arrow White.svg";
import { FiMenu } from "react-icons/fi";
import Login from "../components/login";
import Signup from "../components/signup";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  // Refs for scrolling
  const homeRef = useRef(null);
  const propertiesRef = useRef(null);
  const aboutRef = useRef(null);

  // Listen for authentication state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user if logged in
      } else {
        setUser(null); // Clear the user if logged out
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      alert("Logged out successfully!");
      setUser(null); // Clear user state
      window.location.href = window.location.origin; // Redirect to the root of the current localhost
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Scroll to a specific section
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Show login modal */}
      {showLogin && (
        <Login
          onClose={() => {
            console.log("Closing login modal"); // Debugging
            setShowLogin(false); // Close the login modal
          }}
          onSwitch={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {/* Show signup modal */}
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          onSwitch={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

      <nav className="absolute top-0 left-0 w-full flex items-center p-6 text-white bg-transparent z-20 overflow-hidden">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-32 md:w-auto ml-25 cursor-pointer" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 md:gap-17 font-bold ml-auto mr-[80px]">
          <li>
            <a
              href="home-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(homeRef);
              }}
              className="hover:text-yellow-400 cursor-pointer"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="listings-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(propertiesRef);
              }}
              className="hover:text-yellow-400 cursor-pointer"
            >
              Properties
            </a>
          </li>
          <li>
            <a
              href="about-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(aboutRef);
              }}
              className="hover:text-yellow-400 cursor-pointer"
            >
              About
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-yellow-400 cursor-pointer">
              Contact
            </a>
          </li>
        </ul>

        {/* Buttons (Work With Us, Login/Signup or Logout) */}
        <div className="hidden md:flex gap-4 mr-10">
          <button className="flex items-center gap-3 bg-yellow-500 px-6 py-2 text-lg font-semibold text-black rounded-tr-[13px] cursor-pointer">
            Work with us <img src={arrow} className="mt-[4px]" alt="Arrow" />
          </button>

          {/* Show Logout button if user is logged in, otherwise show Login/Signup buttons */}
          {user ? (
            <button
              className="bg-red-500 px-6 py-2 text-lg font-semibold text-white rounded cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="bg-blue-500 px-6 py-2 text-lg font-semibold text-white rounded cursor-pointer"
                onClick={() => {
                  setShowLogin(true);
                  setShowSignup(false);
                }}
              >
                Login
              </button>
              <button
                className="bg-green-500 px-6 py-2 text-lg font-semibold text-white rounded cursor-pointer"
                onClick={() => {
                  setShowSignup(true);
                  setShowLogin(false);
                }}
              >
                Signup
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-auto text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu />
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-black p-4 flex flex-col items-center gap-4 md:hidden">
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(homeRef);
                  }}
                  className="text-white hover:text-yellow-400 cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(propertiesRef);
                  }}
                  className="text-white hover:text-yellow-400 cursor-pointer"
                >
                  Properties
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(aboutRef);
                  }}
                  className="text-white hover:text-yellow-400 cursor-pointer"
                >
                  About
                </a>
              </li>
              <li>
                <a href="/" className="text-white hover:text-yellow-400 cursor-pointer">
                  Contact
                </a>
              </li>
            </ul>
            <button className="bg-yellow-500 px-6 py-2 text-lg font-semibold text-black rounded-tr-[13px] mt-4 cursor-pointer">
              Work with us
            </button>
            {user ? (
              <button
                className="bg-red-500 px-6 py-2 text-lg font-semibold text-white rounded cursor-pointer mt-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="bg-blue-500 px-6 py-2 text-lg font-semibold text-white rounded cursor-pointer mt-2"
                  onClick={() => {
                    setShowLogin(true);
                    setShowSignup(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="bg-green-500 px-6 py-2 text-lg font-semibold text-white rounded cursor-pointer mt-2"
                  onClick={() => {
                    setShowSignup(true);
                    setShowLogin(false);
                  }}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Attach refs to sections */}
      <div ref={homeRef} id="home-section">
        {/* Hero Section */}
      </div>
      <div ref={propertiesRef} id="properties-section">
        {/* Listings Section */}
      </div>
      <div ref={aboutRef} id="about-section">
        {/* About Section */}
      </div>
    </>
  );
};

export default Navbar;