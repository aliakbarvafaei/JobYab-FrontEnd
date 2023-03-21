import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { registerAPI } from "../../services/api/index";
import { useHistory } from "react-router-dom";
import { useToast } from "../../contexts/ToastState";
import { eachToast, RegisterInputTypes } from "../../ts/interfaces.js";

const RegisterBox:React.FC = () => {
  const { setToastState } = useToast();
  const history = useHistory();
  const [ loadingReq, setloadingReq ] = useState<boolean>(false);

  const fnameId = useId();
  const callNumberId = useId();
  const emailId = useId();
  const passwordId = useId();
  const addressId = useId();
  const bioId = useId();

  const themeClass = "bg-white";
  const themeBorder = "border-darkModeGray";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputTypes>();
  function addItemOnce(arr : Array<eachToast>, value: eachToast) {
    arr.push(value);
    return arr;
  }
  function formSubmit() {
    // setToastState(old=>addItemOnce(old.slice(),{
    //     title: "3",
    //     description: "", key:Math.random()
    //     }))

    const fname = (document.getElementById(fnameId) as HTMLInputElement).value;
    const callNumber = (document.getElementById(callNumberId) as HTMLInputElement).value;
    const email = (document.getElementById(emailId) as HTMLInputElement).value;
    const password = (document.getElementById(passwordId) as HTMLInputElement).value;
    const address = (document.getElementById(addressId) as HTMLInputElement).value;
    const bio = (document.getElementById(bioId) as HTMLInputElement).value;

    (document.getElementById(fnameId) as HTMLInputElement).value = "";
    (document.getElementById(callNumberId) as HTMLInputElement).value = "";
    (document.getElementById(emailId) as HTMLInputElement).value = "";
    (document.getElementById(passwordId) as HTMLInputElement).value = "";
    (document.getElementById(addressId) as HTMLInputElement).value = "";
    (document.getElementById(bioId) as HTMLInputElement).value = "";
    setloadingReq(true)
    registerAPI(fname, callNumber, email, password, address, bio)
      .then((response) => {
        setloadingReq(false)
        if (response.status === 201) {
          setToastState((old:Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "1",
              description: "ثبت نام با موفقیت انجام شد",
              key: Math.random(),
            })
          );
          history.push(`/activeaccount?emailUser=${email}`);
        }
      })
      .catch((err) => {
        setloadingReq(false)
        if (err.response && err.response.status === 403) {
          setToastState((old:Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "کاربر قبلا ثبت نام کرده است",
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
          console.error(err);
        }
      });
  }
  const [iconPassword, setIconPassword] = useState("fa-eye-slash");
  const [passType, setPassType] = useState("password");
  function handlePassword() {
    setIconPassword((old) =>
      old === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash"
    );
    setPassType((old) => (old === "password" ? "text" : "password"));
  }

  return (
    <>
      <div className={`${themeClass} py-[40px] px-total`}>
        <div className="w-[100%] pt-[10px]">
          <h3 className="text-[24px] font-bold mb-[20px]">ایجاد حساب کاربری</h3>
          <div
            className={`${themeBorder} min-h-[336px] p-[30px] border-[1px] border-solid`}
          >
            <form
              className="text-left flex flex-row flex-wrap justify-between"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="mb-[30px] md:w-[100%] mdmin:w-[48%]">
                <label
                  htmlFor="fname-input"
                  className="block text-[14px] text-right font-bold mb-[8px]"
                >
                  نام کامل
                </label>
                <input
                  type="text"
                  className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                    errors.fname ? "border-red outline-red" : `${themeBorder}`
                  }`}
                  data-testid="fname-input"
                  placeholder="نام کامل"
                  id={fnameId}
                  {...register("fname", {
                    required: "نام کامل اجباری است...",
                  })}
                />
                {errors.fname && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.fname.message}</span>
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
              <div className="mb-[30px] md:w-[100%] mdmin:w-[48%]">
                <label
                  htmlFor="email-input"
                  className="block text-[14px] text-right font-bold mb-[8px]"
                >
                  ایمیل
                </label>
                <input
                  type="email"
                  className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                    errors.email ? "border-red outline-red" : `${themeBorder}`
                  }`}
                  data-testid="email-input"
                  placeholder="ایمیل"
                  id={emailId}
                  {...register("email", {
                    required: "ایمیل اجباری است...",
                  })}
                />
                {errors.email && (
                  <div className="text-red text-right pt-[5px]">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                    <span className="pr-[5px]">{errors.email.message}</span>
                  </div>
                )}
              </div>
              <div className="mb-[30px] md:w-[100%] mdmin:w-[48%] relative">
                <label
                  htmlFor="password-input"
                  className="block text-[14px] text-right font-bold mb-[8px]"
                >
                  رمز عبور
                </label>
                <input
                  type={passType}
                  className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                    errors.password
                      ? "border-red outline-red"
                      : `${themeBorder}`
                  }`}
                  data-testid="password-input"
                  placeholder="رمز عبور"
                  id={passwordId}
                  {...register("password", {
                    required: "رمز عبور اجباری است...",
                    minLength: {
                      value: 8,
                      message: "رمز عبور حداقل 8 کاراکتر است...",
                    },
                  })}
                />
                {!errors.password && (
                  <i
                    className={`fa ${iconPassword} absolute left-[2%] bottom-[20px] cursor-pointer`}
                    onClick={handlePassword}
                    aria-hidden="true"
                  ></i>
                )}
                {errors.password && (
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
                        {errors.password.message}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="mb-[30px] md:w-[100%] mdmin:w-[48%] relative">
                <label
                  htmlFor="address-input"
                  className="block text-[14px] text-right font-bold mb-[8px]"
                >
                  آدرس (اختیاری)
                </label>
                <input
                  type="text"
                  className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                    errors.address
                      ? "border-red outline-red"
                      : `${themeBorder}`
                  }`}
                  data-testid="address-input"
                  placeholder="آدرس"
                  id={addressId}
                />
              </div>
              <div className="mb-[30px] md:w-[100%] mdmin:w-[48%] relative">
                <label
                  htmlFor="bio-input"
                  className="block text-[14px] text-right font-bold mb-[8px]"
                >
                  توضیحات (اختیاری)
                </label>
                <input
                  type="text"
                  className={`${themeClass} w-[100%] rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                    errors.bio
                      ? "border-red outline-red"
                      : `${themeBorder}`
                  }`}
                  data-testid="bio-input"
                  placeholder="توضیحات"
                  id={bioId}
                />
              </div>
              
              <div className="w-[100%] flex flex-row gap-[10px] smmin:justify-start sm:justify-center">
                <button
                  type="submit"
                  className="min-w-fit py-[1%] px-[5%] rounded-md bg-red text-white font-bold mmmin:text-[14px] mm:text-[10px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
                >
                  {loadingReq? <i
                    className="fa fa-spinner fa-spin text-[50px]"
                    aria-hidden="true"
                  ></i>:"ثبت نام"}
                </button>
                <button
                  type="button"
                  onClick={()=>{
                    history.push('/activeaccount?emailUser=')
                  }}
                  className="min-w-fit py-[1%] px-[5%] rounded-md bg-red text-white font-bold mmmin:text-[14px] mm:text-[10px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
                >
                  فعال‌سازی
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterBox;
