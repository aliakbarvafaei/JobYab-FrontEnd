import React, { useEffect, useState } from "react";
import HeaderNewComplete from "../components/Header/HeaderNewComplete";
import bronze from "../assets/images/bronze.jpg";
import silver from "../assets/images/silver.jpg";
import gold from "../assets/images/gold.jpg";
import Option from "../components/Option/Option";
import { useHistory } from "react-router-dom";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import Footer from "../components/Footer/Footer";
import { Divider, Grid, Typography } from "@mui/material";
import { getRecentPosts, getUrgentPosts } from "../services/api";
import UrgentCard from "../components/UrgentCard";
import { PostType } from "../constants/types";
import backgroundImage from "../assets/images/back.png";
import WhiteImage from "../assets/images/white.png";

const Home: React.FC = () => {
  const history = useHistory();
  const [urgentPosts, setUrgentPosts] = useState<PostType[]>([]);
  const [recentPosts, setRecentPosts] = useState<PostType[]>([]);
  useEffect(() => {
    getUrgentPosts().then((data) => {
      setUrgentPosts(data.data);
    });
  }, []);
  useEffect(() => {
    getRecentPosts().then((data) => {
      setRecentPosts(data.data);
    });
  }, []);
  return (
    <>
      <MobileMenu />
      <HeaderNewComplete />
      <div
        className="px-total py-[12%] flex flex-col font-bold items-center mdmin:w-[60%] md:w-[100%]"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          width: "100%",
          opacity: 0.7,
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-primary md:text-[75px] lg:text-[60px] xl:text-[85px] xlmin:text-[90px]">
          سال 1402
        </h2>
        <h4 className="lg:text-[35px] xl:text-[50px] xlmin:text-[55px] text-center text-primary">
          مناسب ترین مشاغل
        </h4>
        <p className="lg:text-[20px] xl:text-[22px] xlmin:text-[24px] text-primary text-center">
          بهترین پیشنهادها
        </p>
      </div>
      <Grid className="mt-5 w-full mb-[8%] px-[5%] flex flex-wrap gap-[10px] font-bold items-center md:h-[700px] mdmin:h-[350px] justify-between">
        <Grid
          xs={12}
          sm={9}
          className="md:!w-[100%] mdmin:!w-[64%] md:h-[50%] mdmin:h-[100%]"
          style={{
            border: "1.5px solid var(--primary)",
            borderRadius: 8,
            boxShadow: "0 0 2px var(--primary)",
            paddingBottom: 5,
          }}
        >
          <Grid
            item
            style={{
              marginTop: 20,
              textAlign: "center",
              height: "20%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography className="md:!text-[16px] mdmin:!text-[24px]">
              آگهی های فوری
            </Typography>
            <Divider
              style={{
                width: 50,
                border: "2px solid var(--primary)",
                marginTop: 5,
                marginBottom: 20,
              }}
            />
          </Grid>
          <div
            className="max-h-[70%] overflow-auto no-scrollbar"
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {urgentPosts.map((item) => (
              <UrgentCard data={item} isUrgent />
            ))}
          </div>
        </Grid>
        <Grid
          xs={12}
          sm={3}
          className="md:!w-[100%] mdmin:!w-[34%] md:h-[50%] mdmin:h-[100%]"
          style={{
            border: "1.5px solid var(--primary)",
            borderRadius: 8,
            boxShadow: "0 0 2px var(--primary)",
            paddingBottom: 5,
          }}
        >
          <Grid
            item
            style={{
              marginTop: 20,
              textAlign: "center",
              height: "20%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography className="md:!text-[16px] mdmin:!text-[24px]">
              آخرین آگهی ها
            </Typography>
            <Divider
              style={{
                width: 50,
                border: "2px solid var(--primary)",
                marginTop: 5,
                marginBottom: 20,
              }}
            />
          </Grid>
          <div className="mr-1 h-[70%] overflow-auto no-scrollbar">
            {recentPosts.map((item) => (
              <UrgentCard data={item} isUrgent={false} />
            ))}
          </div>
        </Grid>
      </Grid>
      <section
        className="flex justify-center bg-[#3594f3]"
        style={{ backgroundImage: `url("${WhiteImage}")` }}
      >
        <div className="bg-white smmin:h-[450px] min-w-[50%] flex smmin:flex-row sm:flex-col justify-center smmin:gap-[8%] sm:gap-[10px] rounded-3xl py-[3%] px-[2%] my-[3%] mx-[5%]">
          <div className="flex flex-col justify-between items-center text-center gap-[5%]">
            <img src={bronze} className="h-[124px] w-[100px]" alt="برنز" />
            <h3 className="font-bold">جاب‌یاب برنزی</h3>
            <ul className="">
              <li className="text-[12px]">✔ امکان اضافه کردن تا سه آگهی</li>
            </ul>
            <p className="flex flex-col">
              <span className="text-[12px]"> قیمت</span>
              <span className="text-primary font-bold text-[20px]">رایگان</span>
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
            <img src={silver} className="h-[126px] w-[100px]" alt="نقره" />
            <h3 className="font-bold">جاب‌یاب نقره‌ای</h3>
            <ul className="">
              <li className="text-[12px]">✔ امکان اضافه کردن تا ده آگهی</li>
            </ul>
            <p className="flex flex-col">
              <span className="text-[12px]"> قیمت</span>
              <span className="text-primary font-bold text-[20px]">
                ۲۰,۰۰۰ تومان
              </span>
            </p>
            <button
              type="button"
              className="max-w-fit min-w-[100px] py-[5%] px-[14%] rounded-md bg-primary text-white font-bold mmmin:text-[14px] mm:text-[10px] hover:bg-white hover:border-primary hover:border-[2px] hover:border-solid hover:text-black"
              onClick={() => history.push("/profile-company")}
            >
              ارتقا
            </button>
          </div>
          <div className="border-darkModeGray border-[1px] shadow-[0_2px_4px_0_rgba(200,200,200)]"></div>
          <div className="flex flex-col justify-between items-center text-center gap-[5%]">
            <img src={gold} className="h-[126px] w-[110px]" alt="طلا" />
            <h3 className="font-bold">جاب‌یاب طلایی</h3>
            <ul className="">
              <li className="text-[12px]">✔ امکان اضافه کردن نامحدود آگهی</li>
            </ul>
            <p className="flex flex-col">
              <span className="text-[12px]"> قیمت</span>
              <span className="text-primary font-bold text-[20px]">
                ۵۰,۰۰۰ تومان
              </span>
            </p>
            <button
              type="button"
              className="max-w-fit min-w-[100px] py-[5%] px-[14%] rounded-md bg-primary text-white font-bold mmmin:text-[14px] mm:text-[10px] hover:bg-white hover:border-primary hover:border-[2px] hover:border-solid hover:text-black"
              onClick={() => history.push("/profile-company")}
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
};

export default Home;
