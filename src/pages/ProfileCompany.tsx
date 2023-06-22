import React, { useEffect, useState } from "react";
import Header from "../components/ProfilesCompanies/Header";
import BasicTabs from "../components/ProfilesCompanies/Tab";
import { getUser } from "../services/api";
import { useDispatch } from "react-redux";
import { accessToken } from "../ts/functions";

const ProfileCompany: React.FC = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    accessToken(dispatch);
    getUser()
      .then((response) => {
        setUser(response.data);
        console.log(response.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      {user!==null && <BasicTabs user={user} />}
    </div>
  );
};

export default ProfileCompany;
