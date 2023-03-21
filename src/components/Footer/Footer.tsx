import React from "react";
// import Newsletter from "./Newsletter/Newsletter";
import MainFooter from "./MainFooter/MainFooter";
// import CopyRight from "./CopyRight/CopyRight";

const Footer : React.FC = ()=> {
  const themeClass : string = "bg-lightGray";
  // const themeClassCopy : string = "bg-white"
  // const themeBorder : string = "border-darkModeGray"

  return (
    <section>
      {/* <div
        className={`${themeClass} ${themeBorder} border-b-[1px] border-solid py-[35px] px-total`}
      >
        <Newsletter />
      </div> */}
      <div
        className={`${themeClass} lg:pb-[100px] md:pt-[20px] lg:pt-[30px] lgmin:py-[45px] px-total bg-lightGray`}
      >
        <MainFooter />
      </div>
      {/* <div className={`${themeClassCopy} py-[25px] px-total`}>
        <CopyRight />
      </div> */}
    </section>
  );
}

export default Footer;