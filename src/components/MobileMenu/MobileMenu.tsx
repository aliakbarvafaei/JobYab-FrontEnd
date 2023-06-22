import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useToast } from "../../contexts/ToastState";
import { useDispatch, useSelector } from "react-redux";
import { eachToast, statesRedux } from "../../ts/interfaces";
import { Box } from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Cookies from "js-cookie";

const myAccountLoggedOut = [
  { title: "ورود", pathTo: "/login" },
  { title: "ثبت نام", pathTo: "/login" },
];
const myAccountLoggedIn = [
  { title: "درخواست‌ها", pathTo: "/profile?section=request" },
  { title: "اطلاعات", pathTo: "/profile?section=information" },
  { title: "خروج", pathTo: "/" },
];

const MobileMenu: React.FC = () => {
  const { role, token } = useSelector((state: statesRedux) => state.userAuth);
  const dispatch = useDispatch();
  const { setToastState } = useToast();
  const history = useHistory();

  const themeClass = "bg-darkModeLightBlack";

  function addItemOnce(
    arr: Array<eachToast>,
    value: eachToast
  ): Array<eachToast> {
    arr.push(value);
    return arr;
  }

  return (
    <>
      <div className="sm:fixed smmin:hidden sm:bottom-0 z-[25] flex flex-row justify-between items-center bg-darkModeLightBlack w-full h-16 text-darkGray text-[26px] mmmin:px-[40px] mm:px-[20px]">
        <Link key="پشتیبانی" to="/profile?section=message">
          <span className="flex flex-col justify-center items-center">
            <ContactSupportIcon />
            <p className="text-[12px] mm:text-[10px]">پشتیبانی</p>
          </span>
        </Link>
        <Link to="/profile?section=bookmark">
          <span className="flex flex-col justify-center items-center">
            <BookmarksOutlinedIcon />
            <p className="text-[12px] mm:text-[10px]">نشان شده‌ها</p>
          </span>
        </Link>
        <Link to="/profile-company">
          <span className="flex flex-col justify-center items-center">
            <ApartmentIcon />
            <p className="text-[12px] mm:text-[10px]">کارفرما</p>
          </span>
        </Link>
        <span className="flex flex-col justify-center items-center">
          <i className="fa fa-user group relative" aria-hidden="true">
            <div
              className={`${themeClass} absolute hidden rounded-md group-hover:block hover:flex w-[100px] py-[10px] px-[20px] bottom-6 right-[-45px]
                  flex-col drop-shadow-lg z-[26]`}
            >
              {role !== null && token !== null
                ? myAccountLoggedIn.map((item, index) => {
                    return (
                      <Box
                        className="text-right text-[14px] py-[12px] hoverItem font-normal cursor-pointer"
                        onClick={() => {
                          if (item.title === "خروج") {
                            history.push("/home");
                            dispatch({ type: "logout" });
                            Cookies.remove("access");
                            Cookies.remove("refresh");
                            // localStorage.setItem(
                            //   "token_user",
                            //   JSON.stringify("")
                            // );
                            setToastState((old: Array<eachToast>) =>
                              addItemOnce(old.slice(), {
                                title: "1",
                                description: "خروج با موفقیت انجام شد",
                                key: Math.random(),
                              })
                            );
                          } else {
                            window.location.href = item.pathTo as string;
                          }
                        }}
                        key={index}
                      >
                        {item.title}
                      </Box>
                    );
                  })
                : myAccountLoggedOut.map((item, index) => {
                    return (
                      <Link
                        className="text-right text-[14px] py-[12px] hoverItem font-normal"
                        to={item.pathTo}
                        key={index}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
            </div>
          </i>
          <p className="text-[12px] mm:text-[10px]">حساب</p>
        </span>
      </div>
    </>
  );
};

export default MobileMenu;
