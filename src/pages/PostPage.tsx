import { useEffect, useRef, useState } from "react";
import HeaderNewShort from "../components/Header/HeaderNewShort";
import DetailHeader from "../components/modules/DetailHeader";
import TitlePages from "../components/TitlePages/TitlePages";
import Footer from "../components/Footer/Footer";
import SendResumeSection from "../components/modules/SendResumeSection";
import { Divider, Grid, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SimilarPost from "../components/modules/SimilarPost";
import DetailSection from "../components/modules/DetailSection";
import { useHistory, useParams } from "react-router-dom";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import { statesRedux } from "../ts/interfaces";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/ProfilesCompanies/Header";
import { PostType, UserType } from "../constants/types";
import { getPostDetail, getSimilarPosts, getUser } from "../services/api";
import { accessToken } from "../ts/functions";

const responsive = (length: number) => {
  return {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1279 },
      items: length >= 4 ? 4 : length,
    },
    desktop: {
      breakpoint: { max: 1279, min: 767 },
      items: length >= 3 ? 3 : length,
    },
    tablet: {
      breakpoint: { max: 767, min: 0 },
      items: length >= 2 ? 2 : length,
    },
  };
};
interface ParamsTypes {
  id: string;
}
const PostPage = () => {
  const history = useHistory();
  const { role } = useSelector((state: statesRedux) => state.userAuth);
  const { id } = useParams<ParamsTypes>();
  const [adDetail, setAdDetail] = useState<PostType | undefined>(undefined);
  const [similarAds, setSimilarAds] = useState<PostType[]>([]);
  const [userData, setUserData] = useState<UserType | undefined>(undefined);

  const dispatch = useDispatch();
  const windowWidth = useRef(window.innerWidth);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    accessToken(dispatch);
    getPostDetail(id)
      .then((data) => {
        setAdDetail(data.data.data);
      })
      .catch((err) => {
        history.push("/not-found");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        console.error(err);
      });
  }, [id, history]);
  useEffect(() => {
    accessToken(dispatch);
    getSimilarPosts(id).then((data) => {
      setSimilarAds(data.data.data);
    });
  }, [id]);
  useEffect(() => {
    accessToken(dispatch);
    getUser().then((data) => {
      setUserData(data.data);
    });
  }, []);
  return (
    <div>
      <MobileMenu />
      {role && role === "company" ? <Header /> : <HeaderNewShort />}
      <TitlePages title="جستجو" />
      <DetailHeader
        data={adDetail}
        onclick={() => {
          // @ *todo:

          history.push(`/company/${adDetail?.id}`);
        }}
        updateData={() => {
          getPostDetail(id)
            .then((data) => {
              setAdDetail(data.data.data);
            })
            .catch((err) => {
              history.push("/not-found");
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              console.error(err);
            });
        }}
      />
      <div
        className="flex lg:flex-col lgmin:flex-row lg:justify-center lg:items-center lgmin:mr-6=4 lgmin:ml-4 xlmin:mr-6 xlmin:ml-6"
        style={{
          display: "flex",
          gap: 30,
        }}
      >
        <SendResumeSection data={userData} postId={parseInt(id as string)} />
        <div
          className="smmin:w-11/12 mdmin:w-9/12"
          style={{
            border: "1.5px solid var(--primary)",
            borderRadius: 8,
            marginTop: 40,
            paddingTop: 30,
            boxShadow: "0 0 6px var(--primary)",
            textAlign: "justify",
            paddingInline: windowWidth.current < 450 ? 12 : 40,
            marginInline: 3,
          }}
        >
          <DetailSection data={adDetail} />
          <Divider style={{ marginBlock: 20, background: "var(--primary)" }} />
          {/* <TempData description={adDetail?.description} /> */}
          <div className="mb-3">{adDetail?.description}</div>
        </div>
      </div>
      {!!similarAds.length && (
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
              border: "2px solid var(--primary)",
              marginTop: 5,
              marginBottom: 20,
            }}
          />
        </Grid>
      )}
      <Carousel
        responsive={responsive(similarAds.length)}
        autoPlay={true}
        infinite={true}
        className="sm:mr-3 sm:ml-3 smmin:mr-10 smmin:ml-10"
      >
        {similarAds?.map((item) => (
          <SimilarPost data={item} />
        ))}
      </Carousel>
      <div style={{ marginTop: 10 }}>
        <Footer />
      </div>
    </div>
  );
};

export default PostPage;
