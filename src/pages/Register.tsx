import React from "react";
import TitlePages from "../components/TitlePages/TitlePages";
import RegisterBox from "../components/RegisterBox/RegisterBox";
import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import Footer from "../components/Footer/Footer";

const Register : React.FC = () => {
  return (
    <div>
      <MobileMenu />
      <HeaderNewShort />
      <TitlePages title="ثبت نام" />
      <RegisterBox />
      <Footer />
    </div>
  );
}

export default Register;