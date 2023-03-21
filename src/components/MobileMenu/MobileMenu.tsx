import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../contexts/ToastState";
import { useDispatch, useSelector } from "react-redux";
import { eachToast, statesRedux } from "../../ts/interfaces";

const myAccountDrop = [
  { title: "ورود", pathTo: "/login" },
  { title: "ثبت نام", pathTo: "/register" },
  { title: "پروفایل", pathTo: "/profile" },
  { title: "خروج", pathTo: "/" },
];

const MobileMenu:React.FC = ()=> {
  const { user } = useSelector((state : statesRedux) => state.userAuth);
  const dispatch = useDispatch();
  const { setToastState } = useToast();

  const themeClass = "bg-darkModeLightBlack";

  function addItemOnce(arr : Array<eachToast>, value : eachToast):Array<eachToast> {
      arr.push(value);
      return arr;
  }

  return (
    <>
      <div className="sm:fixed smmin:hidden sm:bottom-0 z-[25] flex flex-row justify-between items-center bg-darkModeLightBlack w-full h-16 text-darkGray text-[26px] px-[40px]">
        <Link to="/new-ad">
          <span className="flex flex-col justify-center items-center">
            <i
              className="fa fa-plus"
              aria-hidden="true"
            ></i>
            <p className="text-[12px]">آگهی</p>
          </span>
        </Link>
        {/* <Link to="/bookmark">
          <span className="flex flex-col justify-center items-center">
            <i className="fa fa-bookmark" aria-hidden="true"></i>
            <p className="text-[12px]">نشان شده</p>
          </span>
        </Link> */}
        <Link to="/predict">
          <span className="flex flex-col justify-center items-center">
            <i
              className="fa fa-home"
              aria-hidden="true"
            ></i>
            <p className="text-[12px]">قیمت</p>
          </span>
        </Link>
        <span className="flex flex-col justify-center items-center">
          <i className="fa fa-user group relative" aria-hidden="true">
            <div
              className={`${themeClass} absolute hidden rounded-md group-hover:block hover:flex w-[100px] py-[10px] px-[20px] bottom-6 right-[-45px]
                  flex-col drop-shadow-lg z-[26]`}
            >
              {myAccountDrop.map((item, index) => {
                if (user) {
                  if (item.title === "خروج")
                    return (
                      <Link
                        className="text-right text-[14px] py-[12px] hoverItem font-normal"
                        onClick={() => {
                          dispatch({ type: "logout" });
                          localStorage.setItem("token_user", JSON.stringify(""));
                          setToastState((old : Array<eachToast>) =>
                            addItemOnce(old.slice(), {
                              title: "1",
                              description: "خروج با موفقیت انجام شد",
                              key: Math.random(),
                            })
                          );
                        }}
                        to={item.pathTo}
                        key={index}
                      >
                        {item.title}
                      </Link>
                    );
                  else if (item.title === "پروفایل")
                    return (
                      <Link
                        className="text-right text-[14px] py-[12px] hoverItem font-normal"
                        to={item.pathTo}
                        key={index}
                      >
                        {item.title}
                      </Link>
                    );
                } else if (item.title !== "خروج" && item.title !== "پروفایل") {
                  return (
                    <Link
                      className="text-right text-[14px] py-[12px] hoverItem font-normal"
                      to={item.pathTo}
                      key={index}
                    >
                      {item.title}
                    </Link>
                  );
                }
              })}
            </div>
          </i>
          <p className="text-[12px]">حساب</p>
        </span>
      </div>
    </>
  );
}

export default MobileMenu;
