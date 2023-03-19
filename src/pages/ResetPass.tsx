import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import HeaderNewShort from '../components/HeaderNew/HeaderNewShort';
import TitlePages from '../components/TitlePages/TitlePages';
import { useToast } from '../contexts/ToastState';
import { sendEmailForgetPassAPI } from '../services/api';
import { ActivateInputTypes, eachToast } from '../ts/interfaces';

const ResetPass:React.FC = ()=> {
    const [ loadingReq, setloadingReq ] = useState<boolean>(false);

    const { setToastState } = useToast();

    const themeClass = "bg-white";
    const themeBorder = "border-darkModeGray";

    const history = useHistory();
    const emailId = useId();
    function addItemOnce(arr : Array<eachToast>, value: eachToast) {
        arr.push(value);
        return arr;
      }
      
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ActivateInputTypes>();

    function formSubmit() {
        // setToastState(old=>addItemOnce(old.slice(),{
        //     title: "3",
        //     description: "", key:Math.random()
        //     }))
    
        const email = (document.getElementById(emailId) as HTMLInputElement).value;
        setloadingReq(true)
        sendEmailForgetPassAPI(email)
        .then((response) => {
            setloadingReq(false)
            if (response.status === 200) {
                (document.getElementById(emailId) as HTMLInputElement).disabled = true;
                setToastState((old:Array<eachToast>) =>
                addItemOnce(old.slice(), {
                title: "1",
                description: "ایمیل بازیابی رمز با موفقیت ارسال شد",
                key: Math.random(),
                })
            );
            history.push('/forgetpassword2')
            }
        })
        .catch((err) => {
            setloadingReq(false)
            if (err.response && err.response.status === 404) {
                setToastState((old:Array<eachToast>) =>
                addItemOnce(old.slice(), {
                    title: "2",
                    description: 'نام کاربری وارد شده یافت نشد',
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
    
    return <div>
        <HeaderNewShort />
        <TitlePages title="بازیابی رمز" />
        <div className={`${themeClass} py-[40px] px-total`}>
            <div className="w-[100%] pt-[10px]">
                <h3 className="text-[24px] font-bold mb-[20px]">فراموشی رمزعبور</h3>
                <div
                    className={`${themeBorder} min-h-[336px] p-[30px] border-[1px] border-solid`}
                >
                    <form
                    className="text-left flex flex-row flex-wrap justify-between"
                    onSubmit={handleSubmit(formSubmit)}
                    >
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
                        <div className="w-[100%] text-right sm:text-center">
                            <button
                            type="submit"
                            className="min-w-fill px-[4%] py-[1%] rounded-md bg-red text-white font-bold text-[14px] hover:bg-white hover:border-red hover:border-[2px] hover:border-solid hover:text-black"
                            >
                            {loadingReq? <i
                                className="fa fa-spinner fa-spin text-[50px]"
                                aria-hidden="true"
                            ></i>:"ارسال ایمیل"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    ;
}

export default ResetPass;