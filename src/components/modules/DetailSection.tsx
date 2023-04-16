import { Chip, Grid, Typography } from "@mui/material";
import DehazeIcon from "@mui/icons-material/Dehaze";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import DetailItem from "../modules/DetailItem";

const DetailSection = () => {
  return (
    <Grid item container wrap="wrap" xs={12} style={{ gap: "1rem" }}>
      <Grid
        className="flex md:flex-col mdmin:flex-row !important"
        // item
        xs={12}
        style={{ gap: "2.5rem" }}
      >
        <Grid item xs={6} className="flex items-center">
          <DetailItem
            title="دسته‌بندی"
            value="وب،‌ برنامه‌نویسی و نرم‌افزار"
            logo={<DehazeIcon style={{ color: "#1976D2" }} />}
          />
        </Grid>
        <Grid item xs={6} className="flex items-center">
          <DetailItem
            title="استان/شهر"
            value="اصفهان، اصفهان"
            logo={<LocationOnIcon style={{ color: "#1976D2" }} />}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ display: "flex", gap: "2.5rem" }}>
        <Grid item xs={6} className="flex items-center">
          <DetailItem
            title="نوع همکاری"
            value="تمام وقت"
            logo={<HandshakeIcon style={{ color: "#1976D2" }} />}
          />
        </Grid>
        <Grid item xs={6} className="flex items-center">
          <DetailItem
            title="پایه حقوق"
            value="توافقی"
            logo={<PaidOutlinedIcon style={{ color: "#1976D2" }} />}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ display: "flex", gap: "2.5rem" }}>
        <Grid item xs={6} className="flex items-center">
          <DetailItem
            title="سابقه کار"
            value="حداقل 2 سال"
            logo={<ManageAccountsOutlinedIcon style={{ color: "#1976D2" }} />}
          />
        </Grid>
        <Grid item xs={6} className="flex items-center">
          <DetailItem
            title="جنسیت"
            value="مهم نیست"
            logo={<WcOutlinedIcon style={{ color: "#1976D2" }} />}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ display: "flex", gap: "2.5rem" }}>
        <Grid item xs={6} className="flex items-center">
          <DetailItem
            title="مدرک تحصیلی"
            value="حداقل لیسانس"
            logo={<WorkspacePremiumOutlinedIcon style={{ color: "#1976D2" }} />}
          />
        </Grid>
        <Grid item xs={6} className="flex items-center">
          <DetailItem
            title="وضعیت سربازی"
            value="مهم نیست"
            logo={<MilitaryTechOutlinedIcon style={{ color: "#1976D2" }} />}
          />
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
        >
          تکنولوژی مورد نیاز:
        </Typography>
        <Grid item style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Chip
            label="C#"
            style={{ borderRadius: 8, background: "#1976D2", color: "white" }}
          />
          <Chip
            label="Python"
            style={{ borderRadius: 8, background: "#1976D2", color: "white" }}
          />
          <Chip
            label="C++"
            style={{ borderRadius: 8, background: "#1976D2", color: "white" }}
          />
          <Chip
            label="Java"
            style={{ borderRadius: 8, background: "#1976D2", color: "white" }}
          />
          <Chip
            label="SQL Server"
            style={{ borderRadius: 8, background: "#1976D2", color: "white" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DetailSection;
