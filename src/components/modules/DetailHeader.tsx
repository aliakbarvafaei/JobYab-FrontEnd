import { Avatar, Button, Grid, IconButton, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const DetailHeader = () => {
  return (
    <Grid
      style={{
        background: "lightgray",
        height: 200,
        marginInline: 150,
        borderRadius: 12,
        marginTop: 10,
        position: "relative",
      }}
    >
      <Grid className="flex items-center absolute -bottom-3 right-10">
        <Grid>
          <Avatar style={{ width: 160, height: 160 }} />
        </Grid>
        <Grid>
          <Grid item style={{ marginBottom: 15 }}>
            <Typography style={{ fontSize: 24 }}>برنامه نویس پایتون</Typography>
          </Grid>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Grid item>
              <IconButton disabled>
                <BusinessIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 12 }}>شرکت ویتراکو</Typography>
            </Grid>
          </Grid>

          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Grid item>
              <IconButton disabled>
                <LocationOnIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 12 }}>اصفهان اصفهان</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className="absolute left-0 bottom-3">
        <Button variant="contained" style={{ marginLeft: 5 }}>
          اطلاعات شرکت
        </Button>
        <IconButton style={{ marginLeft: 5 }}>
          <BookmarkBorderOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default DetailHeader;
