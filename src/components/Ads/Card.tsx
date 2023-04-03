import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertorPrice } from "../../ts/functions";
import { ads } from "../../ts/interfaces";

const Card: React.FC<{ item: ads; dir: string }> = ({ item, dir }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  useEffect(() => {
    setBackgroundImage(item.main_image);
  }, [item.main_image]);

  // function handleClickBookmark(e : React.MouseEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   if (!user) {
  //     setToastState((old:Array<eachToast>) =>
  //       addItemOnce(old.slice(), {
  //         title: "2",
  //         description: "ابتدا وارد حساب خود شوید",
  //         key: Math.random(),
  //       })
  //     );
  //     history.push("/login");
  //   } else {
  //     // setToastState(old=>addItemOnce(old.slice(),{
  //     //     title: "3",
  //     //     description: "", key:Math.random()
  //     //     }))
  //     postBookmark(user, item.id)
  //       .then((response) => {
  //         console.log(response.data);
  //         setToastState((old:Array<eachToast>) =>
  //           addItemOnce(old.slice(), {
  //             title: "1",
  //             description: "آگهی با موفقیت اضافه شد",
  //             key: Math.random(),
  //           })
  //         );
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 409) {
  //           setToastState((old:Array<eachToast>) =>
  //             addItemOnce(old.slice(), {
  //               title: "2",
  //               description: "این آگهی اخیرا اضافه شده است",
  //               key: Math.random(),
  //             })
  //           );
  //         } else {
  //           console.error(err);
  //         }
  //       });
  //   }
  // }
  return (
    <div className="group flex flex-col md:ml-[5px] lg:ml-[10px] lgmin:ml-[20px] text-right">
      <Link
        to={
          "/ad-details/" +
          String(item.id) +
          `${item.source === "پیش خونه" ? "/pishkhooneh" : "/kilid"}`
        }
      >
        <div
          className={`relative overflow-hidden mm:min-h-[150px] sm:min-h-[190px] md:min-h-[210px] lg:min-h-[240px] xl:min-h-[270px] xlmin:min-h-[300px] bg-[length:100%_100%] bg-no-repeat`}
          style={{ backgroundImage: `url("` + backgroundImage + `")` }}
        >
          <div className="absolute sm:right-0 smmin:right-[-50px] bottom-[5%] flex flex-col items-center justify-center gap-[20px] text-darkGray text-[20px]"></div>
        </div>
      </Link>

      <Link
        to={
          "/ad-details/" +
          String(item.id) +
          `${item.source === "پیش خونه" ? "/pishkhooneh" : "/kilid"}`
        }
      >
        <div
          id="title"
          className="sm:text-[12px] md:text-[14px] mdmin:text-[16px] font-medium text-black text-right pt-[10px]"
        >
          {item.title}{" "}
        </div>
      </Link>
      <div id="price" className="text-right text-red pt-[10px] opacity-90">
        <h3 className="sm:text-[8px] md:text-[10px] mdmin:text-[14px] font-bold ">
          <span>قیمت : </span>
          <span>
            {item.total_price === 0 ? "" : convertorPrice(item.total_price)[1]}
          </span>
          <span className="pr-[5px]">
            {item.total_price !== 0
              ? convertorPrice(item.total_price)[0]
              : "توافقی"}
          </span>
        </h3>
      </div>
      <div
        id="location"
        className="py-[10px] text-right sm:text-[8px] smmin:text-[12px] text-darkGray"
      >
        <h3>
          {dir === "r" ? (
            <>
              <span>
                <i className="fa fa-map-marker pl-[5px]" aria-hidden="true"></i>
              </span>
              <span>{item.neighbor}</span>
            </>
          ) : (
            <>
              <span>{item.neighbor}</span>
              <span>
                <i className="fa fa-map-marker pl-[5px]" aria-hidden="true"></i>
              </span>
            </>
          )}
        </h3>
      </div>
    </div>
  );
};

export default Card;
