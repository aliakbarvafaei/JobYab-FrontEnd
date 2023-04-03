import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Tabs } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import LoginUser from "./User/Login";
import RegisterUser from "./User/Register";
import ForgetPass1User from "./User/ForgetPass1";
import ForgetPass2User from "./User/ForgetPass2";
import LoginCompany from "./Company/Login";
import RegisterCompany from "./Company/Register";
import ForgetPass1Company from "./Company/ForgetPass1";
import ForgetPass2Company from "./Company/ForgetPass2";

const LoginBox: React.FC = () => {
  const [size] = useState<SizeType>("small");
  const [user, setUser] = useState<Number>(0);
  const [company, setCompany] = useState<Number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "logout" });
    try {
      localStorage.setItem("token_user", JSON.stringify(""));
    } catch (e) {
      console.error({ e });
    }
  }, [dispatch]);

  const changeLoginSign = (userORcompany: String, index: Number) => {
    if (userORcompany === "user") {
      setUser(index);
    } else {
      setCompany(index);
    }
  };

  return (
    <div
      className={`flex justify-center items-center bg-lightGray min-h-[100vh] p-[20px]`}
    >
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={size}
        centered
        items={new Array(2).fill(null).map((_, i) => {
          const id = i + 1;
          return {
            label: i === 0 ? "کارجو" : "کارفرما",
            key: String(id),
            children:
              i === 0 ? (
                user === 0 ? (
                  <LoginUser changeLoginSign={changeLoginSign} />
                ) : user === 1 ? (
                  <RegisterUser changeLoginSign={changeLoginSign} />
                ) : user === 2 ? (
                  <ForgetPass1User changeLoginSign={changeLoginSign} />
                ) : user === 3 ? (
                  <ForgetPass2User changeLoginSign={changeLoginSign} />
                ) : undefined
              ) : company === 0 ? (
                <LoginCompany changeLoginSign={changeLoginSign} />
              ) : company === 1 ? (
                <RegisterCompany changeLoginSign={changeLoginSign} />
              ) : company === 2 ? (
                <ForgetPass1Company changeLoginSign={changeLoginSign} />
              ) : company === 3 ? (
                <ForgetPass2Company changeLoginSign={changeLoginSign} />
              ) : undefined,
          };
        })}
      />
    </div>
  );
};
export default LoginBox;
