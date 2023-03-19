import React from "react";
import TitlePages from "../components/TitlePages/TitlePages";
import RegisterBox from "../components/RegisterBox/RegisterBox";
import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";

const Register : React.FC = () => {
  return (
    <div>
      <HeaderNewShort />
      <TitlePages title="ثبت نام" />
      <RegisterBox />
    </div>
  );
}

export default Register;