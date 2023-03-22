import React, { useEffect } from "react";
import { useToast } from "../../contexts/ToastState";
import { toastProps } from "../../ts/interfaces";

const Toast:React.FC<toastProps> = ({ type, description, indexKey, destroyToast }) => {
  const { setToastState } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      destroyToast(indexKey);
    }, 3000);
    // return () => clearTimeout(timer);
  }, [setToastState]);

  function handleClick():void {
    destroyToast(indexKey);
  }

  const toastObject = {
    title: type === "1" ? "Success" : type === "2" ? "Error" : "Please wait...",
    description: description,
    backgroundColor:
      type === "1"
        ? "text-lightGray bg-green"
        : type === "2"
        ? "text-lightGray bg-red"
        : "text-black bg-white",
    icon:
      type === "1"
        ? "fa fa-check-circle"
        : type === "2"
        ? "fa fa-exclamation-circle"
        : "fa fa-spinner fa-spin",
  };
  return (
    <>
      <div
        className={`p-[10px] flex flex-row items-center gap-[20px] rounded-[5px] shadow-[0_8px_18px_0_rgba(200,200,200)] ${toastObject.backgroundColor}`}
      >
        <div className="text-[30px]">
          <i className={toastObject.icon} aria-hidden="true"></i>
        </div>
        <div className="text-right">{toastObject.description}</div>
        <button type="button" onClick={handleClick} className="font-bold">
          X
        </button>
      </div>
    </>
  );
}

export default Toast;
