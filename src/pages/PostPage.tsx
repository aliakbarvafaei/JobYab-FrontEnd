import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";
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
  return (
    <div>
      <HeaderNewShort />
      <TitlePages title="جستجو" />
      <DetailHeader
        onclick={() => {
          history.push("/company");
        }}
      />
      <div
        style={{
          display: "flex",
          marginInline: 80,
          gap: 30,
        }}
      >
        <SendResumeSection />
        <div
          style={{
            width: "80%",
            background: "#F2F3F4",
            paddingInline: 40,
            borderRadius: 8,
            marginTop: 40,
            paddingTop: 30,
            boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
          }}
        >
          <DetailSection />
          <Divider style={{ marginBlock: 20 }} />
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
        className="mr-10 ml-10"
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
