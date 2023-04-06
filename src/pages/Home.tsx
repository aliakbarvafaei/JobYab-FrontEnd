import React from "react";
import HeaderNewComplete from "../components/Header/HeaderNewComplete";
import bronze from "../assets/images/bronze.jpg";
import silver from "../assets/images/silver.jpg";
import gold from "../assets/images/gold.jpg";
import Option from "../components/Option/Option";
import SectionAdSlider from "../components/SectionAdSlider/SectionAdSlider";
import { useHistory } from "react-router-dom";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import Footer from "../components/Footer/Footer";

const Home : React.FC = ()=> {
  const history = useHistory();

  return (
    <>
      <MobileMenu />
      <HeaderNewComplete />
      <SectionAdSlider />
      <div className="px-total py-[12%] flex flex-col font-bold items-center mdmin:w-[60%] md:w-[100%]">
        <h2 className="text-blue md:text-[75px] lg:text-[60px] xl:text-[85px] xlmin:text-[90px]">
          سال 1402
        </h2>
        <h4 className="lg:text-[35px] xl:text-[50px] xlmin:text-[55px] text-center text-white">
          مناسب ترین مشاغل
        </h4>
        <p className="lg:text-[20px] xl:text-[22px] xlmin:text-[24px] text-yellow text-center">
          بهترین پیشنهادها
        </p>
      </div>
      <section className="flex justify-center bg-[#EEEEEE]">
        <div className="bg-white smmin:h-[450px] min-w-[50%] flex smmin:flex-row sm:flex-col justify-center smmin:gap-[8%] sm:gap-[10px] rounded-3xl py-[3%] px-[2%] my-[3%] mx-[5%]">
          <div className="flex flex-col justify-between items-center text-center gap-[5%]">
            <img src={bronze} className="h-[124px] w-[100px]" alt="برنز"/>
            <h3 className="font-bold">جاب‌یاب برنزی</h3>
            <ul className="">
              <li className="text-[12px]">✔ امکان اضافه کردن تا سه آگهی</li>
            </ul>
            <p className="flex flex-col">
              <span className="text-[12px]"> قیمت</span>
              <span className="text-blue font-bold text-[20px]">رایگان</span>
            </p>
            <button
                type="button"
                disabled={true}
                className="max-w-fit min-w-[100px] rounded-md py-[5%] px-[14%] bg-gray text-white font-bold mmmin:text-[14px] mm:text-[10px]"
              >
                پیش‌فرض
            </button>
          </div>
          <div className="border-darkModeGray border-[1px] shadow-[0_2px_4px_0_rgba(200,200,200)]"></div>
          <div className="flex flex-col justify-between items-center text-center gap-[5%]">
            <img src={silver} className="h-[126px] w-[100px]" alt="نقره"/>
            <h3 className="font-bold">جاب‌یاب نقره‌ای</h3>
            <ul className="">
              <li className="text-[12px]">✔ امکان اضافه کردن تا ده آگهی</li>
            </ul>
            <p className="flex flex-col">
              <span className="text-[12px]"> قیمت</span>
              <span className="text-blue font-bold text-[20px]">۲۰,۰۰۰ تومان</span>
            </p>
            <button
                type="button"
                className="max-w-fit min-w-[100px] py-[5%] px-[14%] rounded-md bg-blue text-white font-bold mmmin:text-[14px] mm:text-[10px] hover:bg-white hover:border-blue hover:border-[2px] hover:border-solid hover:text-black"
                onClick={()=>history.push('/profile')}
              >
                ارتقا
            </button>
          </div>
          <div className="border-darkModeGray border-[1px] shadow-[0_2px_4px_0_rgba(200,200,200)]"></div>
          <div className="flex flex-col justify-between items-center text-center gap-[5%]">
            <img src={gold} className="h-[126px] w-[110px]" alt="طلا"/>
            <h3 className="font-bold">جاب‌یاب طلایی</h3>
            <ul className="">
              <li className="text-[12px]">✔ امکان اضافه کردن نامحدود آگهی</li>
            </ul>
            <p className="flex flex-col">
              <span className="text-[12px]"> قیمت</span>
              <span className="text-blue font-bold text-[20px]">۵۰,۰۰۰ تومان</span>
            </p>
            <button
                type="button"
                className="max-w-fit min-w-[100px] py-[5%] px-[14%] rounded-md bg-blue text-white font-bold mmmin:text-[14px] mm:text-[10px] hover:bg-white hover:border-blue hover:border-[2px] hover:border-solid hover:text-black"
                onClick={()=>history.push('/profile')}
              >
                ارتقا
            </button>
          </div>

        </div>
      </section>
      
      <Option />
      <Footer />
    </>
  );
}

export default Home;