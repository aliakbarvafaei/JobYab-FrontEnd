import { useRef } from "react";
import {
  Avatar,
  Button,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

interface PostProps {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}
const Post = ({ onClick }: PostProps) => {

  return (
    <Grid
      container
      className="flex lg:flex-col lgmin:flex-row lg:justify-center"
      style={{
        paddingBlock: 20,
        paddingInline: 10,
        borderRadius: 8,
        border: "2px solid #f5f5f5",
      }}
      onClick={onClick}
    >
      <Grid item>
        <Avatar sx={{ width: 80, height: 80 }} />
      </Grid>
      <Grid item style={{ marginRight: 10, width: "90%" }}>
        <Grid
          item
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid item>
            <Typography>برنامه نویس اندروید</Typography>
          </Grid>
          <Grid item className="flex items-center">
            <Typography>9 ساعت پیش</Typography>
            <IconButton>
              <BookmarkBorderOutlinedIcon style={{ color: "#1976D2" }} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Grid item>
            <IconButton disabled>
              <BusinessIcon style={{ color: "#1976D2" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 12 }}>شرکت ویتراکو</Typography>
          </Grid>
        </Grid>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Grid item>
            <IconButton disabled>
              <LocationOnIcon style={{ color: "#1976D2" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 12 }}>اصفهان، اصفهان</Typography>
          </Grid>
        </Grid>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Grid item>
            <IconButton disabled>
              <FactCheckIcon style={{ color: "#1976D2" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 12 }}>قرارداد تمام وقت</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          className="flex md:block mdmin:flex-row"
          style={{
            // alignItems: "center",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
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
          <Grid item style={{ marginTop: 10 }}>
            <Button
              variant="outlined"
              fullWidth
              style={{
                fontSize: 14,
                borderRadius: 8,
                paddingInline: 24,
                paddingBlock: 12,
                marginLeft: 12,
              }}
            >
              ارسال رزومه
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Post;
