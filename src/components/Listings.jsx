import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchListings } from "../firebase"; // Only import fetchListings
import house1 from "../assets/images/house1.png";
import house2 from "../assets/images/house2.png";
import house3 from "../assets/images/house3.png";
import house4 from "../assets/images/house4.png";
import house5 from "../assets/images/house5.png";
import FilterButtons from "../components/FilterButtons";
import bed from "../assets/images/hotel-single-bed-1.png";
import shower from "../assets/images/bathroom-tub-towel.png";
import sqft from "../assets/images/grid-artboard.png";
import line from "../assets/images/Group 7.png";
import arrow from "../assets/images/Arrow Tellow.svg";
import img2 from "../assets/images/img2.png";

const Listings = () => {
  const navigate = useNavigate();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message || "An error occurred"}</p>;

  return (
    <div>
      {/* Hero Section */}
      
      <div id="listings-section"
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 lg:p-12 overflow-hidden">
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
               
                onClick={() => navigate(`/property/${house.id}`)}
              >
                <img
                  src={house.image}
                  alt={house.title}
                  className="w-full h-64 object-cover"
                />
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Listings;