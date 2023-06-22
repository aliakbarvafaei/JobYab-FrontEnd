import React from "react";
import { Route, Switch } from "react-router-dom";
import AppRoutes from "../routes";
import { useToast } from "../contexts/ToastState";
import Toast from "../components/Toast/Toast";
import { eachToast } from "../ts/interfaces";
import ProtectedRoute from "../components/ProtectedRoute";
import UserInformation from "../components/UserInformation";

const DefaultLayout: React.FC = () => {
  const { toastState, setToastState } = useToast();

  function destroyToast(indexKey: Number): void {
    setToastState((old: Array<eachToast>) =>
      removeItemOnce(old.slice(), indexKey)
    );
  }

  function removeItemOnce(
    arr: Array<eachToast>,
    indexKey: Number
  ): Array<eachToast> {
    var index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].key === indexKey) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  return (
    <div
      id="main-wrapper"
      data-layout="vertical"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
      data-boxed-layout="full"
    >
      <div className="page-wrapper d-block">
        <div className="page-content container-fluid">
          <Switch>
            {AppRoutes.map((prop, key) => {
              // if (key === 0) UserInformation();
              if (prop.private) {
                return (
                  <ProtectedRoute
                    path={prop.path}
                    key={key}
                    component={prop.component}
                  />
                );
              } else {
                return (
                  <Route
                    exact
                    path={prop.path}
                    key={key}
                    component={prop.component as React.FC}
                  />
                );
              }
            })}
          </Switch>
        </div>
      </div>
      <div className="fixed top-[20px] right-[20px] flex flex-col gap-[15px] z-[1002]">
        {toastState.length > 0 &&
          toastState.map((item: eachToast, index: number) => {
            return (
              <Toast
                type={item.title}
                description={item.description}
                indexKey={item.key}
                destroyToast={destroyToast}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DefaultLayout;
