import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getDatabase, ref, get } from "firebase/database";


import profileimg from "../../assets/images/Avatar Image.png";
import arrow from "../../assets/images/Arrow Tellow.svg";
import Navbar from "../Navbar";

const PropertyPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Initialize the navigate function
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch house details from Firebase
  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const db = getDatabase();
        const dbRef = ref(db, `properties/${id}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          setHouse(snapshot.val()); // Set the fetched house data
        } else {
          setError("Property not found");
          navigate("/not-found"); // Redirect to a "Not Found" page if the property doesn't exist
        }
      } catch (err) {
        setError(err.message);
        navigate("/error"); // Redirect to an error page if something goes wrong
      } finally {
        setLoading(false);
      }
    };

    fetchHouseDetails();
  }, [id, navigate]); // Add navigate to the dependency array

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., send data to a server)
    alert("Form submitted successfully!");
    navigate("/thank-you"); // Redirect to a "Thank You" page after form submission
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!house) return <div>No property found</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#120d03] p-0">
        {/* Navbar */}
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <hr className="border-t border-[#2d271c] " />
        {/* Property Details Section */}
        <div className="max-w-6xl mx-auto p-6 flex justify-between items-center pt-5 ">
          <div className="flex  flex-col pl-15 ">
            <h2 className="text-3xl text-white font-semibold">{house.title}</h2>
            <p className="text-gray-500">{house.location}</p> {/* Use location from Firebase */}
          </div>

          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-white text-right mt-2">
              ${house.price} {/* Use price from Firebase */}
            </h3>
            <p className="text-gray-500 text-right">$2,800/sq ft</p>
          </div>
        </div>
      </div>

      {/* Main Image & Contact Form */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-0 mt-20">
        <div className="col-span-2">
          <img
            src={house.image} // Use image from Firebase or static images
            alt={house.title}
            className="rounded-lg w-[704px] h-96 object-cover"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 bg-[#f5f5f5] p-4 rounded-lg">
            <img src={profileimg} alt="" className="w-[40px] h-[40px]" />
            <div className="flex flex-col items-center ">
              <h3 className="font-semibold">Kayley Hall</h3>
              <p className="text-blue-500 cursor-pointer" onClick={() => navigate("/profile/kayley-hall")}>View Profile</p> {/* Use navigate for profile link */}
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <input
              className="border-[#ebebeb] w-full p-2 mt-2 rounded"
              type="text"
              placeholder="Name"
              required
            />
            <input
              className="border-[#ebebeb] w-full p-2 mt-2 rounded"
              type="text"
              placeholder="Phone"
              required
            />
            <input
              className="border-[#ebebeb] w-full p-2 mt-2 rounded"
              type="email"
              placeholder="Email"
              required
            />
            <textarea
              className="border-[#ebebeb] w-full p-2 mt-2 rounded"
              placeholder="Hello, I am interested in..."
              required
            ></textarea>
            <button
              type="submit"
              className="w-[296px] mt-8 flex items-center gap-3 bg-black px-8 py-4 lg:px-11 lg:py-5 text-base lg:text-lg font-semibold text-white rounded-tr-[20px] cursor-pointer"
            >
              Learn more{" "}
              <img src={arrow} alt="Arrow" className="mt-[4px] cursor-pointer" />
            </button>
          </form>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-lg">
        <h3 className="font-semibold">Details</h3>
        <div className="grid grid-cols-4 gap-4 text-center text-lg">
          <p>🛏️ {house.beds}</p> {/* Use beds from Firebase */}
          <p>🛁 {house.baths}</p> 
          <p>📏 {house.sqft} sqft</p> 
          <p>🏡 2007</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-6xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-lg">
        <h3 className="font-semibold">Description</h3>
        <p className="text-gray-600 mt-2">{house.description}</p> {/* Use description from Firebase */}
      </div>

      {/* Similar Listings */}
      <div className="max-w-6xl mx-auto mt-10">
        <h3 className="text-2xl font-semibold">Similar Listings</h3>
        <div className="grid grid-cols-4 gap-6 mt-4">
          
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default PropertyPage;