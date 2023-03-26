import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";
import DetailHeader from "../components/modules/DetailHeader";
import TitlePages from "../components/TitlePages/TitlePages";
import Footer from "../components/Footer/Footer";
import { Chip, Divider, Grid, IconButton, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import SimilarPost from "../components/modules/SimilarPost";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Link } from "react-router-dom";

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
const CompanyPage = () => {
  return (
    <div>
      <HeaderNewShort />
      <TitlePages title="جستجو" />
      <DetailHeader haveCompanyDetail={false} />
      <div
        style={{
          background: "#F2F3F4",
          paddingInline: 40,
          borderRadius: 8,
          marginTop: 40,
          paddingTop: 30,
          boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
          marginInline: 80,
          paddingBlock: 20,
        }}
      >
        <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
          معرفی شرکت:
        </Typography>
        <Typography
          style={{ fontSize: 14, textAlign: "justify", marginTop: 20 }}
        >
          گروه ایده‌کاوان یه سازمان دانش‌بنیانه که آفریننده و مالک محصول‌های
          مختلفیه: بهترینو، ویترین، دوباره، درآمد، قیمت. تمام این محصول‌ها، و
          محصول‌های تازه‌ای که در راه هستن، دور یه ماموریت واحد شکل گرفته‌ان:
          توانمندسازی کسب‌وکارهای کوچیک و متوسط با انحصارزدایی از قدرت فناورانه
          و کمک کردن به این کسب‌وکارها برای این که دیده بشن و بتونن خدمات بهتری
          به مردم ارائه کنن.کسب‌وکارهای کوچیک و متوسط برای تجربه کردن فعالیت در
          فضای دیجیتال چالش‌های زیادی دارن؛ ما با راهکارهایی که در اختیارشون
          می‌ذاریم این چالش‌ها رو از سر راه برمی‌داریم و به رشدشون کمک
          می‌کنیم.خود ما هم یکی از سریع‌ترین رشدها رو، اون‌هم به شکل ارگانیک و
          محصول‌محور، در اکوسیستم استارت‌آپی ایران تجربه کرده‌ایم که نتیجه‌ی
          مستقیم عملکرد تیم مستعد و پرتلاش‌مون بوده.خوشحالیم که تونستیم فضایی
          بسازیم که آدم‌های توانمند و اثرگذار کار کردن در ایده‌کاوان رو انتخاب
          کنن و در کنار هم ارزش خلق کنیم.
        </Typography>
        <Grid item>
          <Typography
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            تکنولوژی ها:
          </Typography>
          <Grid item style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Chip label="C#" style={{ borderRadius: 8 }} />
            <Chip label="Python" style={{ borderRadius: 8 }} />
            <Chip label="C++" style={{ borderRadius: 8 }} />
            <Chip label="Java" style={{ borderRadius: 8 }} />
            <Chip label="SQL Server" style={{ borderRadius: 8 }} />
          </Grid>
        </Grid>
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
                <LanguageOutlinedIcon />
              </IconButton>
              <Link to="www.google.com">
                <Typography
                  style={{ textDecoration: "underline", color: "blue" }}
                >
                  www.google.com
                </Typography>
              </Link>
            </Grid>
            <Grid className="flex items-center">
              <IconButton style={{ marginLeft: 10 }}>
                <EmailOutlinedIcon />
              </IconButton>
              <Link to="mailto:www.google.com">
                <Typography
                  style={{ textDecoration: "underline", color: "blue" }}
                >
                  ErfanNourbakhs@gmail.com
                </Typography>
              </Link>
            </Grid>
            <Grid className="flex items-center">
              <IconButton style={{ marginLeft: 10 }}>
                <LocationOnOutlinedIcon />
              </IconButton>
              <Typography style={{ fontSize: 14 }}>
                اصفهان، دانشگاه اصفهان
              </Typography>
            </Grid>
          </Grid>
        </Grid>
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
        <Typography style={{ fontSize: 24 }}>تمام آگهی‌های شرکت</Typography>
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

export default CompanyPage;
