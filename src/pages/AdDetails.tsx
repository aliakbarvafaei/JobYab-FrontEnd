import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Ad from "../components/Ads/Ad";
import Footer from "../components/Footer/Footer";
import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import TitlePages from "../components/TitlePages/TitlePages";
import { getAd } from "../services/api";
import { ads } from "../ts/interfaces";

const AdDetails:React.FC = (props) => {
  const history = useHistory();
  const { idad, source } = useParams<any>();
  const [ad, setAd] = useState<ads | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getAd(idad, source)
    .then((response) => {
      setAd(response.data);
    })
    .catch((err) => {
      history.push("/not-found");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      console.error(err);
    });
  }, [idad, history]);

  return (
    <div>
      <MobileMenu />
      <HeaderNewShort />
      <TitlePages title="آگهی" />
      {ad && <Ad ad={ad} />}
      <Footer />
    </div>
  );
}

export default AdDetails;
