import React from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { useToast } from "../contexts/ToastState";
import { eachToast, ProtectedRouteProps, statesRedux } from "../ts/interfaces";

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { setToastState } = useToast();
  const { role } = useSelector((state: statesRedux) => state.userAuth);
  const history = useHistory();
  function addItemOnce(arr: Array<eachToast>, value: eachToast) {
    arr.push(value);
    return arr;
  }
  if (role !== undefined) {
    if (role === null) {
      setToastState((old: Array<eachToast>) =>
        addItemOnce(old.slice(), {
          title: "2",
          description: "ابتدا وارد حساب خود شوید",
          key: Math.random(),
        })
      );
      history.push("/login");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (props.path.includes("profile-company")) {
        if (role === "company") {
          return (
            <Route
              exact
              path={props.path}
              key={props.key}
              component={props.component}
            />
          );
        } else {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "این قسمت برای کارجو در دسترس نیست",
              key: Math.random(),
            })
          );
          history.push("/");
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      } else if (props.path.includes("profile")) {
        if (role === "user") {
          return (
            <Route
              path={props.path}
              key={props.key}
              component={props.component}
            />
          );
        } else {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "این قسمت برای کارفرما در دسترس نیست",
              key: Math.random(),
            })
          );
          history.push("/");
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      } else {
        return (
          <Route
            path={props.path}
            key={props.key}
            component={props.component}
          />
        );
      }
    }
  }

  return <></>;
};

export default ProtectedRoute;
