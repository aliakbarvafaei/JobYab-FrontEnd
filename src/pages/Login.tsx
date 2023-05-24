import React from "react";
import LoginBox from "../components/Login/Login";

const  Login:React.FC = () => {
  return (
    <div data-testid="login-box">
      <LoginBox />
    </div>
  );
}

export default Login;