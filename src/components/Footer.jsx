import arrow from "../assets/images/Arrow White.svg";
import logo from "../assets/images/Logo RealEstate.svg";
import fb from "../assets/images/facebook.png";
import twitter from "../assets/images/twitter.png";
import insta from "../assets/images/instagram.png";

const Footer = () => {
  return (
    <div className="bg-black p-10 overflow-x-hidden">
      {/* Heading Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-80 mt-10">
        <h1 className="text-white text-[32px] md:text-[42px] text-center md:text-left">
          Make your dreams a <span className="text-orange-400">reality</span>
        </h1>
        <button className="flex items-center gap-3 bg-yellow-500 px-6 py-3 md:px-11 md:py-5 text-lg font-semibold text-black rounded-tr-[13px] mt-6 md:mt-0 cursor-pointer">
          Work with us <img src={arrow} alt="Arrow Icon" className="mt-[4px]" />
        </button>
      </div>

      {/* Divider Line */}
      <hr className="border-t border-[#201f1d] my-10 mx-4 md:ml-28 md:w-260" />

      {/* Footer Content */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-73 mt-10 mx-4 md:ml-28">
        {/* Logo and Social Icons */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={logo} alt="Company Logo" className="w-[150px] md:w-full h-[60px] cursor-pointer" />
          <div className="flex items-center gap-6 md:gap-9">
            <img src={fb} alt="Facebook" className="w-6 h-6 md:w-auto md:h-auto cursor-pointer" />
            <img src={twitter} alt="Twitter" className="w-6 h-6 md:w-auto md:h-auto cursor-pointer" />
            <img src={insta} alt="Instagram" className="w-6 h-6 md:w-auto md:h-auto cursor-pointer" />
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-50 w-full mt-0 pb-35">
          <div className="flex flex-col items-center md:items-start gap-2 mt-4">
            <a href="#" className="text-white text-[16px] cursor-pointer">Properties</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">About</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">Services</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">Properties</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">Contact</a>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2 mt-4">
            <a href="#" className="text-white text-[16px] cursor-pointer">Properties</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">About</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">Services</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">Properties</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">Contact</a>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2 mt-4">
            <a href="#" className="text-white text-[16px] cursor-pointer">Properties</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">About</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">Services</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">Properties</a>
            <a href="#" className="text-[#979797] text-[16px] cursor-pointer">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
