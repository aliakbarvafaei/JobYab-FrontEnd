import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Card from "../components/Ads/Card";
import Box from "../assets/images/box.png"
import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";
import TitlePages from "../components/TitlePages/TitlePages";
import { useToast } from "../contexts/ToastState";
import { deleteAd, getmyhomes, getUser, updateCreditAPI } from "../services/api";
import { ads, eachToast, InformationUserTypes, ProfileInputTypes } from "../ts/interfaces";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import Footer from "../components/Footer/Footer";

// const x:Array<ads> = [
//   {
//       "id": 1,
//       "owner": "محمد نوری - 09140013762",
//       "title": "خانه 90 متری دارای استخر",
//       "total_price": 10000000000,
//       "unit_price": 210,
//       "province": "تهران",
//       "address": "تست",
//       "location_x": 35.699739,
//       "location_y": 51.338097,
//       "main_image": "https://cdn.kilid.com/photos/large/listing_473894bc-4d2e-47cf-b1a8-f7351c318996.jpg",
//       "image_1": "https://cdn.kilid.com/photos/large/listing_2d1572eb-dda7-4656-bee2-c225b0c63950.jpg",
//       "image_2": null,
//       "image_3": null,
//       "type": "مسکونی",
//       "category": "ویلا",
//       "status": "فروشی",
//       "seller": "املاک",
//       "age": 115,
//       "floor_area": 220,
//       "num_of_beds": 3,
//       "parking": false,
//       "lobby": false,
//       "warehouse": false,
//       "sports_hall": false,
//       "guard": false,
//       "elevator": false,
//       "swimming_pool": false,
//       "balcony": false,
//       "roof_garden": false,
//       "remote_door": false,
//       "description": "test",
//       "region": 21,
//       "neighbor": "زعفرانیه",
//       "graph": null,
//       "phone_number": "091111111",
//       "updated_at": "2022-12-28T20:06:12.722292+03:30",
//       "created_at": "2022-12-24T10:22:04.508146+03:30",
//       "is_active": true
//   },
//   {
//       "id": 2,
//       "owner": "محمد نوری - 09140013762",
//       "title": "تستر",
//       "total_price": 35400000000,
//       "unit_price": 64841,
//       "province": "اصفهان",
//       "address": "",
//       "location_x": 35.699739,
//       "location_y": 51.338097,
//       "main_image": "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg",
//       "image_1": null,
//       "image_2": null,
//       "image_3": null,
//       "type": "مسکونی",
//       "category": "ویلا",
//       "status": "فروشی",
//       "seller": "املاک",
//       "age": 15,
//       "floor_area": 2222,
//       "num_of_beds": 5,
//       "parking": false,
//       "lobby": false,
//       "warehouse": false,
//       "sports_hall": false,
//       "guard": false,
//       "elevator": false,
//       "swimming_pool": false,
//       "balcony": false,
//       "roof_garden": false,
//       "remote_door": false,
//       "description": "test",
//       "region": 3,
//       "neighbor": "جمهوری",
//       "graph": null,
//       "phone_number": "541485541",
//       "updated_at": "2022-12-28T20:10:54.364754+03:30",
//       "created_at": "2022-12-24T10:22:40.103484+03:30",
//       "is_active": true
//   },
//   {
//       "id": 3,
//       "owner": "محمد نوری - 09140013762",
//       "title": "خانه دارای کولر گازی، کابینت ام دی اف، سونا، جکوزی، روف گاردن",
//       "total_price": 10000000000,
//       "unit_price": 54185415,
//       "province": "تهران",
//       "address": "",
//       "location_x": 10.0,
//       "location_y": 10.0,
//       "main_image": "https://cdn.kilid.com/photos/large/listing_32ef0d38-0413-4a24-9bbe-dfe229cc62b6.jpg",
//       "image_1": "https://cdn.kilid.com/photos/large/listing_0dcf326c-ab6b-4dc5-be35-6e5491bced17.jpg",
//       "image_2": null,
//       "image_3": null,
//       "type": "مسکونی",
//       "category": "آپارتمان",
//       "status": "فروشی",
//       "seller": "شخصی",
//       "age": 2,
//       "floor_area": 200,
//       "num_of_beds": 0,
//       "parking": true,
//       "lobby": true,
//       "warehouse": false,
//       "sports_hall": false,
//       "guard": false,
//       "elevator": false,
//       "swimming_pool": true,
//       "balcony": true,
//       "roof_garden": true,
//       "remote_door": false,
//       "description": "لیذیریب یبرسب",
//       "region": 1,
//       "neighbor": "نیاوران",
//       "graph": null,
//       "phone_number": "09123456789",
//       "updated_at": "2022-12-28T20:11:52.034570+03:30",
//       "created_at": "2022-12-28T17:41:24.260072+03:30",
//       "is_active": true
//   },
//   {
//       "id": 4,
//       "owner": "محمد نوری - 09140013762",
//       "title": "برج بسیار شیک و نوساز",
//       "total_price": 5964100000,
//       "unit_price": 544645,
//       "province": "تهران",
//       "address": "",
//       "location_x": 35.67486854197016,
//       "location_y": 51.46499383428294,
//       "main_image": "https://cdn.kilid.com/photos/small/listing_27cbc848-551b-45f1-846f-89056be49f45.jpg",
//       "image_1": "https://cdn.kilid.com/photos/large/listing_0d6c462b-2667-47d2-ac07-46359da20b11.jpg",
//       "image_2": "https://cdn.kilid.com/photos/large/listing_af3d1eae-c0c5-479e-b460-d7747899c5a2.jpg",
//       "image_3": null,
//       "type": "تجاری",
//       "category": "آپارتمان",
//       "status": "فروشی",
//       "seller": "املاک",
//       "age": 5,
//       "floor_area": 300,
//       "num_of_beds": 1,
//       "parking": true,
//       "lobby": false,
//       "warehouse": false,
//       "sports_hall": true,
//       "guard": true,
//       "elevator": false,
//       "swimming_pool": false,
//       "balcony": false,
//       "roof_garden": false,
//       "remote_door": false,
//       "description": "لبیز",
//       "region": 3,
//       "neighbor": "آزادی",
//       "graph": null,
//       "phone_number": "11111111",
//       "updated_at": "2022-12-28T20:09:57.308348+03:30",
//       "created_at": "2022-12-28T18:01:25.313658+03:30",
//       "is_active": true
//   }
// ]
const Profile:React.FC = () => {
  const themeClass = "bg-white"; 
  const themeBorder = "border-darkModeGray"; 
  const themeBorder2 = "border-darkModeGray"; 
  // const dispatch = useDispatch();

  const { setToastState } = useToast();
  const [ myAds, setMyAds ] = useState<Array<ads>>([]);
  const history = useHistory();
  const [showMenu, setShowMenu] = useState("information");
  const styleSelectedMenu = "text-red border-red border-b-solid border-b-[2px]";
  // const { user } = useSelector((state : statesRedux) => state.userAuth);
  const [userInformation, setUserInformation] = useState<false | InformationUserTypes>(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputTypes>();
  const passwordId = useId();
  const passwordConfirm = useId();
  const passwordIdCurrent = useId();

  const [iconPassword, setIconPassword] = useState("fa-eye-slash");
  const [passType, setPassType] = useState("password");

  function addItemOnce(arr:Array<eachToast>, value:eachToast) {
    arr.push(value);
    return arr;
  }

  function handlePassword() {
    setIconPassword((old) =>
      old === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash"
    );
    setPassType((old) => (old === "password" ? "text" : "password"));
  }

  function formSubmit() {
    
    // const LastPassword = (document.getElementById(passwordIdCurrent) as HTMLInputElement).value;
    // const NewPassword = (document.getElementById(passwordId) as HTMLInputElement).value;

    (document.getElementById(passwordIdCurrent) as HTMLInputElement).value = "";
    (document.getElementById(passwordId) as HTMLInputElement).value = "";
    (document.getElementById(passwordConfirm) as HTMLInputElement).value = "";

    // updatePassword(user as string, LastPassword, NewPassword)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setToastState((old:Array<eachToast>) =>
    //         addItemOnce(old.slice(), {
    //           title: "1",
    //           description: `رمز عبور با موفقیت تغییر یافت`,
    //           key: Math.random(),
    //         })
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 401) {
    //       setToastState((old:Array<eachToast>) =>
    //         addItemOnce(old.slice(), {
    //           title: "2",
    //           description: "رمز عبور نادرست است",
    //           key: Math.random(),
    //         })
    //       );
    //     } else if (err.response.status === 404) {
    //       setToastState((old:Array<eachToast>) =>
    //         addItemOnce(old.slice(), {
    //           title: "2",
    //           description: "کاربر یافت نشد ابتدا ثبت‌ نام کنید ...",
    //           key: Math.random(),
    //         })
    //       );
    //     } else {
    //       console.error(err);
    //       setToastState((old:Array<eachToast>) =>
    //         addItemOnce(old.slice(), {
    //           title: "2",
    //           description: "سرور در دسترس نیست",
    //           key: Math.random(),
    //         })
    //       );
    //     }
    //   });
  }
  useEffect(() => {
    // const value : string | null = localStorage.getItem("token_user");
      getUser()
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data)
            setUserInformation(response.data);
            // setMyAds(response.data.homes);
            getmyhomes()
            .then((response) => {
              if (response.status === 200) {
                // console.log(response.data.data);
                setMyAds(response.data.data);
                setLoading(false);
              }
            })
            .catch((err) => {
              setToastState((old:Array<eachToast>) =>
                addItemOnce(old.slice(), {
                  title: "2",
                  description: "سرور دردسترس نیست",
                  key: Math.random(),
                })
              );
              console.error(err);
            })
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            // dispatch({ type: "logout" });
            // setToastState((old : Array<eachToast>) =>
            //   addItemOnce(old.slice(), {
            //     title: "2",
            //     description:
            //       "احراز هویت ما مشکل مواجه شد لطفا مجدد وارد شوید",
            //     key: Math.random(),
            //   })
            // );
            // localStorage.setItem("token_user", JSON.stringify(""));
          }else{
            setToastState((old:Array<eachToast>) =>
              addItemOnce(old.slice(), {
                title: "2",
                description: "سرور دردسترس نیست",
                key: Math.random(),
              })
            );
            console.error(err);
          }
        });
  }, []);

  function updateCredit(level:number){
    updateCreditAPI(level)
    .then((response) => {
      if(response.status === 200){
        history.go(0);
      }
    })
    .catch((err) => {
      setToastState((old : Array<eachToast>) =>
        addItemOnce(old.slice(), {
          title: "2",
          description: "سرور دردسترس نیست",
          key: Math.random(),
        })
      );
    });
  }

  function handleDelete(id : number, source:string){
    setLoading(true);
    deleteAd(String(id), source)
    .then((response) =>{
      if (response.status === 204) {
        setToastState((old : Array<eachToast>) =>
          addItemOnce(old.slice(), {
            title: "2",
            description: "آگهی با موفقیت حذف شد",
            key: Math.random(),
          })
        );
        getmyhomes()
          .then((response) => {
            if (response.status === 200) {
              setMyAds(response.data.data);
              setLoading(false);
            }
          })
          .catch((err) => {
            setToastState((old:Array<eachToast>) =>
              addItemOnce(old.slice(), {
                title: "2",
                description: "سرور دردسترس نیست",
                key: Math.random(),
              })
            );
            console.error(err);
          })
      }
    })
    .catch((err) =>{
      setToastState((old : Array<eachToast>) =>
        addItemOnce(old.slice(), {
          title: "2",
          description: "سرور دردسترس نیست",
          key: Math.random(),
        })
      );
      setLoading(false);
      console.log(err)
    })
  }

  return (
    <div>
      <MobileMenu />
      <HeaderNewShort />
      <TitlePages title="پروفایل" />
      <div
        className={`${themeClass} px-total flex smmin:flex-row sm:flex-col justify-between`}
      >
        <div
          className={`smmin:w-[25%] sm:w-[100%] smmin:my-[50px] sm:my-[20px] py-[35px] sm:px-[8%] smmin:px-[2%] rounded-md border-solid border-[1px] ${themeBorder}`}
        >
          <h4
            className={`${
              showMenu === "information" ? styleSelectedMenu : themeBorder2
            } mb-[20px] pb-[10px] md:text-[12px] mdmin:text-[14px] font-semibold mm:w-[100%] mm:text-center mm:pb-[10px] cursor-pointer mm:border-b-[1px] mm:border-b-solid`}
            onClick={() => setShowMenu("information")}
          >
            اطلاعات
          </h4>
          {/* <h4
            className={`${
              showMenu === "change password" ? styleSelectedMenu : themeBorder2
            } mb-[20px] pb-[10px] md:text-[12px] mdmin:text-[14px] font-semibold mm:w-[100%] mm:text-center mm:pb-[10px] cursor-pointer mm:border-b-[1px] mm:border-b-solid`}
            onClick={() => setShowMenu("change password")}
          >
            تغییر رمز عبور
          </h4> */}
          <h4
            className={`${
              showMenu === "my ads" ? styleSelectedMenu : themeBorder2
            } mb-[20px] pb-[10px] md:text-[12px] mdmin:text-[14px] font-semibold mm:w-[100%] mm:text-center mm:pb-[10px] cursor-pointer mm:border-b-[1px] mm:border-b-solid`}
            onClick={() => setShowMenu("my ads")}
          >
            آگهی‌های من
          </h4>
        </div>
        <div
          className={`sm:w-[100%] smmin:w-[73%] smmin:my-[50px] sm:my-[20px]`}
        >
          {showMenu === "information" && (
            <div
              className={`flex flex-col w-[100%] py-[40px] px-[10%] gap-[20px] rounded-md border-solid border-[1px] ${themeBorder}`}
            >
              {loading && (
                <div className="text-center pt-[15px]">
                  <i
                    className="fa fa-spinner fa-spin text-[50px]"
                    aria-hidden="true"
                  ></i>
                </div>
              )}
              {!loading && (
                <>
                  <div className="mb-[30px]">
                    <label
                      htmlFor="level-input"
                      className="block text-[14px] font-bold mb-[8px]"
                    >
                      سطح حساب
                    </label>
                    <div className="flex justify-between items-center">
                      <input
                        disabled={true}
                        className={`${themeClass} ${themeBorder} max-w-[50%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[14px] }`}
                        placeholder={userInformation? userInformation.level===0? "برنزی":userInformation.level===1? "نقره‌ای":"طلایی":""}
                      />
                      <div className="flex justify-end gap-[20%] w-[45%]">
                        {userInformation && userInformation.level===0 ? <button
                            type="button"
                            className="max-w-[45%] max-h-[50%] py-[6px] px-[2%] rounded-md bg-red text-white font-bold mmmin:text-[12px] mm:text-[8px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
                            onClick={()=>updateCredit(1)}
                          >
                            ارتقا به نقره‌ای
                        </button>:<></>}
                        {userInformation && userInformation.level<2 ? <button
                            type="button"
                            className="max-w-[45%] max-h-[50%] py-[6px] px-[2%] rounded-md bg-red text-white font-bold mmmin:text-[12px] mm:text-[8px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
                            onClick={()=>updateCredit(2)}
                          >
                            ارتقا به طلایی
                        </button>:<></>}
                      </div>
                    </div>
                  </div>
                  <div className="mb-[30px]">
                    <label
                      htmlFor="fullName-input"
                      className="block text-[14px] font-bold mb-[8px]"
                    >
                      نام کامل
                    </label>
                    <input
                      disabled={true}
                      className={`${themeClass} ${themeBorder} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[14px] }`}
                      placeholder={userInformation? userInformation.full_name:""}
                    />
                  </div>
                  <div className="mb-[30px]">
                    <label
                      htmlFor="callNumber-input"
                      className="block text-[14px] font-bold mb-[8px]"
                    >
                      شماره تماس
                    </label>
                    <input
                      disabled={true}
                      className={`${themeClass} ${themeBorder} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[14px] `}
                      placeholder={userInformation? userInformation.phone_number:""}
                    />
                  </div>
                  <div className="mb-[30px]">
                    <label
                      htmlFor="email-input"
                      className="block text-[14px] font-bold mb-[8px]"
                    >
                      ایمیل
                    </label>
                    <input
                      disabled={true}
                      className={`${themeClass} ${themeBorder} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[14px] }`}
                      placeholder={userInformation? userInformation.username:""}
                    />
                  </div>
                  <div className="mb-[30px]">
                    <label
                      htmlFor="address-input"
                      className="block text-[14px] font-bold mb-[8px]"
                    >
                      آدرس
                    </label>
                    <input
                      disabled={true}
                      className={`${themeClass} ${themeBorder} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[14px] }`}
                      placeholder={userInformation? userInformation.address:""}
                    />
                  </div>
                  <div className="mb-[30px]">
                    <label
                      htmlFor="bio-input"
                      className="block text-[14px] font-bold mb-[8px]"
                    >
                      توضیحات
                    </label>
                    <input
                      disabled={true}
                      className={`${themeClass} ${themeBorder} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[14px] }`}
                      placeholder={userInformation? userInformation.bio:""}
                    />
                  </div>
                </>
              )}
            </div>
          )}
          {showMenu === "change password" && (
            <div
              className={`flex flex-col w-[100%] py-[40px] px-[10%] gap-[20px] rounded-md border-solid border-[1px] ${themeBorder}`}
            >
              {loading && (
                <div className="text-center pt-[15px]">
                  <i
                    className="fa fa-spinner fa-spin text-[50px]"
                    aria-hidden="true"
                  ></i>
                </div>
              )}
              {!loading && (
                <form className="text-left" onSubmit={handleSubmit(formSubmit)}>
                  <div className="mb-[30px]">
                    <label
                      htmlFor="passwordCurrent-input"
                      className="block text-[14px] text-right font-bold mb-[8px]"
                    >
                      رمز عبور فعلی
                    </label>
                    <input
                      type="text"
                      className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                        errors.passwordCurrent
                          ? "border-red outline-red"
                          : `${themeBorder}`
                      }`}
                      data-testid="passwordCurrent-input"
                      placeholder="رمز عبور فعلی"
                      id={passwordIdCurrent}
                      {...register("passwordCurrent", {
                        required: "رمز عبور اجباری است...",
                        minLength: {
                          value: 8,
                          message: "رمز عبور حداقل 8 کاراکتر است...",
                        },
                      })}
                    />
                    {errors.passwordCurrent && (
                      <>
                        <div className="text-red text-right pt-[5px]">
                          <span className="pr-[5px]">
                            {errors.passwordCurrent.message}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mb-[30px] relative">
                    <label
                      htmlFor="passwordNew-input"
                      className="block text-[14px] text-right font-bold mb-[8px]"
                    >
                      رمز عبور جدید
                    </label>
                    <input
                      type={passType}
                      className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                        errors.passwordNew
                          ? "border-red outline-red"
                          : `${themeBorder}`
                      }`}
                      data-testid="passwordNew-input"
                      placeholder=" رمز عبور جدید"
                      id={passwordId}
                      {...register("passwordNew", {
                        required: "رمز عبور اجباری است...",
                        minLength: {
                          value: 8,
                          message: "رمز عبور حداقل 8 کاراکتر است...",
                        },
                      })}
                    />
                    {!errors.passwordNew && (
                      <i
                        className={`fa ${iconPassword} absolute left-[2%] bottom-[20px] cursor-pointer`}
                        onClick={handlePassword}
                        aria-hidden="true"
                      ></i>
                    )}
                    {errors.passwordNew && (
                      <>
                        <i
                          className={`fa ${iconPassword} absolute left-[2%] bottom-[48px] cursor-pointer`}
                          onClick={handlePassword}
                          aria-hidden="true"
                        ></i>
                        <div className="text-red text-right pt-[5px]">
                          <i
                            className="fa fa-exclamation-triangle"
                            aria-hidden="true"
                          ></i>
                          <span className="pr-[5px]">
                            {errors.passwordNew.message}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mb-[30px] relative">
                    <label
                      htmlFor="passwordConfirm-input"
                      className="block text-[14px] text-right font-bold mb-[8px]"
                    >
                      تایید رمز عبور
                    </label>
                    <input
                      type="text"
                      className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                        errors.passwordConfirm
                          ? "border-red outline-red"
                          : `${themeBorder}`
                      }`}
                      data-testid="passwordConfirm-input"
                      placeholder="تایید رمز عبور"
                      id={passwordConfirm}
                      {...register("passwordConfirm", {
                        required: "رمز عبور اجباری است...",
                        minLength: {
                          value: 8,
                          message: "رمز عبور حداقل 8 کاراکتر است...",
                        },
                        validate: (val) => {
                          if (
                            (document.getElementById(passwordId) as HTMLInputElement).value !== val
                          ) {
                            return "تایید رمز عبور شما یکسان نیست ...";
                          }
                        },
                      })}
                    />
                    {errors.passwordConfirm && (
                      <>
                        <div className="text-red text-right pt-[5px]">
                          <span className="pr-[5px]">
                            {errors.passwordConfirm.message}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="h-[50px] min-w-[150px] rounded-md bg-red text-white font-bold text-[14px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
                  >
                    تغییر
                  </button>
                </form>
              )}
            </div>
          )}
          {showMenu === "my ads" && (
            <div
              className={`w-[100%] py-[40px] px-[2%] text-center rounded-md border-solid border-[1px] ${themeBorder}`}
            >
              {loading && (
                <div className="text-center pt-[15px]">
                  <i
                    className="fa fa-spinner fa-spin text-[50px]"
                    aria-hidden="true"
                  ></i>
                </div>
              )}
              {!loading && (
                <div
                className={`flex flex-row flex-wrap justify-center w-full gap-[1%]`}>
                  {myAds.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="md:w-[48%] xl:w-[48%] xlmin:w-[32%] flex flex-col justify-between"
                      >
                        <Card item={item} dir='r' />
                        <div className="flex flex-row gap-[3%] justify-center items-center mb-[20px] md:ml-[5px] lg:ml-[10px] lgmin:ml-[20px]">
                          <button
                            type="button"
                            className="min-w-fit w-[100%] py-[5%] rounded-md font-extrabold text-[14px] md:text-[12px] sm:text-[10px] bg-green text-white hover:bg-white hover:outline-green hover:outline hover:outline-[2px] hover:outline-solid hover:text-green"
                            onClick={()=>
                                history.push("/ad-edit/" +
                                String(item.id) + `${item.source==="پیش خونه"? '/pishkhooneh':'/kilid'}`)
                            }
                          >
                            ویرایش
                          </button>
                          <button
                            onClick={()=>{handleDelete(item.id, item.source==="پیش خونه"? 'pishkhooneh':'kilid')}}
                            type="button"
                            className="min-w-fit w-[100%] py-[5%] rounded-md font-extrabold text-[14px] md:text-[12px] sm:text-[10px] bg-red text-white hover:bg-white hover:outline-red hover:outline hover:outline-[2px] hover:outline-solid hover:text-red"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {myAds.length===0? 
                    <div className="flex flex-col gap-3">
                      <img src={Box} alt="" />
                      <div className="flex text-darkGray">آگهی وجود ندارد</div>
                    </div>:<></>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;