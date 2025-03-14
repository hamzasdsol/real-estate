import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPropertyToFirebase } from "../firebase";

const AddProperty = ({ closeModal, onAddProperty }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    image: "",
  });

  useEffect(() => {
    // Disable scrolling when modal opens
    document.body.style.overflow = "hidden";

    return () => {
      // Enable scrolling when modal closes
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const newProperty = await addPropertyToFirebase(formData);
      onAddProperty({ id: newProperty.id, ...formData });
      closeModal();

      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className="p-6 fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="beds" placeholder="Beds" value={formData.beds} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="baths" placeholder="Baths" value={formData.baths} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="sqft" placeholder="Sq Ft" value={formData.sqft} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded" required />

          <button type="submit" className="w-full bg-black text-white p-2 rounded">Add Property</button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
