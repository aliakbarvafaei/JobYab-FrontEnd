import React, { useEffect, useState } from "react";
import Header from "../components/ProfilesCompanies/Header";
import BasicTabs from "../components/ProfilesCompanies/Tab";
import { getUser } from "../services/api";

const ProfileCompany: React.FC = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
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
    <div data-testid="profile-company">
      <Header />
      {user !== null && <BasicTabs user={user} />}
    </div>
  );
};

export default ProfileCompany;
