import House from "../assets/images/mainHouse.png";
import arrow from "../assets/images/Arrow Tellow.svg";

const HeroSection = () => {
  return (
    <section
    id="home-section"
      className="relative h-[140vh] max-w-[100vw] bg-cover overflow-hidden bg-center flex flex-col items-center justify-end text-center text-white"
      style={{ 
        backgroundImage: `linear-gradient(to top right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0.7, 0.2) 70%), url(${House})`
      }} 
    >
      <div 
      className="relative z-10 max-w-2xl mr-120 mb-60 lg:mr-120 lg:mb-40 md:mr-60 md:mb-40 sm:mr-4 sm:mb-20">
        <h1 className="text-[80px] text-left font-medium leading-none lg:text-[80px] md:text-[60px] sm:text-[40px]">
          Beautiful <br /> homes made <br />for you
        </h1>
        <p className="mt-4 text-[#a6a4a9] text-left text-lg lg:text-lg md:text-md sm:text-sm">
        In oculis quidem se esse admonere interesse <br /> enim maxime placeat, facere possimus, omnis. <br /> Et quidem faciunt, ut labore et accurate <br /> disserendum et harum quidem exercitus quid.
        </p>
      </div>
      <div className="relative z-20 w-190 bg-white flex flex-col items-start mt-10 lg:w-190 md:w-160 sm:w-full">
        <button className="ml-6 mt-6 bg-white px-6 py-3 text-lg font-bold rounded-lg cursor-pointer text-black flex items-center gap-3 lg:text-lg md:text-md sm:text-sm">
          See all listings <img src={arrow} alt="" />
        </button>
        <p className="text-black text-lg mt-4 ml-6 lg:text-lg md:text-md sm:text-sm">
          
        </p>
      </div>
    </section>
  );
};

export default HeroSection;