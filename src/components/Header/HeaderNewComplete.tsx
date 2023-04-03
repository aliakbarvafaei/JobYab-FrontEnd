import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import HeaderNewShort from "./HeaderNewShort";

const HeaderNewComplete: React.FC = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");

  function handleChange(e: React.MouseEvent) {
    setSearchInput((e.target as HTMLInputElement).value);
  }

  return (
    <>
      <HeaderNewShort />
      <div
        style={{ backgroundColor: "#D3D3D3" }}
        className="w-[100%] h-[300px] bg-no-repeat bg-cover bg-center bg-opacity-10 flex flex-col items-center"
      >
        <div className="flex flex-col justify-center h-full">
          <div className="text-center text-[#555658] text-[20px] md:text-[12px] font-bold leading-[40px]">
            به صورت رایگان و در سریع‌ترین زمان ممکن
            <br />
            برای فرصت‌های شغلی مختلف رزومه ارسال کنید
          </div>
          <div className="relative text-center mt-[40px]">
            <form>
              <input
                type="text"
                value={searchInput}
                onChange={handleChange as any}
                className="rounded-3xl w-[500px] lg:w-[400px] sm:w-[300px] mm:w-[200px] h-[50px] text-[10px] pr-[12%] mm:pr-[18%] mdmin:outline mdmin:outline-[10px] mdmin:outline-[#1976D2]"
                placeholder="جستجو آگهی"
              />
              <button
                type="submit"
                onClick={() => {
                  if (searchInput !== "")
                    history.push(`/search?searchText=${searchInput}`);
                }}
                className="fa fa-search absolute smmin:right-[3%] sm:right-[5%] mm:right-[15%] top-[35%]"
              ></button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNewComplete;
