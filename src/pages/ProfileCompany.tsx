import React, { useEffect, useState } from "react";
import Header from "../components/NEW/ProfilesCompanies/Header";
import BasicTabs from "../components/NEW/ProfilesCompanies/Tab";
import { getUser } from "../services/api";

const ProfileCompany: React.FC = () => {
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
    <div>
      <Header />
      {user!==null && <BasicTabs user={user} />}
    </div>
  );
};

export default ProfileCompany;
