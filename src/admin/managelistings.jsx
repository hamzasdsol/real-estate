import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchListings, deleteListing, updateListing } from "../firebase"; // Import updateListing
import AddProperty from "../components/AddProperty";
import house1 from "../assets/images/house1.png";
import house2 from "../assets/images/house2.png";
import house3 from "../assets/images/house3.png";
import house4 from "../assets/images/house4.png";
import house5 from "../assets/images/house5.png";
import plusIcon from "../assets/images/plus-icon.png"; // Add a plus icon
import FilterButtons from "../components/FilterButtons";
import bed from "../assets/images/hotel-single-bed-1.png";
import shower from "../assets/images/bathroom-tub-towel.png";
import sqft from "../assets/images/grid-artboard.png";
import line from "../assets/images/Group 7.png";
import arrow from "../assets/images/Arrow Tellow.svg";
import img2 from "../assets/images/img2.png";

const ManageListings = () => {
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [editingHouse, setEditingHouse] = useState(null); // Track which house is being edited
  const staticImages = [house1, house2, house3, house4, house5, house3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchListings();
        if (data) {
          const transformedData = Object.entries(data).map(
            ([id, houseData], index) => ({
              id,
              ...houseData,
              image: staticImages[index % staticImages.length],
            })
          );
          setHouses(transformedData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isModalOpen || editingHouse) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isModalOpen, editingHouse]);

  const handleDelete = async (id) => {
    try {
      // Delete from Firebase
      await deleteListing(id);

      // Update local state to remove the deleted property
      setHouses((prevHouses) => prevHouses.filter((house) => house.id !== id));
    } catch (err) {
      console.error("Error deleting property:", err);
      setError(err);
    }
  };

  const handleEdit = (house) => {
    setEditingHouse(house); // Open the modal with the selected house
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateListing(editingHouse.id, editingHouse); // Update in Firebase
      setHouses((prevHouses) =>
        prevHouses.map((house) =>
          house.id === editingHouse.id ? editingHouse : house
        )
      );
      setEditingHouse(null); // Close modal after update
    } catch (err) {
      console.error("Error updating property:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message || "An error occurred"}</p>;

  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 lg:p-12 overflow-hidden">
        <img
          src={img2}
          alt="House"
          className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:mr-12"
        />
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <img src={line} alt="Line" className="w-[169px] mb-6" />
          <h1 className="text-[50px] lg:text-[50px] md:text-[40px] sm:text-[30px] font-bold">
            You're in good hands
          </h1>
          <p className="text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] mt-6">
            What are those pains, which pain itself weaves through itself, that
            not even wild beasts repel, and that it has established to teach
            thus: every animal, as soon as it judges itself whole, therefore
            they say that this is opened as if wrapped up, another certain
            hidden thing and the pleasure of accusing pain.
          </p>
          <button className="mt-8 flex items-center gap-3 bg-black px-11 py-5 text-lg font-semibold text-white rounded-tr-[20px]">
            Learn more <img src={arrow} alt="Arrow" className="mt-[4px]" />
          </button>
        </div>
      </div>
      {/* Listings Section */}
      <section className="py-16 bg-gray-100">
        <div className="text-left ml-10 lg:ml-40">
          <h1 className="text-[50px] font-bold">
            Find your next place to live
          </h1>
        </div>

        <FilterButtons />

        <div className="flex justify-center mt-10 sm:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {houses.map((house) => (
              <div
                key={house.id}
                className="relative rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer"
                onMouseEnter={() => setHoveredCard(house.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`/property/${house.id}`)}
              >
                <img
                  src={house.image}
                  alt={house.title}
                  className="w-full h-64 object-cover"
                />

                {/* Buttons on Hover */}
                {hoveredCard === house.id && (
                  <div className="absolute bottom-10 right-2 flex gap-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(house.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(house);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
                <div className="p-4 bg-amber-50">
                  <h3 className="text-[20px] font-bold">{house.title}</h3>
                </div>

                <div className="flex gap-12 text-gray-600 mt-3 pt-4">
                  <span className="flex items-center gap-2 pl-4">
                    <img src={bed} alt="Bed Icon" className="w-4 h-4" />
                    {house.beds}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={shower} alt="Shower Icon" className="w-4 h-4" />
                    {house.baths}{" "}
                  </span>
                  <span className="flex items-center gap-2">
                    <img src={sqft} alt="SqFt Icon" className="w-4 h-4" />
                    {house.sqft} sqft
                  </span>
                </div>
              </div>
            ))}

            {/* Add Property Button */}
            <div
              className="rounded-lg border-2 border-dashed border-gray-400 flex justify-center items-center cursor-pointer transition-shadow duration-300 hover:shadow-lg"
              style={{ width: "100%", height: "250px" }}
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={plusIcon}
                alt="Add Property"
                className="w-16 h-16 opacity-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Add Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[50%]">
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <AddProperty closeModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
       {/* Edit Property Modal */}
{editingHouse && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[50%] relative max-h-[90vh] overflow-y-auto">
      <button
        className="absolute top-4 right-4 text-gray-500 text-xl"
        onClick={() => setEditingHouse(null)}
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Property</h2>
      <form onSubmit={handleUpdate} className="space-y-4">

        {/* Title */}
        <div>
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={editingHouse.title}
            onChange={(e) => setEditingHouse({ ...editingHouse, title: e.target.value })}
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold">Address:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={editingHouse.address}
            onChange={(e) => setEditingHouse({ ...editingHouse, address: e.target.value })}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold">Price:</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={editingHouse.price}
            onChange={(e) => setEditingHouse({ ...editingHouse, price: e.target.value })}
            required
            min="0"
          />
        </div>

        {/* Beds */}
        <div>
          <label className="block font-semibold">Beds:</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={editingHouse.beds}
            onChange={(e) => setEditingHouse({ ...editingHouse, beds: e.target.value })}
            required
            min="0"
          />
        </div>

        {/* Baths */}
        <div>
          <label className="block font-semibold">Baths:</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={editingHouse.baths}
            onChange={(e) => setEditingHouse({ ...editingHouse, baths: e.target.value })}
            required
            min="0"
          />
        </div>

        {/* Sq Ft */}
        <div>
          <label className="block font-semibold">Sq Ft:</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={editingHouse.sqft}
            onChange={(e) => setEditingHouse({ ...editingHouse, sqft: e.target.value })}
            required
            min="0"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold">Image URL:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={editingHouse.image}
            onChange={(e) => setEditingHouse({ ...editingHouse, image: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={editingHouse.description}
            onChange={(e) => setEditingHouse({ ...editingHouse, description: e.target.value })}
            required
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default ManageListings;