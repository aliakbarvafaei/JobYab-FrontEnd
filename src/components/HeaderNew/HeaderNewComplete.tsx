import React, { useState } from "react";
import bg_header from "../../assets/images/bg-header.jpg";
import Hamburger from "../mainMenu/Hamburger/Hamburger";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logo1_white from "../../assets/images/logo1_white.png";
import predict from "../../assets/images/predict.png";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { eachToast, statesRedux } from "../../ts/interfaces";
import { useToast } from "../../contexts/ToastState";
import HeaderSection from "../NEW/HeaderSection/HeaderSection";

const titleMenus = [
  {
    title: "خرید",
    submenu: [
      { title: "آپارتمان", pathTo: "/search" },
      { title: "ویلایی", pathTo: "/search" },
    ],
  },
  {
    title: "رهن و اجاره",
    submenu: [
      { title: "آپارتمان", pathTo: "/search" },
      { title: "ویلایی", pathTo: "/search" },
    ],
  },
  {
    title: "قیمت خانه شما",
    submenu: [
      { title: "آپارتمان", pathTo: "/predict" },
      { title: "ویلایی", pathTo: "/predict" },
    ],
  },
];

const HeaderNewComplete: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useSelector((state: statesRedux) => state.userAuth);
  const themeClass = "bg-white";
  const themeAccount: string = "bg-white text-black";

  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");

  const { setToastState } = useToast();
  // const navigate = useNavig
  const dispatch = useDispatch();
  function addItemOnce(
    arr: Array<eachToast>,
    value: eachToast
  ): Array<eachToast> {
    arr.push(value);
    return arr;
  }
  function handleChange(e: React.MouseEvent) {
    setSearchInput((e.target as HTMLInputElement).value);
  }
  function handleHamburger() {
    setIsOpen((old) => !old);
  }

  return (
    <>
      <HeaderSection />
      <div
        style={{ backgroundColor: "#D3D3D3" }}
        className="w-[100%] h-[550px] bg-no-repeat bg-cover bg-center bg-opacity-10 flex flex-col items-center"
      >
        <div className="flex flex-col justify-center h-full">
          <div className="text-center text-[#555658] text-[20px] md:text-[12px] font-bold leading-[40px]">
            به صورت رایگان و در سریع‌ترین زمان ممکن
            <br />
            قیمت خانه خود را پیش‌بینی کنید
          </div>
          <div className="relative text-center mt-[40px]">
            <form>
              <input
                type="text"
                value={searchInput}
                onChange={handleChange as any}
                className="rounded-3xl w-[500px] lg:w-[400px] sm:w-[300px] mm:w-[200px] h-[50px] text-[10px] pr-[12%] mm:pr-[18%] mdmin:outline mdmin:outline-[10px] mdmin:outline-[#1976D2]"
                placeholder="جستجو آگهی یا منطقه"
              />
              <button
                type="submit"
                onClick={() => {
                  if (searchInput !== "")
                    history.push(`/search?searchText=${searchInput}`);
                }}
                className="fa fa-search absolute smmin:right-[3%] sm:right-[5%] mm:right-[15%] top-[35%]"
              ></button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-[10px] text-center text-[#555658] text-[18px] font-bold leading-[40px] pt-[30px]">
            <Link to="/predict">
              <img
                src={predict}
                className="peer w-[100px] cursor-pointer hover:scale-125 duration-[500ms]"
                alt=""
              />
            </Link>
            <Link to="/predict">
              <span className="peer-hover:text-[#1976D2] hover:text-[#1976D2] cursor-pointer">
                پیش‌بینی قیمت
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNewComplete;
