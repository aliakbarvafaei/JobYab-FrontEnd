import React from "react";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import HeaderNewShort from "../components/Header/HeaderNewShort";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import TitlePages from "../components/TitlePages/TitlePages";
import { statesRedux } from "../ts/interfaces";
import { useSelector } from "react-redux";
import Header from "../components/ProfilesCompanies/Header";

const NotFound: React.FC = () => {
  const history = useHistory();
  const themeClass = "bg-white text-darkGray";
  const { role } = useSelector((state: statesRedux) => state.userAuth);

  function handleHome() {
    history.push("/home");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  return (
    <div>
      <MobileMenu />
      {role && role === "company" ? <Header /> : <HeaderNewShort />}
      <TitlePages title="404" />
      <div
        className={`px-total py-[50px] flex flex-col gap-[10px] items-center justify-center ${themeClass}`}
      >
        <h2 className="font-bold sm:text-[140px] smmin:text-[200px] text-center">
          404
        </h2>
        <h3 className="sm:text-[26px] smmin:text-[32px] text-center">
          صفحه یافت نشد
        </h3>
        <button
          type="button"
          onClick={handleHome}
          className="min-w-fit py-[1%] px-[3%] rounded-md bg-primary text-white font-bold text-[14px] hover:bg-white hover:border-primary hover:border-[2px] hover:border-solid hover:text-black"
        >
          برگشت به صفحه اصلی
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
