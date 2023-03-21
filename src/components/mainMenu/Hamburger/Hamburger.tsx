import React from "react";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { HamburgerProps } from "../../../ts/interfaces";
import ItemHamburger from "./ItemHamburger";

const Hamburger:React.FC<HamburgerProps> = ({ isOpen, items, handleHamburger }) => {
  const themeClass = "bg-white text-black"

  return (
    <>
      {true && (
        <IconContext.Provider value={{ color: "black", size: "30px" }}>
          <div>
            <nav
            id="navMenu"
              className={`${themeClass} w-[250px] h-[200vh] flex justify-center fixed z-[30] top-0 shadow-[0_0_5px_0_rgba(200,200,200)] ease-in-out ${isOpen ? "translate-x-0  left-0" : " left-[-100px] translate-x-[-100%]"} cursor-text duration-[850ms]`}
            >
              <ul className="w-[100%] p-0">
                <li
                  className="w-[100%] pr-[8%] h-[80px] flex justify-start items-center border-b-solid border-b-[1px] border-b-darkModeGray"
                  onClick={() => {
                    handleHamburger();
                  }}
                >
                  <Link to="#" className=" mr-[1rem] text-[2rem] no-underline">
                    <i
                      style={{ fontSize: "20px" }}
                      className="fa fa-angle-left"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </li>

                {items.map((item: any, index : number) => {
                  return (
                    <li
                      key={index}
                      className="hover:text-red text-[14px] font-bold flex flex-col items-start px-[15px] py-[10px] w-[100%] list-none cursor-text"
                    >
                      <ItemHamburger item={item} />
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </IconContext.Provider>
      )}
    </>
  );
}

export default Hamburger;
