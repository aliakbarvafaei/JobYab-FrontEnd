import { Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { PostType } from "../../constants/types";
// import DefaultPicture from "../assets/images/default.png";
import DifferenceData from "../../services/utils/DifferenceData";
import { API_URL } from "../../config";

interface PostProps {
  onClick?: (id: number) => void;
  data: PostType;
  updateData?: () => void;
}
const Post = ({ onClick, data, updateData }: PostProps) => {
  return (
    <Grid
      container
      className="flex lg:flex-col lgmin:flex-row lg:justify-center"
      style={{
        paddingBlock: 10,
        paddingInline: 10,
        borderRadius: 8,
        border: "2px solid #f5f5f5",
      }}
    >
      <Grid item>
        <img
          className="!w-[80px] !h-[80px] rounded-[50%]"
          src={
            data?.user.logo === null
            // todo .... (add import for this image)
              ? '../assets/images/default.png'
              : API_URL.split("api")[0] + (data?.user.logo as string)
          }
          alt=""
        />
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
            <Typography>{data.title}</Typography>
          </Grid>
          <Grid item className="flex items-center">
            <Typography>
              <span className="px-[24px] pt-[20px] text-sm">
                {DifferenceData(data.created_date)}
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="flex" alignItems="center">
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Grid item>
              <IconButton disabled>
                <BusinessIcon className="text-primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 12 }}>
                {data.user.company_persian_name}
              </Typography>
            </Grid>
          </Grid>
          <div>&nbsp;| </div>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Grid item>
              <IconButton disabled>
                <LocationOnIcon className="text-primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                style={{ fontSize: 12 }}
              >{`${data.state.title} ${data.city.title}`}</Typography>
            </Grid>
          </Grid>
          <div>&nbsp;| </div>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Grid item>
              <IconButton disabled>
                <FactCheckIcon className="text-primary" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                style={{ fontSize: 12 }}
              >{`قرارداد ${data.cooperation_type}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className="flex md:block mdmin:flex-row"
          style={{
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <Grid
            item
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            {data?.skills.map(({ title: skillTitle }) => (
              <Chip
                label={skillTitle}
                className="!text-white !bg-primary !rounded-[8px]"
              />
            ))}
          </Grid>
          <Grid item style={{ marginTop: 10 }}>
            <Button
              variant="outlined"
              fullWidth
              disableRipple
              style={{
                fontSize: 14,
                borderRadius: 8,
                paddingInline: 24,
                paddingBlock: 12,
                marginLeft: 12,
                border: "1.5px solid #1976D2",
              }}
              onClick={() => {
                onClick?.(data.id);
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
