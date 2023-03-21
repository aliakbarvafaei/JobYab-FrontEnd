import React from "react";

const Newsletter:React.FC = ()=> {

  const themeClass : string = "bg-white text-darkGray";
    
  const themeBorder : string = "border-darkModeGray";

  return (
    <div className="flex lgmin:flex-row lg:flex-col justify-between items-center lg:gap-[15px]">
      <div
        className={`${themeBorder} lgmin:border-r-[1px] lgmin:border-r-solid lgmin:w-[50%] lg:text-center`}
      >
        <h1 className="text-[18px] font-black">KNOW IT ALL FIRST!</h1>
        <h4 className="text-[14px] text-darkGray lg:hidden">
          Never Miss Anything From Multikart By Signing Up To Our Newsletter.
        </h4>
      </div>
      <div className="">
        <form className="lgmin:text-right lg:text-center">
          <input
            className={`${themeClass} ${themeBorder} h-[52px] w-[222px] border-[1px] border-solid p-[13px]`}
            type="email"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="smmin:ml-[15px] mm:mt-[10px] py-[6px] px-[12px] h-[50px] w-[150px] rounded-none bg-red text-white font-bold hover:bg-white hover:text-black hover:border-[2px] border-red border-solid"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;