import React from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { useToast } from "../contexts/ToastState";
import { eachToast, ProtectedRouteProps, statesRedux } from "../ts/interfaces";

const ProtectedRoute:React.FC<ProtectedRouteProps> = (props) => {
  const { setToastState } = useToast();
  const { user } = useSelector((state: statesRedux) => state.userAuth);
  const history = useHistory();
  function addItemOnce(arr: Array<eachToast>, value: eachToast) {
    arr.push(value);
    return arr;
  }
  if (user) {
    return (
      <Route path={props.path} key={props.key} component={props.component} />
    );
  } else {
    const value = localStorage.getItem("token_user");
    if (JSON.parse(value as string) === "") {
      setToastState((old : Array<eachToast>) =>
        addItemOnce(old.slice(), {
          title: "2",
          description: "ابتدا وارد حساب خود شوید",
          key: Math.random(),
        })
      );
      history.push("/login");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }
  return <></>;
};

export default ProtectedRoute;
