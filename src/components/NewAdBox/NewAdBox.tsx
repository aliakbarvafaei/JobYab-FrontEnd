import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { NewAdAPI } from "../../services/api/index";
import { useHistory } from "react-router-dom";
import { useToast } from "../../contexts/ToastState";
import { eachToast, NewAdInputTypes } from "../../ts/interfaces.js";
import { convertorPrice } from "../../ts/functions";
import Map from "../Map/Map";
const regions = ['شهرک مدرس','زمانی','جوادیه','حق گویان','مهدیه','18 متری شکریه','شکریه', 'هنرستان', 'کمال آباد', 'کمال آباد شرقی', 'سعیدیه پایین','رکنی', 'جهان نما', 'بلوار بعثت','سعیدیه بالا',  'ادیب',  'میلاد استادان', 'قهرمان استادان', 'تربیت استادان','بلوار شهرداری',  'استادان', 'پردیس', 'بلوار عمار',  'پرستار','کوچه مشکی', 'خ طالقانی',  'فرهنگ', 'نواب','گلزار',  'شهناز', 'میلادکوچه مشکی','متخصصین', 'مدیریت', 'آزاد غربی', 'اعتمادیه غربی', 'اعتمادیه شرقی', 'بلوار مدنی', 'بلوار دانشگاه', 'بلوار ارم', 'بلوار خرم رودی', 'بلوار رنجبران', 'بلوار صورتی', 'بلوار فاطمیه', 'بلوار کاج', 'بوعلی بالا','پاستور', 'ذوالفقار', 'عارف', 'خواجه رشید','میرزاده عشقی', 'مصیب مجیدی', 'بین النهرین', 'کولانج', 'تختی', 'فرهنگیان','ذوالریاستین', 'حیدره', 'جانبازان', 'شریعتی', 'دره مرادبیگ', 'آرام شرقی',  'بوعلی پایین', 'خیابان پاسداران -کرمانشاه']

