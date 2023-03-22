import React from "react";
import { useHistory } from "react-router-dom";

const TitlePages:React.FC<{title: string}> = ({ title }) => {
  const history = useHistory();

  const themeClass = "bg-lightGray text-black";

  function handleCreate() {
    history.push("/home");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  return (
    <div
      className={`${themeClass} mdmin:py-[25px] md:py-[10px] px-total bg-lightGray`}
    >
      <div className="flex mdmin:flex-row md:flex-col justify-between">
        <div className="text-[14px] md:pt-[10px] font-black text-center">
          <span className="cursor-pointer" onClick={handleCreate}>
            خانه{" "}
          </span>
          / {title}{" "}
        </div>
        {/* <div className="text-center">
          <h2 className="text-[16px] m-0 font-black">{title}</h2>
        </div> */}
      </div>
    </div>
  );
}

export default TitlePages;
