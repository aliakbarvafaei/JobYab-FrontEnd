import React, { useEffect, useState } from "react";
import HeaderNewShort from "../components/Header/HeaderNewShort";
import BasicTabs from "../components/ProfilesUsers/Tab";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import { getUser } from "../services/api";

const ProfileUser: React.FC = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser()
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div data-testid="profile-user">
      <MobileMenu />
      <HeaderNewShort />
      {user !== null && <BasicTabs user={user} />}
    </div>
  );
};

export default ProfileUser;