const NewAdBox:React.FC = () => {
  const [ loadingReq, setloadingReq ] = useState<boolean>(false);
  const [ location_x, setlocation_x ] = useState(35.692997228);
  const [ location_y, setlocation_y ] = useState(51.335998656);
  const { setToastState } = useToast();
  const [ price, setPrice ] = useState<null | number>(null);
  const [ imagesFile, setImagesFile ] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<Array<any>>([])

  const history = useHistory();
  
  const categoryId = useId();
  const typeId = useId();
  const statusId = useId();
  const cityId = useId();
  const regionId = useId();
  const neighborId = useId();
  const roomId = useId();
  const yearId = useId();
  const elevatorId = useId();
  const parkingId = useId();
  const lobbyId = useId();
  const sports_hallId = useId();
  const guardId = useId();
  const swimming_poolId = useId();
  const balconyId = useId();
  const roof_gardenId = useId();
  const remote_doorId = useId();
  const meterageId = useId();
  const priceId = useId();
  const photoId = useId();
  const titleId = useId();
  const callNumberId = useId();
  const bioId = useId();

  const themeClass = "bg-white";
  const themeBorder = "border-darkModeGray";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAdInputTypes>();

  const priceInput = register("price", {
    required: "قیمت اجباری است...",
  })

  function addItemOnce(arr : Array<eachToast>, value: eachToast) {
    arr.push(value);
    return arr;
  }
  function handleLocation(x:number,y:number){
    setlocation_x(y);
    setlocation_y(x);
  }
  function handlePrice(){
    setPrice(parseInt((document.getElementById(priceId) as HTMLInputElement).value));
  }
  function handleFile(e : React.MouseEvent) {
    if(((document.getElementById(photoId) as HTMLInputElement).files)?.length as number > 4){
      setToastState((old:Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "تعداد عکس‌های مجاز 4 تا است",
              key: Math.random(),
            })
          );
          (document.getElementById(photoId) as HTMLInputElement).value = "";
          setImagesFile(null);
          setPreview([]);      
    }
    else{
      setImagesFile((document.getElementById(photoId) as HTMLInputElement).files);
    }
  }

  function formSubmit() {
    // setToastState(old=>addItemOnce(old.slice(),{
    //     title: "3",
    //     description: "", key:Math.random()
    //     }))
    const creatorInput = (document.getElementsByName('creator') as any);
    var creator;
    for(var i = 0; i < creatorInput.length; i++) {
      if(creatorInput[i].checked)
      {
        creator = (creatorInput[i].value)
        creatorInput[i].checked = false;
        break ;
      }
    }
    const warehouseInput = (document.getElementsByName('warehouse') as any);
    var warehouse = false;
    for(i = 0; i < warehouseInput.length; i++) {
      if(warehouseInput[i].checked)
      {
        warehouse = (warehouseInput[i].value==="1" ? true:false);
        warehouseInput[i].checked = false;
        break ;
      }
    }
    const category = (document.getElementById(categoryId) as HTMLInputElement).value;
    const type = (document.getElementById(typeId) as HTMLInputElement).value;
    const city = (document.getElementById(cityId) as HTMLInputElement).value;
    const status = (document.getElementById(statusId) as HTMLInputElement).value;
    const region = parseInt((document.getElementById(regionId) as HTMLInputElement).value);
    const neighbor = (document.getElementById(neighborId) as HTMLInputElement).value;
    const room = parseInt((document.getElementById(roomId) as HTMLInputElement).value);
    const year = parseInt((document.getElementById(yearId) as HTMLInputElement).value);
    const elevator = (document.getElementById(elevatorId) as HTMLInputElement).value==="1" ? true:false;
    const parking = (document.getElementById(parkingId) as HTMLInputElement).value==="1" ? true:false;
    const lobby = (document.getElementById(lobbyId) as HTMLInputElement).value==="1" ? true:false;
    const sports_hall = (document.getElementById(sports_hallId) as HTMLInputElement).value==="1" ? true:false;
    const guard = (document.getElementById(guardId) as HTMLInputElement).value==="1" ? true:false;
    const swimming_pool = (document.getElementById(swimming_poolId) as HTMLInputElement).value==="1" ? true:false;
    const balcony = (document.getElementById(balconyId) as HTMLInputElement).value==="1" ? true:false;
    const roof_garden = (document.getElementById(roof_gardenId) as HTMLInputElement).value==="1" ? true:false;
    const remote_door = (document.getElementById(remote_doorId) as HTMLInputElement).value==="1" ? true:false;
    const meterage = parseInt((document.getElementById(meterageId) as HTMLInputElement).value);
    const price = parseInt((document.getElementById(priceId) as HTMLInputElement).value);
    // const photo = {...imagesFile as FileList};
    var main_image = "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg";
    var image_1 = "";
    var image_2 = "";
    var image_3 = "";
    if(preview.length>0){
      main_image = (preview[0] as string);
      if(preview.length>1){
        image_1 = (preview[1] as string);
        if(preview.length>2){
          image_2 = (preview[2] as string);
          if(preview.length>3){
            image_3 = (preview[3] as string);
          }
        }
      }
    }
    setImagesFile(null);
    setPreview([]);
    const title = (document.getElementById(titleId) as HTMLInputElement).value;
    const callNumber = (document.getElementById(callNumberId) as HTMLInputElement).value;
    const bio = (document.getElementById(bioId) as HTMLInputElement).value;

    (document.getElementById(categoryId) as HTMLInputElement).value = "";
    (document.getElementById(statusId) as HTMLInputElement).value = "فروشی";
    (document.getElementById(typeId) as HTMLInputElement).value = "";
    (document.getElementById(cityId) as HTMLInputElement).value = "تهران";
    (document.getElementById(regionId) as HTMLInputElement).value = "";
    (document.getElementById(neighborId) as HTMLInputElement).value = "";
    (document.getElementById(roomId) as HTMLInputElement).value = "";
    (document.getElementById(yearId) as HTMLInputElement).value = "";
    (document.getElementById(elevatorId) as HTMLInputElement).value = "";
    (document.getElementById(parkingId) as HTMLInputElement).value = "";
    (document.getElementById(lobbyId) as HTMLInputElement).value = "";
    (document.getElementById(sports_hallId) as HTMLInputElement).value = "";
    (document.getElementById(guardId) as HTMLInputElement).value = "";
    (document.getElementById(swimming_poolId) as HTMLInputElement).value = "";
    (document.getElementById(balconyId) as HTMLInputElement).value = "";
    (document.getElementById(roof_gardenId) as HTMLInputElement).value = "";
    (document.getElementById(remote_doorId) as HTMLInputElement).value = "";
    (document.getElementById(meterageId) as HTMLInputElement).value = "";
    (document.getElementById(priceId) as HTMLInputElement).value = "";
    setPrice(null);
    (document.getElementById(photoId) as HTMLInputElement).value = "";
    (document.getElementById(titleId) as HTMLInputElement).value = "";
    (document.getElementById(callNumberId) as HTMLInputElement).value = "";
    (document.getElementById(bioId) as HTMLInputElement).value = "";
    const value : string | null = localStorage.getItem("token_user");
    setloadingReq(true)
    NewAdAPI(JSON.parse(value as string), category, type, status, city, region, neighbor, room, year, elevator, parking, lobby, sports_hall, guard, swimming_pool, balcony, roof_garden, remote_door, meterage, price, main_image, image_1, image_2, image_3, title, callNumber, bio, creator, warehouse, location_x, location_y)
      .then((response) => {
        setloadingReq(false)
        if (response.status === 201) {
          setToastState((old:Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "1",
              description: "آگهی با موفقیت اضافه شد",
              key: Math.random(),
            })
          );
          history.push("/home");
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      })
      .catch((err) => {
        setloadingReq(false)
          if (err.response.status === 401) {
            setToastState((old:Array<eachToast>) =>
              addItemOnce(old.slice(), {
                title: "2",
                description: "تعداد آگهی‌های مجاز شما به اتمام رسیده است",
                key: Math.random(),
              })
            );
          }
          else{
            setToastState((old:Array<eachToast>) =>
              addItemOnce(old.slice(), {
                title: "2",
                description: "سرور دردسترس نیست",
                key: Math.random(),
              })
            );
          }
          console.error(err);
      });
      // history.go(0);
  }
  function getBase64 (file:any) {
    return new Promise(resolve => {
      let baseURL:any = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {

        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  useEffect(() => {
    if (!imagesFile || imagesFile.length===0) {
        setPreview([])
        return
    }

    for(var i=0;i<imagesFile.length;i++){
      // const objectUrl = URL.createObjectURL(imagesFile[i])
      getBase64(imagesFile[i])
      .then(result => {
        setPreview(old => [...old,result])
      })
      .catch(err => {
        console.log(err);
      });
    }

  }, [imagesFile])

  return (
    <>
      <div className={`${themeClass} py-[40px] px-total`}>
        <div className="w-[100%] pt-[10px]">
          <h3 className="text-[24px] font-bold mb-[20px]">ایجاد آگهی جدید</h3>
          <div
            className={`${themeBorder} min-h-[336px] p-[30px] border-[1px] border-solid`}
          >
            <form
              className="text-left flex flex-row flex-wrap justify-between gap-[10px]"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center justify-between">
                    <label htmlFor="category-select" className="inline text-[14px] text-right font-bold" >دسته‌بندی : </label>
                    <select data-testid="category-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.category ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={categoryId}
                    {...register("category", {
                        required: "دسته‌بندی اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="آپارتمان">آپارتمان</option>
                        <option value="ویلا">ویلا</option>
                        <option value="باغ">باغ</option>
                    </select>
                </span>
                {errors.category && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.category.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center justify-between">
                    <label htmlFor="type-select" className="inline text-[14px] text-right font-bold" >نوع : </label>
                    <select data-testid="type-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.type ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={typeId}
                    {...register("type", {
                        required: "نوع اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="مسکونی">مسکونی</option>
                        <option value="تجاری">تجاری</option>
                    </select>
                </span>
                {errors.type && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.type.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center justify-between">
                    <label htmlFor="status-select" className="inline text-[14px] text-right font-bold" >وضعیت : </label>
                    <select data-testid="status-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.status ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={statusId}
                    {...register("status", {
                        required: "وضعیت اجباری است...",
                    })}
                    >
                        <option value="فروشی">فروشی</option>
                    </select>
                </span>
                {errors.status && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.status.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="city-select" className="inline text-[14px] text-right font-bold" >شهر : </label>
                    <select data-testid="city-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.city ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={cityId}
                    {...register("city", {
                        required: "شهر اجباری است...",
                    })}
                    >
                        <option value="تهران">تهران</option>
                    </select>
                </span>
                {errors.city && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.city.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="region-select" className="inline text-[14px] text-right font-bold" >منطقه : </label>
                    <select data-testid="region-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.region ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={regionId}
                    {...register("region", {
                        required: "منطقه اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="1">منطقه1</option>
                        <option value="2">منطقه2</option>
                        <option value="3">منطقه3</option>
                        <option value="4">منطقه4</option>
                        <option value="5">منطقه5</option>
                        <option value="6">منطقه6</option>
                        <option value="7">منطقه7</option>
                        <option value="8">منطقه8</option>
                    </select>
                </span>
                {errors.region && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.region.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="neighbor-select" className="inline text-[14px] text-right font-bold" >محله : </label>
                    <select data-testid="neighbor-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.neighbor ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={neighborId}
                    {...register("neighbor", {
                        required: "محله اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        {
                          regions.map((item,i)=>{
                            return <option value={item} key={i}>{item}</option>
                          })
                        }
                    </select>
                </span>
                {errors.neighbor && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.neighbor.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="room-select" className="inline text-[14px] text-right font-bold" >تعداد اتاق : </label>
                    <select data-testid="room-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.room ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={roomId}
                    {...register("room", {
                        required: "اتاق اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">بدون اتاق</option>
                        <option value="1">یک</option>
                        <option value="2">دو</option>
                        <option value="3">سه</option>
                        <option value="4">چهار</option>
                        <option value="5">پبنج</option>
                        <option value="6">شش</option>
                        <option value="7">هفت</option>
                    </select>
                </span>
                {errors.room && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.room.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center justify-between">
                    <label htmlFor="year-select" className="inline text-[14px] text-right font-bold" >سن بنا : </label>
                    <input type='number' min={0} placeholder="سن" data-testid="year-select" className={`${themeClass} w-[70%] px-[4%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.year ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={yearId}
                    {...register("year", {
                        required: "سن بنا ساخت اجباری است...",
                    })}
                    />
                </span>
                {errors.year && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.year.message}</span>
                  </div>
                )}
              </div>
              {/* <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="floor-select" className="inline text-[14px] text-right font-bold" >طبقه : </label>
                    <select data-testid="floor-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.floor ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={floorId}
                    {...register("floor", {
                        required: "طبقه اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="همکف">همکف</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </span>
                {errors.floor && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.floor.message}</span>
                  </div>
                )}
              </div> */}
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="elevator-select" className="inline text-[14px] text-right font-bold" >آسانسور : </label>
                    <select data-testid="elevator-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.elevator ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={elevatorId}
                    {...register("elevator", {
                        required: "آسانسور اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">ندارد</option>
                        <option value="1">دارد</option>
                    </select>
                </span>
                {errors.elevator && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.elevator.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="parking-select" className="inline text-[14px] text-right font-bold" >پارکینگ : </label>
                    <select data-testid="parking-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.parking ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={parkingId}
                    {...register("parking", {
                        required: "پارکینگ اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">ندارد</option>
                        <option value="1">دارد</option>
                    </select>
                </span>
                {errors.parking && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.parking.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="lobby-select" className="inline text-[14px] text-right font-bold" >لابی : </label>
                    <select data-testid="lobby-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.lobby ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={lobbyId}
                    {...register("lobby", {
                        required: "لابی اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">ندارد</option>
                        <option value="1">دارد</option>
                    </select>
                </span>
                {errors.lobby && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.lobby.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="sports_hall-select" className="inline text-[14px] text-right font-bold" >سالن ورزشی : </label>
                    <select data-testid="sports_hall-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.sports_hall ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={sports_hallId}
                    {...register("sports_hall", {
                        required: "سالن ورزشی اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">ندارد</option>
                        <option value="1">دارد</option>
                    </select>
                </span>
                {errors.sports_hall && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.sports_hall.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="guard-select" className="inline text-[14px] text-right font-bold" >نگهبانی : </label>
                    <select data-testid="guard-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.guard ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={guardId}
                    {...register("guard", {
                        required: "نگهبانی اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">ندارد</option>
                        <option value="1">دارد</option>
                    </select>
                </span>
                {errors.guard && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.guard.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="swimming_pool-select" className="inline text-[14px] text-right font-bold" >استخر : </label>
                    <select data-testid="swimming_pool-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.swimming_pool ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={swimming_poolId}
                    {...register("swimming_pool", {
                        required: "استخر اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">ندارد</option>
                        <option value="1">دارد</option>
                    </select>
                </span>
                {errors.swimming_pool && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.swimming_pool.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="balcony-select" className="inline text-[14px] text-right font-bold" >بالکن : </label>
                    <select data-testid="balcony-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.balcony ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={balconyId}
                    {...register("balcony", {
                        required: "بالکن اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">ندارد</option>
                        <option value="1">دارد</option>
                    </select>
                </span>
                {errors.balcony && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.balcony.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="roof_garden-select" className="inline text-[14px] text-right font-bold" >روف گاردن : </label>
                    <select data-testid="roof_garden-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.roof_garden ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={roof_gardenId}
                    {...register("roof_garden", {
                        required: "روف گاردن اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">ندارد</option>
                        <option value="1">دارد</option>
                    </select>
                </span>
                {errors.roof_garden && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.roof_garden.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] md:w-[45%] mdmin:w-[30%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center  justify-between">
                    <label htmlFor="remote_door-select" className="inline text-[14px] text-right font-bold" >در برقی : </label>
                    <select data-testid="remote_door-select" className={`${themeClass} w-[70%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.remote_door ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={remote_doorId}
                    {...register("remote_door", {
                        required: "در برقی اجباری است...",
                    })}
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="0">ندارد</option>
                        <option value="1">دارد</option>
                    </select>
                </span>
                {errors.remote_door && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.remote_door.message}</span>
                  </div>
                )}
              </div>
              <div className="w-[100%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center">
                    <legend className="inline text-[14px] text-right font-bold">آگهی دهنده : </legend>

                    <div className="flex justify-center items-center gap-[5px]">
                    <input type="radio" {...register("creator",{
                        required: "ارائه دهنده اجباری است...",
                    })} id="person" name="creator" value="شخصی"
                             />
                    <label htmlFor="person" className="text-[12px]">شخصی</label>
                    </div>

                    <div className="flex justify-center items-center gap-[5px]">
                    <input type="radio" {...register("creator",{
                        required: "ارائه دهنده اجباری است...",
                    })} id="shop" name="creator" value="املاک" />
                    <label htmlFor="shop" className="text-[12px]">مشاور املاک</label>
                    </div>
                </span>
                {errors.creator && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.creator.message}</span>
                  </div>
                )}
              </div>
              <div className="w-[100%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center">
                    <legend className="inline text-[14px] text-right font-bold">انباری : </legend>

                    <div className="flex justify-center items-center gap-[5px]">
                    <input type="radio" {...register("warehouse",{
                        required: " انباری اجباری است...",
                    })} id="دارد" name="warehouse" value="1"
                             />
                    <label htmlFor="دارد" className="text-[12px]">دارد</label>
                    </div>

                    <div className="flex justify-center items-center gap-[5px]">
                    <input type="radio" {...register("warehouse",{
                        required: " انباری اجباری است...",
                    })} id="دارد" name="warehouse" value="0" />
                    <label htmlFor="ندارد" className="text-[12px]">ندارد</label>
                    </div>
                </span>
                {errors.warehouse && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.warehouse.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] smmin:w-[45%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center">
                    <label htmlFor="meterage-select" className="inline text-[14px] text-right font-bold" >متراژ : </label>
                    <input type='number' min={0} placeholder="متر مربع" data-testid="meterage-select" className={`${themeClass} w-[70%] px-[4%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.meterage ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={meterageId}
                    {...register("meterage", {
                        required: "متراژ اجباری است...",
                    })}
                    />
                </span>
                {errors.meterage && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.meterage.message}</span>
                  </div>
                )}
              </div>
              <div className="sm:w-[100%] smmin:w-[45%] text-right flex flex-col gap-[1%] mb-[30px]">
                <span className="flex flex-row gap-[1%] items-center">
                    <label htmlFor="price-select" className="inline text-[14px] text-right font-bold" >قیمت : </label>
                    <input type='number' min={0} {...priceInput} onChange={(e) => {
                          priceInput.onChange(e);
                          handlePrice();
                      }}  
                      value={price as number} placeholder="تومان" data-testid="meterage-select" className={`${themeClass} w-[70%] px-[4%] rounded-md border-solid border-[1px] outline-darkGray py-[0.5%] pl-[2%] text-[12px] ${
                        errors.price ? "border-red outline-red" : `${themeBorder}`
                    }`}
                    id={priceId}
                    
                    />
                </span>
                {!errors.price && price && (
                  <div className="text-darkGray sm:text-sm text-right pt-[5px]">
                    <span>{convertorPrice(price)[1]}</span>
                    <span>{convertorPrice(price)[0]}</span>
                  </div>
                )}
                {errors.price && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.price.message}</span>
                  </div>
                )}
              </div>
              <div className="mb-[30px] md:w-[100%] mdmin:w-[48%]">
                <label
                  htmlFor="title-input"
                  className="block text-[14px] text-right font-bold mb-[8px]"
                >
                  عنوان
                </label>
                <input
                  type="text"
                  className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                    errors.title ? "border-red outline-red" : `${themeBorder}`
                  }`}
                  data-testid="title-input"
                  placeholder="عنوان"
                  id={titleId}
                  {...register("title", {
                    required: "عنوان اجباری است...",
                  })}
                />
                {errors.title && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.title.message}</span>
                  </div>
                )}
              </div>
              <div className="mb-[30px] md:w-[100%] mdmin:w-[48%]">
                <label
                  htmlFor="callNumber-input"
                  className="block text-[14px] text-right font-bold mb-[8px]"
                >
                  شماره تماس
                </label>
                <input
                  type="text"
                  className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                    errors.callNumber ? "border-red outline-red" : `${themeBorder}`
                  }`}
                  data-testid="callNumber-input"
                  placeholder="شماره تماس"
                  id={callNumberId}
                  {...register("callNumber", {
                    required: "شماره تماس اجباری است...",
                  })}
                />
                {errors.callNumber && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.callNumber.message}</span>
                  </div>
                )}
              </div>
              <div className="mb-[30px] w-[100%] text-right">
                <label
                  htmlFor="photo-input"
                  className="block text-[14px] text-right font-bold mb-[8px]"
                >
                  عکس
                </label>
                <div className={` border-solid border-[1px] ${themeBorder}`}>
                  <input
                    type="file"
                    className={`${themeClass} mdmin:w-[20%] md:w-[100%] rounded-none py-[17px] px-[15px] text-[12px]`}
                    data-testid="photo-input"
                    multiple
                    onChange={handleFile as any}
                    id={photoId}/>
                  <div className={`flex flex-row flex-wrap gap-[5px] mt-[10px] px-[3%] pb-[3%] `}>
                    {
                      preview.map((item)=>{
                        return <img src={item} alt="" className="w-[200px]" />
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="mb-[30px] w-[100%] text-right">
                <label
                  htmlFor="bio-input"
                  className="block text-[14px] text-right font-bold mb-[8px]"
                >
                  توضیحات
                </label>
                <textarea
                  className={`${themeClass} mdmin:w-[50%] md:w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                    errors.bio
                      ? "border-red outline-red"
                      : `${themeBorder}`
                  }`}
                  data-testid="bio-input"
                  placeholder="توضیحات"
                  id={bioId}
                  cols={30} rows={10} ></textarea>
              </div>
              
              <div className="flex lg:flex-col lgmin:flex-row lgmin:justify-between items-center lg:justify-center w-full my-[30px] gap-[30px]">
                <Map x={location_x} y={location_y} handleLocation={handleLocation}/>
              </div>

              <button
                type="submit"
                className="min-w-fill px-[4%] py-[1%] rounded-md bg-red text-white font-bold text-[14px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
              >
                {loadingReq? <i
                        className="fa fa-spinner fa-spin text-[50px]"
                        aria-hidden="true"
                    ></i>:"ایجاد"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewAdBox;
