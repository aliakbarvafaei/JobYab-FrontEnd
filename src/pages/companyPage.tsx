import HeaderNewShort from "../components/Header/HeaderNewShort";
import DetailHeader from "../components/modules/DetailHeader";
import TitlePages from "../components/TitlePages/TitlePages";
import Footer from "../components/Footer/Footer";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { Link, useHistory, useParams } from "react-router-dom";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import { statesRedux } from "../ts/interfaces";
import { useSelector } from "react-redux";
import Header from "../components/ProfilesCompanies/Header";
import { useEffect, useState } from "react";
import { getCompaniesPostsPublic, getPostDetail } from "../services/api";
import { PostType } from "../constants/types";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Carousel from "react-multi-carousel";
import SimilarPost from "../components/modules/SimilarPost";

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
const CompanyPage = () => {
  const history = useHistory();
  const { role } = useSelector((state: statesRedux) => state.userAuth);
  const { companyId } = useParams<any>();
  const [adDetail, setAdDetail] = useState<PostType | undefined>(undefined);
  const [companiesPosts, setCompaniesPosts] = useState<PostType[]>([]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getPostDetail(companyId)
      .then((data) => {
        setAdDetail(data.data.data);
        console.log(data.data.data);
      })
      .catch((err) => {
        history.push("/not-found");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        console.error(err);
      });
  }, [companyId, history]);
  useEffect(() => {
    getCompaniesPostsPublic(companyId).then((data) => {
      setCompaniesPosts(data.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <MobileMenu />
      {role && role === "company" ? <Header /> : <HeaderNewShort />}
      <TitlePages title="جستجو" />
      <DetailHeader haveCompanyDetail={false} data={adDetail} />
      <div
        className="sm:mr-3 sm:ml-3 smmin:mr-20 smmin:ml-20"
        style={{
          border: "1.5px solid var(--primary)",
          paddingInline: 40,
          borderRadius: 8,
          marginTop: 40,
          paddingTop: 30,
          boxShadow: "0 0 6px var(--primary)",
          // marginInline: 80,
          paddingBlock: 20,
        }}
      >
        <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
          {`معرفی شرکت ${adDetail?.user.company_persian_name} (${adDetail?.user.type})`}
        </Typography>
        <Typography style={{ fontSize: 15, fontWeight: "bold" }}>
          {adDetail?.user.introduction}
        </Typography>
        <Typography
          style={{ fontSize: 14, textAlign: "justify", marginTop: 20 }}
        >
          {/* {adDetail.user.} */}
        </Typography>
        <Grid item></Grid>
        <Grid item>
          <Typography
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            اطلاعات تماس:
          </Typography>
          <Grid
            item
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <Grid className="flex items-center">
              <IconButton style={{ marginLeft: 10 }}>
                <LanguageOutlinedIcon style={{ color: "var(--primary)" }} />
              </IconButton>
              <Link to={adDetail?.user.website ?? ""}>
                <Typography>{adDetail?.user.website ?? "---"}</Typography>
              </Link>
            </Grid>
            <Grid className="flex items-center">
              <IconButton style={{ marginLeft: 10 }}>
                <PeopleAltIcon style={{ color: "var(--primary)" }} />
              </IconButton>
              <Typography>
                {adDetail?.user.number_of_personnel === "1"
                  ? "کمتر از 10 نفر"
                  : adDetail?.user.number_of_personnel === "2"
                  ? "کمتر از 100 نفر"
                  : "بیشتر از 100 نفر"}
              </Typography>
            </Grid>
            <Grid className="flex items-center">
              <IconButton style={{ marginLeft: 10 }}>
                <ApartmentIcon style={{ color: "var(--primary)" }} />
              </IconButton>
              <Typography>
                {`${adDetail?.state.title}, ${adDetail?.city.title}` ?? ""}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {companiesPosts.length > 0 ? (
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
          <Typography style={{ fontSize: 24 }}>تمام آگهی‌های شرکت</Typography>
          <Divider
            style={{
              width: 50,
              border: "2px solid var(--primary)",
              marginTop: 5,
              marginBottom: 20,
            }}
          />
        </Grid>
      ) : (
        <></>
      )}
      <Carousel
        responsive={responsive(companiesPosts.length)}
        autoPlay={true}
        infinite={true}
        className="sm:mr-3 sm:ml-3 smmin:mr-10 smmin:ml-10"
      >
        {companiesPosts?.map((item) => (
          <SimilarPost data={item} />
        ))}
      </Carousel>
      <div style={{ marginTop: 10 }}>
        <Footer />
      </div>
    </div>
  );
};

export default CompanyPage;
