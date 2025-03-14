import img from "../assets/images/img3.png";
import line from "../assets/images/Group 7.png";
import arrow from "../assets/images/Arrow White.svg";

const About = () => {
  return (
    <>
    
      {/* First Section */}
      <div id="about-section" className="flex flex-col lg:flex-row lg:items-center lg:justify-end p-6 lg:p-0 overflow-hidden w-full">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-40 lg:ml-[150px]">
          <img src={line} alt="Line" className="w-[120px] sm:w-[150px] lg:w-[169px] mb-6" />
          <h1 className="text-[30px] sm:text-[40px] lg:text-[50px] font-bold ">
            You're in good hands
          </h1>

          <p className=" text-[#666666] text-[16px] sm:text-[18px] lg:text-[20px] mt-6 leading-[28px]">
            What are those pains, which pain itself weaves through itself, that
            not even wild beasts repel, and that it has established to teach
            thus: every animal, as soon as it judges itself whole, therefore
            they say that this is opened as if wrapped up, another certain
            hidden thing and the pleasure of accusing pain.
          </p>
          <button className="mt-8 flex items-center gap-3 bg-black px-8 py-4 lg:px-11 lg:py-5 text-base lg:text-lg font-semibold text-white rounded-tr-[20px] cursor-pointer">
            Learn more <img src={arrow} alt="Arrow" className="mt-[4px] cursor-pointer" />
          </button>
        </div>

        {/* Image */}
        <img
          src={img}
          alt="House"
          className="w-full sm:w-[600px] lg:w-[704px] h-auto mt-8 lg:mt-0 mx-auto lg:mx-0"
        />
      </div>

      {/* Second Section */}
      <div className="bg-[#1a1202] w-full flex justify-center items-center py-20 lg:py-30 overflow-hidden">
        <div className=" text-center px-6">
          <img src={line} alt="Line" className="w-[120px] sm:w-[150px] lg:w-[169px] mb-6 mx-auto cursor-pointer" />
          <h1 className="text-[30px] sm:text-[40px] lg:text-[60px] text-white font-bold font-dm-sans">
            You're in good hands
          </h1>

          <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#a2a09a] mt-6 leading-relaxed">
            What are those pains, which pain itself <br /> weaves through itself, that not even wild beasts<br /> repel, and that it has established to teach thus:
            every <br />animal, as soon as it judges itself whole, therefore they say <br />that this is opened as if wrapped up, another certain hidden<br /> thing and
            the pleasure of accusing pain.
          </p>

          <button className="mt-8 flex items-center gap-3 bg-yellow-500 px-8 py-4 lg:px-11 lg:py-5 text-base lg:text-lg font-semibold text-black rounded-tr-[20px] mx-auto cursor-pointer">
            Learn more <img src={arrow} alt="Arrow" className="mt-[4px] cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
