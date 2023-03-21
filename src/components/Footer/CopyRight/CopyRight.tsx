import React from "react";
import sponser from "../../../assets/images/sponser.png";

const CopyRight:React.FC = () => {
  return (
    <div className="flex mdmin:flex-row md:flex-col justify-between items-center">
      <div className="text-darkGray">
        <i className="fa fa-copyright" aria-hidden="true"></i>
        <span className="text-[13px] pl-[15px]">
          2020-21 themeforest powered by pixelstrap
        </span>
      </div>
      <div className="md:pt-[10px]">
        {" "}
        <img src={sponser} alt="sponser" />{" "}
      </div>
    </div>
  );
}

export default CopyRight;