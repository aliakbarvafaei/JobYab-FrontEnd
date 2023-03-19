import React from "react";
import TitlePages from "../components/TitlePages/TitlePages";
import LoginBox from "../components/LoginBox/LoginBox";
import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";

const  Login:React.FC = () => {
  return (
    <div>
      <HeaderNewShort />
      <TitlePages title="ورود" />
      <LoginBox />
    </div>
  );
}

export default Login;