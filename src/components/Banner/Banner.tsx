import React from 'react';
import bg_header_lighter from "../../assets/images/bg-header-lighter.jpg"
const Banner:React.FC = () => {
    return (
    <div className="mdmin:h-[400px] md:h-[550px] sm:h-[400px] w-full flex justify-center items-center bg-lightGray">
      <div className='h-[80%] mdmin:w-[70%] md:w-[90%] flex mdmin:flex-row md:flex-col justify-center items-center mdmin:bg-white mdmin:shadow-2xl mdmin:shadow-black mdmin:rounded-[50px]'>
        <div className='mdmin:w-[50%] md:px-[60px] md:py-[15px] md:w-full flex justify-center items-center mdmin:px-[100px] flex-col md:bg-white md:shadow-2xl md:shadow-black md:rounded-[50px]'>
          <h2 className="font-bold mdmin:text-[14px] opacity-80 md:text-[14px] sm:text-[12px] mm:text-[8px] text-darkModeLightBlack">به خانه جدید خود</h2>
          <h2 className="font-bold mdmin:mt-[20px] md:mt-[10px] mdmin:text-[36px] md:text-[30px] sm:text-[16px] mm:text-[12px] text-darkModeLightBlack">خوش آمدید</h2>
          <button
            type="button"
            className="h-[50px] min-w-fit mdmin:mt-[40px] md:mt-[20px] md:w-[10%] smmin:px-[40px] sm:px-[5px] py-[10px] sm:py-[0px] smmin:pb-[30px] rounded-none font-extrabold text-[14px] md:text-[12px] sm:text-[10px] bg-red text-white hover:bg-white hover:outline-red hover:outline hover:outline-[2px] hover:outline-solid hover:text-red"
          >
            شروع پیش‌بینی
          </button>
        </div>
        <div className="mdmin:w-[50%] md:mt-[20px] md:w-[80%] mdmin:h-full md:h-[50%] flex items-center mdmin:justify-end md:justify-center">
          <img src={bg_header_lighter} className="h-full mdmin:rounded-l-[50px] md:rounded-[30px]" alt='bg_header_lighter'/>
        </div>
      </div>
    </div>
    );
}

export default Banner;