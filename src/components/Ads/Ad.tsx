import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { ads } from "../../ts/interfaces";
import { convertorPrice, DateDiff } from "../../ts/functions";

import Chart1 from "../Chart/Chart";
import Map from "../Map/Map";

const Ad:React.FC<{ad:ads}> = ({ ad })=> {
  const themeClass = "bg-white";
  const [ images, setImages ] = useState<Array<string | null>>([ad.main_image]);
  const themeBorder = "border-darkGray";
  const themeBorder2 = "border-darkModeGray";
  const [ menuAd ] = useState({
    "description": ad.description,
    "informationCall": ad.phone_number
  })
  const [showMenu, setShowMenu] = useState("description");
  const styleSelectedMenu = "text-red border-red border-b-solid border-b-[2px]";

  const [backgroundImage, setBackgroundImage] = useState(
    ad.main_image
  );

  useEffect(() => {
    if(ad.image_1){
      setImages(old=> [...old,ad.image_1]);
      if(ad.image_2){
        setImages(old=> [...old,ad.image_2]);
        if(ad.image_3){
          setImages(old=> [...old,ad.image_3]);
        }
      }
    }
    else{
      setImages([])
    }
  }, [ad.image_3,ad.image_2,ad.image_1]);

  function handleBackground(e:React.MouseEvent) {
    setBackgroundImage((e.target as HTMLImageElement).src);
  }

  // function handleClickBookmark(e:React.MouseEvent) {
  //   e.preventDefault();
  //   if (!user) {
  //     setToastState((old:Array<eachToast>) =>
  //       addItemOnce(old.slice(), {
  //         title: "2",
  //         description: "First, log in to your account",
  //         key: Math.random(),
  //       })
  //     );
  //     history.push("/login");
  //   } else {
  //     // setToastState(old=>addItemOnce(old.slice(),{
  //     //     title: "3",
  //     //     description: "", key:Math.random()
  //     //     }))
  //     postBookmark(user, ad.id)
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
    <div className={`${themeClass} px-[14%] sm:px-[6%] py-[50px]`}>
      <div className="flex lg:flex-col lg:items-center lg:gap-[20px] lgmin:flex-row lgmin:justify-between flex-wrap">
        <div className="sm:w-[90%] lg:w-[70%] lgmin:w-[48%] flex flex-col gap-[20px]">
          {ad ? (
            <>
              <div
                className={` bg-[length:100%_100%] bg-no-repeat w-[100%] mm:h-[200px] sm:h-[300px] md:h-[350px] lg:h-[450px] lgmin:h-[500px]`}
                style={{ backgroundImage: `url("` + backgroundImage + `")` }}
              ></div>
              <div className="flex flex-row justify-between w-[100%] gap-[4%] h-[16%]">
                {images.map((item:any, index:number) => {
                  return (
                    <img
                      key={index}
                      className={`${
                        item === backgroundImage
                          ? "border-solid border-[2px]"
                          : ""
                      } ${themeBorder} min-w-[22%] cursor-pointer`}
                      onClick={handleBackground}
                      src={item}
                      alt={String(index)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="w-[100%] mm:h-[350px] sm:h-[450px] md:h-[550px] lg:h-[700px] lgmin:h-[750px] mt-0 pt-0">
              <Skeleton variant="rectangular" width={"100%"} height={"70%"} />
            </div>
          )}
        </div>
        <div className="sm:w-[90%] lg:w-[70%] lgmin:w-[48%] flex flex-col gap-[10px] lg:text-center">
          <div>
            {ad ? (
              <>
                <h2 className="text-[25px] font-bold pb-[10px]">
                  {ad.title}
                </h2>
                <div className="flex flex-row justify-between items-center pb-[10px]">
                  <div className="text-right text-sm text-darkGray">
                    <span>{DateDiff.inMonths(new Date(ad.created_at),new Date())===0?
                      (DateDiff.inWeeks(new Date(ad.created_at),new Date())===0?
                        (DateDiff.inDays(new Date(ad.created_at),new Date())===0?
                          (DateDiff.inHour(new Date(ad.created_at),new Date())===0?
                            <>دقایقی پیش</>
                            :
                            <>{DateDiff.inHour(new Date(ad.created_at),new Date())} ساعت پیش</>)
                          :
                          <>{DateDiff.inDays(new Date(ad.created_at),new Date())} روز پیش</>)
                      :
                      <>{DateDiff.inWeeks(new Date(ad.created_at),new Date())} هفته پیش</>)
                    :
                    <>{DateDiff.inMonths(new Date(ad.created_at),new Date())} ماه پیش</>}</span>
                    ، <span>{ad.neighbor}</span>
                    
                  </div>
                  {/* <i
                    className="fa fa-bookmark text-red pb-[5px] rotate-90 cursor-pointer"
                    // onClick={handleClickBookmark}
                    style={{fontSize: '26px'}}
                    aria-hidden="true"
                  ></i> */}
                </div>
              </>
            ) : (
              <div className="w-[100%] mt-0 pt-0">
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"50px"}
                />
              </div>
            )}
            {ad ? (
              <>                
                <div className="sm:rounded-lg">
                    <div className="bg-white text-sm font-bold flex flex-row justify-between items-center text-center w-[100%]">
                        <div className="w-[33%]">
                            <div className="my-3 mmmin:px-6 border-l border-l-gray">
                              <div className="mb-[6px]">متراژ</div>
                              <div>{ad.floor_area}</div>
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <div className="my-3 mmmin:px-6 border-l border-l-gray">
                              <div className="mb-[6px]">اتاق</div>
                              <div>{ad.num_of_beds}</div>
                            </div>
                        </div>
                        <div className="w-[33%]">
                            <div className="my-3 mmmin:px-6">
                              <div className="mb-[6px]">سن ساخت</div>
                              <div>{ad.age}</div>
                            </div>
                        </div>
                    </div>
                    <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="bg-lightGray">
                                <th className="py-4 mmmin:px-6 mm:pr-3 text-right">
                                    قیمت 
                                </th>
                                <td className="py-4 mmmin:px-6 mm:pl-3 text-left">
                                    <span className="pl-[6px]">{ad.total_price===0 ? "":convertorPrice(ad.total_price)[1]}</span>{ad.total_price!==0 ? convertorPrice(ad.total_price)[0]:"توافقی"}
                                </td>
                            </tr>
                            <tr className="bg-white">
                                <th className="py-4 mmmin:px-6 mm:pr-3 text-right">
                                    نوع 
                                </th>
                                <td className="py-4 mmmin:px-6 mm:pl-3 text-left">
                                    {ad.type}
                                </td>
                            </tr>
                            <tr className="bg-lightGray">
                                <th className="py-4 mmmin:px-6 mm:pr-3 text-right">
                                    دسته‌بندی 
                                </th>
                                <td className="py-4 mmmin:px-6 mm:pl-3 text-left">
                                    {ad.category}
                                </td>
                            </tr>
                            <tr className="bg-white">
                                <th className="py-4 mmmin:px-6 mm:pr-3 text-right">
                                    مکان 
                                </th>
                                <td className="py-4 mmmin:px-6 mm:pl-3 text-left">
                                    {ad.province} ,منطقه {ad.region}
                                </td>
                            </tr>
                            <tr className="bg-lightGray">
                                <th className="py-4 mmmin:px-6 mm:pr-3 text-right">
                                    ایجادکننده 
                                </th>
                                <td className="py-4 mmmin:px-6 mm:pl-3 text-left">
                                    {ad.seller}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </>
            ) : (
              <div className="w-[100%] mt-[10px] ml-[10%]">
                <Skeleton variant="rectangular" width={"80%"} height={"40px"} />
              </div>
            )}
          </div>
          <div
            className={`${themeBorder2} w-[100%] border-dashed border-b-[1px]`}
          ></div>
          {ad ? (
            <div>
              <div className="bg-white text-sm font-bold flex flex-row justify-between items-center text-center w-[100%]">
                  <div className="w-[33%]">
                      <div className="my-3 mmmin:px-6 border-l border-l-gray">
                        <div className="mb-[6px]">پارکینگ</div>
                        <div>{ad.parking ? <i className="fa fa-check text-green" aria-hidden="true"></i>:<i className="fa fa-close text-red" aria-hidden="true"></i>}</div>
                      </div>
                  </div>
                  <div className="w-[33%]">
                      <div className="my-3 mmmin:px-6 border-l border-l-gray">
                        <div className="mb-[6px]">بالکن</div>
                        <div>{ad.balcony ? <i className="fa fa-check text-green" aria-hidden="true"></i>:<i className="fa fa-close text-red" aria-hidden="true"></i>}</div>
                      </div>
                  </div>
                  <div className="w-[33%]">
                      <div className="my-3 mmmin:px-6">
                        <div className="mb-[6px]">آسانسور</div>
                        <div>{ad.elevator ? <i className="fa fa-check text-green" aria-hidden="true"></i>:<i className="fa fa-close text-red" aria-hidden="true"></i>}</div>
                      </div>
                  </div>
              </div>
              <div className="bg-white text-sm font-bold flex flex-row justify-between items-center text-center w-[100%] border-t border-t-gray">
                  <div className="w-[33%]">
                      <div className="my-3 mmmin:px-6 border-l border-l-gray">
                        <div className="mb-[6px]">نگهبان</div>
                        <div>{ad.guard ? <i className="fa fa-check text-green" aria-hidden="true"></i>:<i className="fa fa-close text-red" aria-hidden="true"></i>}</div>
                      </div>
                  </div>
                  <div className="w-[33%]">
                      <div className="my-3 mmmin:px-6 border-l border-l-gray">
                        <div className="mb-[6px]">لابی</div>
                        <div>{ad.lobby ? <i className="fa fa-check text-green" aria-hidden="true"></i>:<i className="fa fa-close text-red" aria-hidden="true"></i>}</div>
                      </div>
                  </div>
                  <div className="w-[33%]">
                      <div className="my-3 mmmin:px-6">
                        <div className="mb-[6px]">انباری</div>
                        <div>{ad.warehouse ? <i className="fa fa-check text-green" aria-hidden="true"></i>:<i className="fa fa-close text-red" aria-hidden="true"></i>}</div>
                      </div>
                  </div>
              </div>
              <div className="bg-white text-sm font-bold flex flex-row justify-between items-center text-center w-[100%] border-t border-t-gray">
                  <div className="w-[33%]">
                      <div className="my-3 mmmin:px-6 border-l border-l-gray">
                        <div className="mb-[6px]">استخر</div>
                        <div>{ad.swimming_pool ? <i className="fa fa-check text-green" aria-hidden="true"></i>:<i className="fa fa-close text-red" aria-hidden="true"></i>}</div>
                      </div>
                  </div>
                  <div className="w-[33%]">
                      <div className="my-3 mmmin:px-6 border-l border-l-gray">
                        <div className="mb-[6px]">سالن ورزشی</div>
                        <div>{ad.sports_hall ? <i className="fa fa-check text-green" aria-hidden="true"></i>:<i className="fa fa-close text-red" aria-hidden="true"></i>}</div>
                      </div>
                  </div>
                  <div className="w-[33%]">
                      <div className="my-3 mmmin:px-6">
                        <div className="mb-[6px]">در برقی</div>
                        <div>{ad.remote_door ? <i className="fa fa-check text-green" aria-hidden="true"></i>:<i className="fa fa-close text-red" aria-hidden="true"></i>}</div>
                      </div>
                  </div>
              </div>
            </div>
          ) : (
            <div className="w-[100%] my-[30px]">
              <Skeleton variant="rectangular" width={"100%%"} height={"60px"} />
            </div>
          )}
          <div
            className={`${themeBorder2} w-[100%] border-dashed border-b-[1px]`}
          ></div>
          {ad ? (
            <>
              {/* <div>
                <h2 className="text-[14px] font-bold ">اشتراک گذاری</h2>
                <div className="flex flex-row items-center gap-[10px] lg:justify-center mt-[8px]">
                  <span>
                    <FaFacebookF fontSize={"20px"} />
                  </span>
                  <span>
                    <FaGooglePlusG fontSize={"20px"} />
                  </span>
                  <span>
                    <FaTwitter fontSize={"20px"} />
                  </span>
                  <span>
                    <FaInstagram fontSize={"20px"} />
                  </span>
                </div>
              </div> */}
            </>
          ) : (
            <div className="w-[100%] my-[30px]">
              <Skeleton
                variant="rectangular"
                width={"100%%"}
                height={"150px"}
              />
            </div>
          )}
          {/* <div
            className={`${themeBorder2} w-[100%] border-dashed border-b-[1px]`}
          ></div> */}
        </div>
        <div className="mt-[10px] lgmin:px-[30px] sm:w-[90%] lg:w-[70%] lgmin:w-[100%]">
          {ad ? (
            <>
              <div
                className={`flex mm:flex-col mmmin:flex-row lg:justify-center gap-[30px] mmmin:border-b-[1px] mmmin:border-b-solid ${themeBorder2}`}
              >
                <h4
                  className={`${
                    showMenu === "description"
                      ? styleSelectedMenu
                      : themeBorder2
                  } pb-[20px] text-[14px] mm:w-[100%] mm:text-center mm:pb-[10px] cursor-pointer mm:border-b-[1px] mm:border-b-solid`}
                  onClick={() => setShowMenu("description")}
                >
                  توضیحات
                </h4>
                <h4
                  className={`${
                    showMenu === "informationCall" ? styleSelectedMenu : themeBorder2
                  } pb-[20px] text-[14px] mm:w-[100%] mm:text-center mm:pb-[10px] cursor-pointer mm:border-b-[1px] mm:border-b-solid`}
                  onClick={() => setShowMenu("informationCall")}
                >
                  اطلاعات تماس
                </h4>
              </div>
              <p className="text-[14px] text-darkGray leading-[25px] py-[20px] px-[20px] border-b border-b-darkModeGray">
                {showMenu==="description"? menuAd.description:menuAd.informationCall}
              </p>
            </>
          ) : (
            <div className="w-[100%] mt-[-200px]">
              <Skeleton
                variant="rectangular"
                width={"100%%"}
                height={"150px"}
              />
            </div>
          )}
        </div>
        <div className="flex lg:flex-col lgmin:flex-row lgmin:justify-center items-center lg:justify-center w-full my-[30px] gap-[30px]">
          <Map x={ad.location_y} y={ad.location_x}/>
          {ad.graph==="" || ad.graph==="Graph" || ad.graph==="None" || ad.graph===null ? <></>:<div className="lgmin:w-[60%] lg:w-[90%] h-[400px]"><Chart1 data={JSON.parse(ad.graph.replace(/'/g, '"'))['content'] as any[]} /></div>}
        </div>
      </div>
    </div>
  );
}

export default Ad;