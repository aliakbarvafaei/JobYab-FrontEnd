import React from "react";
import Free from "../../assets/images/option/free.png";
import Clock from "../../assets/images/option/clock.png";
import Speaker from "../../assets/images/option/speaker.png";

const Option : React.FC = () => {
  const themeClass : string = "bg-white";
  const themeBorder : string = "border-darkModeGray";

  return (
    <div className={`${themeClass} pb-[40px] px-total pt-[30px]`}>
      <div
        className={`py-[50px] flex lg:flex-col lg:items-center lg:gap-[20px] lgmin:flex-row lgmin:justify-between border-y-[1px] border-y-solid ${themeBorder}`}
      >
        <div className={`group flex lg:flex-col lgmin:flex-row items-center`}>
          <img
            src={Free}
            className="w-[60px] pl-[10px] hover:scale-125 duration-[500ms]"
            alt="Free"
          />
          <div>
            <h2 className="text-[16px] font-bold lg:text-center group-hover:text-red">
              پیش‌بینی رایگان
            </h2>
            <p className="text-[14px] text-darkGray lg:text-center">
              تخمین قیمت خانه‌ها به صورت کاملا رایگان
            </p>
          </div>
        </div>
        <div
          className={`lg:hidden border-r-[1px] border-r-solid ${themeBorder}`}
        ></div>
        <div className={`group flex lg:flex-col lgmin:flex-row items-center`}>
          <img
            src={Clock}
            className="w-[60px] pl-[10px] hover:scale-125 duration-[500ms]"
            alt="clock"
          />
          <div>
            <h2 className="text-[16px] font-bold lg:text-center group-hover:text-red">
              پشتیبانی تمام وقت
            </h2>
            <p className="text-[14px] text-darkGray lg:text-center">
              پشتیبانی برای تمامی اعضای سایت
            </p>
          </div>
        </div>
        <div
          className={`lg:hidden border-r-[1px] border-r-solid ${themeBorder}`}
        ></div>
        <div className="group flex lg:flex-col lgmin:flex-row items-center">
          <img
            src={Speaker}
            className="w-[60px] pl-[10px] hover:scale-125 duration-[500ms]"
            alt="speaker"
          />
          <div>
            <h2 className="text-[16px] font-bold lg:text-center group-hover:text-red">
              پیشنهاد فوق‌العاده اشتراک
            </h2>
            <p className="text-[14px] text-darkGray lg:text-center">
              اشتراک‌های ماهانه با تخفیف برای اعضای عادی و املاک
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Option;
