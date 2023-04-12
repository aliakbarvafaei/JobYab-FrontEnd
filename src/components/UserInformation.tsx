import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../contexts/ToastState";
import { getCompany, getUser } from "../services/api";

const UserInformation = () => {
  const { setToastState } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const value1: string | null = localStorage.getItem("token_user");
    if (JSON.parse(value1 as string) !== "") {
      getUser()
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: "loginuser",
              payload: [response.data.username, JSON.parse(value1 as string)],
            });
          }
        })
        .catch((err) => {
          dispatch({ type: "logoutuser" });
          // setToastState((old : Array<eachToast>) =>
          //   addItemOnce(old.slice(), {
          //     title: "2",
          //     description:
          //       "احراز هویت ما مشکل مواجه شد لطفا مجدد وارد شوید",
          //     key: Math.random(),
          //   })
          // );
          try {
            localStorage.setItem("token_user", JSON.stringify(""));
          } catch (e) {
            console.error({ e });
          }
        });
    } else {
      dispatch({ type: "logoutuser" });
    }
    const value2: string | null = localStorage.getItem("token_company");
    if (JSON.parse(value2 as string) !== "") {
      getCompany()
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: "logincompany",
              payload: [response.data.username, JSON.parse(value2 as string)],
            });
          }
        })
        .catch((err) => {
          dispatch({ type: "logoutcompany" });
          // setToastState((old : Array<eachToast>) =>
          //   addItemOnce(old.slice(), {
          //     title: "2",
          //     description:
          //       "احراز هویت ما مشکل مواجه شد لطفا مجدد وارد شوید",
          //     key: Math.random(),
          //   })
          // );
          try {
            localStorage.setItem("token_company", JSON.stringify(""));
          } catch (e) {
            console.error({ e });
          }
        });
    } else {
      dispatch({ type: "logoutcompany" });
    }
  }, [dispatch, setToastState]);

  return <></>;
};

export default UserInformation;
