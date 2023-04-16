import { useRef } from "react";
import HeaderNewShort from "../components/Header/HeaderNewShort";
import DetailHeader from "../components/modules/DetailHeader";
import TempData from "../components/modules/TempData";
import TitlePages from "../components/TitlePages/TitlePages";
import Footer from "../components/Footer/Footer";
import SendResumeSection from "../components/modules/SendResumeSection";
import { Divider, Grid, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import SimilarPost from "../components/modules/SimilarPost";
import DetailSection from "../components/modules/DetailSection";
import { useHistory } from "react-router-dom";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import { statesRedux } from "../ts/interfaces";
import { useSelector } from "react-redux";
import Header from "../components/NEW/ProfilesCompanies/Header";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1279 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1279, min: 767 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
  },
};
const PostPage = () => {
  const history = useHistory();
  const { role } = useSelector((state: statesRedux) => state.userAuth);
  const windowWidth = useRef(window.innerWidth);

  return (
    <div>
      <MobileMenu />
      {role && role === "company" ? <Header /> : <HeaderNewShort />}
      <TitlePages title="جستجو" />
      <DetailHeader
        onclick={() => {
          history.push("/company");
        }}
      />
      <div
        className="flex lg:flex-col lgmin:flex-row lg:justify-center lg:items-center lgmin:mr-6=4 lgmin:ml-4 xlmin:mr-6 xlmin:ml-6"
        style={{
          display: "flex",
          gap: 30,
        }}
      >
        <SendResumeSection />
        <div
          className="smmin:w-11/12 mdmin:w-9/12"
          style={{
            border: "1.5px solid #1976D2",
            borderRadius: 8,
            marginTop: 40,
            paddingTop: 30,
            boxShadow: "0 0 6px #1976D2",
            textAlign: "justify",
            paddingInline: windowWidth.current < 450 ? 12 : 40,
            marginInline: 3,
          }}
        >
          <DetailSection />
          <Divider style={{ marginBlock: 20, background: "#1976D2" }} />
          <TempData />
        </div>
      </div>
      <Grid
        item
        style={{
          marginTop: 20,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography style={{ fontSize: 24 }}>آگهی‌های مشابه</Typography>
        <Divider
          style={{
            width: 50,
            border: "2px solid black",
            marginTop: 5,
            marginBottom: 20,
          }}
        />
      </Grid>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        className="sm:mr-3 sm:ml-3 smmin:mr-10 smmin:ml-10"
      >
        <SimilarPost />
        <SimilarPost />
        <SimilarPost />
        <SimilarPost />
        <SimilarPost />
        <SimilarPost />
      </Carousel>
      <div style={{ marginTop: 10 }}>
        <Footer />
      </div>
    </div>
  );
};

export default PostPage;
