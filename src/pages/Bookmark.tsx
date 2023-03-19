import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitlePages from "../components/TitlePages/TitlePages";
import { useToast } from "../contexts/ToastState";
import { deleteBookmark, getBookmark } from "../services/api";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { eachToast, statesRedux } from "../ts/interfaces";
import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";
import { convertorPrice } from "../ts/functions";


const Bookmark:React.FC = () => {
  const themeClass = "bg-white";
  const themeBorder = "border-darkModeGray";

  const [AdBookmark, setAdBookmark] = useState([]);
  const { setToastState } = useToast();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state : statesRedux) => state.userAuth);

  useEffect(() => {
    getBookmark(user as string)
      .then((response) => {
        setAdBookmark(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);
  function addItemOnce(arr:Array<eachToast>, value:eachToast) {
    arr.push(value);
    return arr;
  }
  function handleremove(ad : any) {
    // setToastState(old=>addItemOnce(old.slice(),{
    //     title: "3",
    //     description: "", key:Math.random()
    //     }))
    deleteBookmark(user as string, ad.code)
      .then((response) => {
        console.log(response.data);
        setToastState((old:Array<eachToast>) =>
          addItemOnce(old.slice(), {
            title: "2",
            description: "آگهی با موفقیت حذف شد",
            key: Math.random(),
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
    setAdBookmark((old:any) => removeItemOnce(old.slice(), ad));
  }
  function removeItemOnce(arr:any, value:any) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  return (
    <div>
      <HeaderNewShort />
      <TitlePages title="نشان شده‌ها" />
      <div className={`${themeClass} px-total py-[50px]`}>
        {(AdBookmark.length > 0 || loading) && (
          <table className="w-[100%] table-fixed">
            <thead className={`border-b-solid border-b-[.5px] ${themeBorder}`}>
              <tr>
                <th className="p-[12px]">تصویر</th>
                <th className="p-[12px]">عنوان</th>
                <th className="md:hidden p-[12px]">قیمت</th>
                <th className="md:hidden p-[12px]">فعالیت</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (AdBookmark).map((Ad:any, index:number):any => {
                 return <tr
                        key={index}
                        className={`text-center border-b-solid border-b-[.5px] ${themeBorder}`}
                      >
                        <td className="p-[12px]">
                          <Link
                            to={
                              "/ad-details/" +
                              String(Ad.identifier) + `${Ad.source==="پیش خونه"? '/pishkhooneh':'/kilid'}`
                              // +
                              // `-` +
                              // String(
                              //   Ad.title.replace(/\s/g, "").toLowerCase()
                              // )
                            }
                          >
                            <img
                              className="mm:w-[60%] sm:w-[40%] smmin:w-[30%] mr-[35%]"
                              src={Ad.images[0]}
                              alt=""
                            />
                          </Link>
                        </td>
                        <td className="md:hidden p-[12px] text-darkGray">
                          <Link
                            to={
                              "/ad-details/" +
                              String(Ad.identifier) + `${Ad.source==="پیش خونه"? '/pishkhooneh':'/kilid'}`
                            }
                          >
                            {Ad.title}
                          </Link>
                        </td>
                        <td className="md:hidden p-[12px] text-[18px] flex flex-row justify-center items-center gap-[5px]">
                          <span className="text-red">{convertorPrice(Ad.totalPrice)[1]}</span>
                          <span className="text-[12px]">{convertorPrice(Ad.totalPrice)[0]}</span>
                        </td>
                        <td className="md:hidden p-[12px] text-darkGray">
                          <i
                            className="fa fa-times cursor-pointer"
                            onClick={() => {
                              handleremove(Ad);
                            }}
                            aria-hidden="true"
                          ></i>
                        </td>
                        <td className="mdmin:hidden md:flex flex-col items-center justify-center gap-[20px] pt-[10%] text-[14px] w-[100%] h-[100%] p-[12px]">
                          <span className="w-[100%] text-darkGray">
                            {Ad.title}
                          </span>
                          <span className="flex smmin:flex-row sm:flex-col justify-between items-center flex-wrap w-[80%]">
                            <span className="text-red text-[13px] mm:text-[10px] flex flex-row justify-center gap-[5px] text-center">
                              <span>{convertorPrice(Ad.totalPrice)[1]}</span>
                              <span>{convertorPrice(Ad.totalPrice)[0]}</span>
                            </span>
                            <span className="text-darkGray">
                              <i
                                className="fa fa-times cursor-pointer"
                                onClick={() => {
                                  handleremove(Ad);
                                }}
                                aria-hidden="true"
                              ></i>
                            </span>
                          </span>
                        </td>
                      </tr>
                  }
                ):
                  <tr>
                    <td>
                      <Skeleton
                        height={"150px"}
                        width={"40%"}
                        className="ml-[30%]"
                      />
                    </td>
                    <td>
                      <Skeleton height={"50px"} />
                    </td>
                    <td className="md:hidden">
                      <Skeleton height={"50px"} />
                    </td>
                    <td className="md:hidden">
                      <Skeleton height={"50px"} />
                    </td>
                    <td className="md:hidden">
                      <Skeleton height={"50px"} />
                    </td>
                  </tr>
              }
            </tbody>
          </table>
        )}
        {AdBookmark.length === 0 && !loading && (
          <div className="w-[100%] text-center py-[30px] text-darkGray font-bold flex flex-col items-center gap-[20px]">
            نشان شده‌ها خالی است
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmark;
