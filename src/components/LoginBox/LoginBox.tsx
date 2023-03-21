import React, { useEffect, useId, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "../../contexts/ToastState";
import { loginAPI } from "../../services/api/index";
import { useDispatch } from "react-redux";
import { eachToast, LoginInputTypes } from "../../ts/interfaces";

const LoginBox:React.FC = () => {
  const [ loadingReq, setloadingReq ] = useState<boolean>(false);
  const { setToastState } = useToast();
  const dispatch = useDispatch();
  const history = useHistory();

  const themeClass : string= "bg-white";
  const themeBorder : string= "border-darkModeGray";

  const emailId = useId();
  const passwordId = useId();
  function addItemOnce(arr: Array<eachToast>, value: eachToast) {
    arr.push(value);
    return arr;
  }
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  useEffect(() => {
    dispatch({ type: "logout" });
    try {
      localStorage.setItem("token_user", JSON.stringify(""));
    } catch (e) {
      console.error({ e });
    }
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputTypes>();

  function handleCreate() {
    history.push("/register");
  }

  function formSubmit() {
    // setToastState(old=>addItemOnce(old.slice(),{
    //     title: "3",
    //     description: "",
    //     key:Math.random()
    //     }))

    const email = (document.getElementById(emailId) as HTMLInputElement).value;
    const password = (document.getElementById(passwordId) as HTMLInputElement).value;

    (document.getElementById(emailId) as HTMLInputElement).value = "";
    (document.getElementById(passwordId) as HTMLInputElement).value = "";
    setloadingReq(true);
    loginAPI(email, password)
      .then((response) => {
        setloadingReq(false)
        if (response.status === 200) {
          setToastState((old:Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "1",
              description: `خوش آمدید`,
              key: Math.random(),
            })
          );
          dispatch({
            type: "login",
            payload: [email, response.data.token],
          });
          try {
            localStorage.setItem(
              "token_user",
              JSON.stringify(response.data.token)
            );
          } catch (e) {
            console.error({ e });
          }
          history.push("/home");
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      })
      .catch((err) => {
        setloadingReq(false)
        if (err.response && err.response.status === 401) {
          setToastState((old : Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "حساب کاربری فعال نشده است",
              key: Math.random(),
            })
          );
        } else if (err.response && err.response.status === 403) {
          setToastState((old : Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "رمز عبور نادرست است",
              key: Math.random(),
            })
          );
        } else if (err.response && err.response.status === 404) {
          setToastState((old : Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "کاربر یافت نشد. ابتدا ثبت نام کنید",
              key: Math.random(),
            })
          );
        } else {
          console.error(err);
          setToastState((old : Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "سرور دردسترس نیست",
              key: Math.random(),
            })
          );
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
    <div
      className={`${themeClass} py-[40px] px-total flex flex-row flex-wrap justify-between`}
    >
      <div className="lg:w-[100%] lgmin:w-[48%] pt-[10px]">
        <h3 className="text-[24px] font-bold mb-[20px]">ورود</h3>
        <div
          className={`${themeBorder} min-h-[336px] p-[30px] border-[1px] border-solid`}
        >
          <form className="text-left" onSubmit={handleSubmit(formSubmit)}>
            <div className="mb-[30px]">
              <label
                htmlFor="email-input"
                className="text-right block text-[14px] font-bold mb-[8px]"
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
            <div className="mb-[30px] relative">
              <label
                htmlFor="password-input"
                className="text-right block text-[14px] font-bold mb-[8px]"
              >
                رمز عبور
              </label>
              <input
                type={passType}
                className={`${themeClass} w-[100%] relative rounded-none border-solid border-[1px] outline-darkGray py-[17px] px-[25px] text-[12px] ${
                  errors.password ? "border-red outline-red" : `${themeBorder}`
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
                    <span className="pr-[5px]">{errors.password.message}</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="w-[100%] flex flex-row gap-[10px] smmin:justify-end sm:justify-center">
              <button
                type="submit"
                className="min-w-fit py-[3%] px-[10%] rounded-md bg-red text-white font-bold mmmin:text-[14px] mm:text-[10px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
              >
                {loadingReq? <i
                        className="fa fa-spinner fa-spin text-[50px]"
                        aria-hidden="true"
                    ></i>:"ورود"}
              </button>
              <button
                type="button"
                onClick={()=>{
                  history.push('/activeaccount?emailUser=')
                }}
                className="min-w-fit py-[3%] px-[6%] rounded-md bg-red text-white font-bold mmmin:text-[14px] mm:text-[10px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
              >
                فعال‌سازی
              </button>
            </div>
            <div className="text-red text-[12px] cursor-pointer mt-[5px]" onClick={()=>{
              history.push('/forgetpassword')
            }}>فراموشی رمز عبور</div>
          </form>
        </div>
      </div>
      <div className="lg:w-[100%] lgmin:w-[48%] pt-[10px]">
        <h3 className="text-[24px] font-bold mb-[20px]">ثبت نام</h3>
        <div
          className={`${themeBorder} lgmin:min-h-[336px] p-[30px] border-[1px] border-solid`}
        >
          <h4 className="text-[14px] font-bold mb-[22px]">ایجاد حساب کاربری</h4>
          <p className="bg-inherit p-0 text-[14px] text-darkGray leading-[26px] mb-[30px]">
          برای یک حساب کاربری رایگان در پیش‌خونه ثبت نام کنید. ثبت نام سریع و
              آسان این امکان را به شما می دهد تا بتوانید از سایت ما استفاده کنید. برای شزوع کلید کنید.
          </p>
          <button
            type="button"
            onClick={handleCreate}
            className="min-w-fit py-[3%] px-[3%] rounded-md bg-red text-white font-bold text-[14px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
          >
            ایجاد حساب کاربری
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginBox;