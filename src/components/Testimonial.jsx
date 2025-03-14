import { useState } from "react";
import line from "../assets/images/Group 8.png";
import client1 from "../assets/images/client1.png";

const Testimonial = () => {
  const [testimonial, setTestimonial] = useState(
    "“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”"
  );

  const [selectedDiv, setSelectedDiv] = useState(null);

  const testimonials = [
    "“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”",
    "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.”",
    "“Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”",
  ];

  const handleDivClick = (index) => {
    setSelectedDiv(index);
    setTestimonial(testimonials[index]);
  };

  return (
    <div className="bg-white w-full flex justify-center items-center py-8 overflow-x-hidden">
      <div className="max-w-4xl text-center px-6">
        {/* Line Image */}
        <img
          src={line}
          alt="Line"
          className="w-[200px] sm:w-[280px] md:w-[336px] mb-6 mx-auto"
        />

        {/* Testimonial Text */}
        <p className="text-[18px] sm:text-[20px] md:text-[24px] w-full sm:w-[336px] mx-auto text-center font-bold text-black mt-6 leading-relaxed">
          {testimonial}
        </p>

        {/* Testimonial Cards */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-10">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`flex items-center p-6 sm:p-9 transition-colors duration-300 cursor-pointer w-full sm:w-auto ${
                selectedDiv === index
                  ? "bg-black text-white" // Apply permanent styles if selected
                  : "bg-white hover:bg-black hover:text-white" // Apply hover styles if not selected
              }`}
              onClick={() => handleDivClick(index)}
            >
              {/* Client Image */}
              <div>
                <img src={client1} alt="" className="w-12 h-12 sm:w-auto sm:h-auto" />
              </div>

              {/* Client Details */}
              <div className="flex flex-col items-start ml-4">
                <h2
                  className={`text-left text-[16px] sm:text-[18px] ${
                    selectedDiv === index ? "text-white" : "text-black"
                  }`}
                >
                  Lara Medrigal
                </h2>
                <p
                  className={`text-left text-[14px] sm:text-[16px] ${
                    selectedDiv === index ? "text-white" : "text-[#979797]"
                  }`}
                >
                  Client
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;