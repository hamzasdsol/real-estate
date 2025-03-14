import arrowdown from "../assets/images/arrow-down.png";
import { useState } from "react";

const FilterButtons = () => {
  const [selected, setSelected] = useState(null);

  const toggleDropdown = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className="flex justify-center overflow-x-hidden items-center gap-[3px] mt-6">
      {["Looking for", "Location", "Property Type", "Price"].map(
        (label, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => toggleDropdown(index)}
              className="px-22 py-15 bg-white text-black font-semibold rounded-md flex items-center gap-2 border-none cursor-pointer"
            >
              {label}{" "}
              <span className="text-gray-600">
                <img src={arrowdown} alt="" />
              </span>
            </button>

            {selected === index && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md">
                <ul className="text-left text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Option 1
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Option 2
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Option 3
                  </li>
                </ul>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};
export default FilterButtons;