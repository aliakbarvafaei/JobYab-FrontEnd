import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../contexts/ToastState";
import { getUser } from "../services/api";
import Cookies from "js-cookie";

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
              type: "login",
              payload: [
                response.data.data.is_employer ? "company" : "user",
                JSON.parse(value1 as string),
              ],
            });
          }
        })
        .catch((err) => {
          dispatch({ type: "logout" });
          Cookies.remove("access");
          Cookies.remove("refresh");
          try {
            localStorage.setItem("token_user", JSON.stringify(""));
          } catch (e) {
            console.error({ e });
          }
        });
    } else {
      dispatch({ type: "logout" });
      Cookies.remove("access");
      Cookies.remove("refresh");
    }
  }, [dispatch, setToastState]);

  return <></>;
};

export default UserInformation;
