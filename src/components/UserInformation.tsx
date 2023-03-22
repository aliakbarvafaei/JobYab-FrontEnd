import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useToast } from '../contexts/ToastState';
import { getUser } from '../services/api';
import { eachToast } from '../ts/interfaces';

const UserInformation = ()=> {

    const { setToastState } = useToast();
  const dispatch = useDispatch();

  function addItemOnce(arr : Array<eachToast>, value : eachToast):Array<eachToast> {
    arr.push(value);
    return arr;
  }
  
  useEffect(() => {
    
    const value : string | null = localStorage.getItem("token_user");
    if (JSON.parse(value as string) !== "") {
      getUser()
        .then((response) => {
          if (response.status === 200) {
            dispatch({
              type: "login",
              payload: [response.data.username, JSON.parse(value as string)],
            });
          }
        })
        .catch((err) => {
          dispatch({ type: "logout" });
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
      dispatch({ type: "logout" });
    }
    
  }, [dispatch,setToastState]);

    return (
        <></>
    );
}

export default UserInformation;