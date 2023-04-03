import React from "react";
import TitlePages from "../components/TitlePages/TitlePages";
import RegisterBox from "../components/RegisterBox/RegisterBox";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import Footer from "../components/Footer/Footer";
import HeaderSection from "../components/NEW/HeaderSection/HeaderSection";

const Register : React.FC = () => {
  return (
    <div>
      <MobileMenu />
      <HeaderSection />
      <TitlePages title="ثبت نام" />
      <RegisterBox />
      <Footer />
    </div>
  );
}

export default Register;