import React, { useEffect, useState } from "react";
import HeaderNewShort from "../components/Header/HeaderNewShort";
import BasicTabs from "../components/ProfilesUsers/Tab";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import { getUser } from "../services/api";
import { accessToken } from "../ts/functions";
import { useDispatch } from "react-redux";

const ProfileUser: React.FC = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    accessToken(dispatch);
    getUser()
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <MobileMenu />
      <HeaderNewShort />
      {user !== null && <BasicTabs user={user} />}
    </div>
  );
};

export default ProfileUser;
