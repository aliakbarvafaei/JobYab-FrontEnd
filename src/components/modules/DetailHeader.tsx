import { Avatar, Button, Grid, IconButton, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

interface DetailHeaderProps {
  onclick?: () => void;
  haveCompanyDetail?: boolean;
}
const DetailHeader = ({
  onclick,
  haveCompanyDetail = true,
}: DetailHeaderProps) => {
  return (
    <Grid
      style={{
        border: "1.5px solid #1976D2",
        height: 200,
        marginInline: 150,
        borderRadius: 12,
        marginTop: 10,
        position: "relative",
        backgroundImage:
          "linear-gradient(to left top, #1976D2,#1976D7,#1976D2)",
      }}
    >
      <Grid className="flex items-center absolute -bottom-3 right-10">
        <Grid>
          <Avatar style={{ width: 160, height: 160 }} />
        </Grid>
        <Grid>
          <Grid item style={{ marginBottom: 15 }}>
            <Typography style={{ fontSize: 24, color: "white" }}>
              برنامه نویس پایتون
            </Typography>
          </Grid>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Grid item>
              <IconButton disabled>
                <BusinessIcon style={{ color: "white" }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 12, color: "white" }}>
                شرکت ویتراکو
              </Typography>
            </Grid>
          </Grid>

          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Grid item>
              <IconButton disabled>
                <LocationOnIcon style={{ color: "white" }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 12, color: "white" }}>
                اصفهان اصفهان
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="absolute left-0 bottom-3">
        {haveCompanyDetail && (
          <Button
            variant="contained"
            style={{ marginLeft: 5, background: "white", color: "#1976D2" }}
            onClick={onclick}
          >
            اطلاعات شرکت
          </Button>
        )}
        <IconButton style={{ marginLeft: 5, padding: 5 }}>
          <BookmarkBorderOutlinedIcon style={{ color: "white" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default DetailHeader;
