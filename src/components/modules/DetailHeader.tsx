import { Avatar, Button, Grid, IconButton, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useRef } from "react";

interface DetailHeaderProps {
  onclick?: () => void;
  haveCompanyDetail?: boolean;
}
const DetailHeader = ({
  onclick,
  haveCompanyDetail = true,
}: DetailHeaderProps) => {
  const windowWidth = useRef(window.innerWidth);
  console.log(windowWidth.current);
  return (
    <Grid
      className=" sm:mr-1 sm:ml-1 md:mr-10 md:ml-10 xl:ml-3 xl:mr-3 xlmin:mr-20 xlmin:ml-20"
      style={{
        border: "1.5px solid #1976D2",
        height: 200,
        borderRadius: 12,
        marginTop: 10,
        position: "relative",
        backgroundImage:
          "linear-gradient(to left top, #1976D2,#1976D7,#1976D2)",
      }}
    >
      <Grid
        className="flex items-center absolute -bottom-3"
        style={{ right: windowWidth.current > 450 ? 40 : 20 }}
      >
        <Grid>
          <Avatar
            style={{
              width: windowWidth.current > 450 ? 160 : 120,
              height: windowWidth.current > 450 ? 160 : 120,
            }}
          />
        </Grid>
        <Grid>
          <Grid item style={{ marginBottom: 15 }}>
            <Typography
              style={{
                fontSize: 24,
                color: "white",
                marginBottom: windowWidth.current > 450 ? 0 : 50,
              }}
            >
              برنامه نویس پایتون
            </Typography>
          </Grid>
          {windowWidth.current > 450 ? (
            <>
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
            </>
          ) : null}
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
