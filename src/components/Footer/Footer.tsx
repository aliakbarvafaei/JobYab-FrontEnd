import React from "react";
import MainFooter from "./MainFooter/MainFooter";

const Footer : React.FC = ()=> {
  const themeClass : string = "bg-lightGray";

  return (
    <section>
      <div
        className={`${themeClass} lg:pb-[100px] md:pt-[20px] lg:pt-[30px] lgmin:py-[45px] px-total bg-lightGray`}
      >
        <MainFooter />
      </div>
    </section>
  );
}

export default Footer;