import {
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
import { PostType } from "../constants/types";
import { addItemOnce } from "../ts/functions";
import { postBookmark } from "../services/api";
import { eachToast } from "../ts/interfaces";
import { useToast } from "../contexts/ToastState";
import DefaultPicture from "../assets/images/default.png";
import { useHistory } from "react-router-dom";
import DifferenceData from "../services/utils/DifferenceData";
import { API_URL } from "../config";

interface PostProps {
  onClick?: (id: number) => void;
  data: PostType;
}
const Post = ({ onClick, data }: PostProps) => {
  const { setToastState } = useToast();
  const history = useHistory();
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
      onClick={() => {
        window.location.href = `/postPage/${data.id}`;
      }}
    >
      <Grid item>
        <img
          className="!w-[80px] !h-[80px] cursor-pointer rounded-[50%]"
          src={
            data?.user.logo === null
              ? DefaultPicture
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
            <Typography className="cursor-pointer">{data.title}</Typography>
          </Grid>
          <Grid item className="flex items-center">
            <Typography>
              <span>{DifferenceData(data.created_date)}</span>
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                postBookmark(data.id.toString() ?? "")
                  .then((res) => {
                    if (res.status === 201) {
                      setToastState((old: Array<eachToast>) =>
                        addItemOnce(old.slice(), {
                          title: "1",
                          description:
                            "آگهی با موفقیت در نشان شده‌ها قرار داده شد.",
                          key: Math.random(),
                        })
                      );
                    }
                  })
                  .catch((err) => {
                    if (err.response.status === 401) {
                      setToastState((old: Array<eachToast>) =>
                        addItemOnce(old.slice(), {
                          title: "2",
                          description: "ابتدا باید در وبسایت وارد شوید.",
                          key: Math.random(),
                        })
                      );
                      history.replace("/login");
                    } else {
                      setToastState((old: Array<eachToast>) =>
                        addItemOnce(old.slice(), {
                          title: "2",
                          description: "مشکلی پیش آمده است.",
                          key: Math.random(),
                        })
                      );
                    }
                  });
              }}
            >
              <BookmarkBorderOutlinedIcon className="text-primary" />
            </IconButton>
          </Grid>
        </Grid>
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
        <Grid
          item
          className="flex md:block mdmin:flex-row"
          style={{
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          <Grid item style={{ display: "flex", alignItems: "center", gap: 4 }}>
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
              style={{
                fontSize: 14,
                borderRadius: 8,
                paddingInline: 24,
                paddingBlock: 12,
                marginLeft: 12,
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
