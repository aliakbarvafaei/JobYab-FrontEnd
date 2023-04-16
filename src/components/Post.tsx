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
import { PostType } from "../constants/types";
import { DateDiff } from "../ts/functions";

interface PostProps {
  onClick?: (id: number) => void;
  data: PostType;
}
const Post = ({ onClick, data }: PostProps) => {
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
    >
      <Grid item>
        <Avatar sx={{ width: 80, height: 80 }} src={data.user.logo ?? ""} />
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
              <span>
                {DateDiff.inMonths(new Date(data.created_date), new Date()) ===
                0 ? (
                  DateDiff.inWeeks(new Date(data.created_date), new Date()) ===
                  0 ? (
                    DateDiff.inDays(new Date(data.created_date), new Date()) ===
                    0 ? (
                      DateDiff.inHour(
                        new Date(data.created_date),
                        new Date()
                      ) === 0 ? (
                        <>دقایقی پیش</>
                      ) : (
                        <>
                          {DateDiff.inHour(
                            new Date(data.created_date),
                            new Date()
                          )}{" "}
                          ساعت پیش
                        </>
                      )
                    ) : (
                      <>
                        {DateDiff.inDays(
                          new Date(data.created_date),
                          new Date()
                        )}{" "}
                        روز پیش
                      </>
                    )
                  ) : (
                    <>
                      {DateDiff.inWeeks(
                        new Date(data.created_date),
                        new Date()
                      )}{" "}
                      هفته پیش
                    </>
                  )
                ) : (
                  <>
                    {DateDiff.inMonths(new Date(data.created_date), new Date())}{" "}
                    ماه پیش
                  </>
                )}
              </span>
            </Typography>
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
            <Typography style={{ fontSize: 12 }}>
              {data.user.company_persian_name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Grid item>
            <IconButton disabled>
              <LocationOnIcon style={{ color: "#1976D2" }} />
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
              <FactCheckIcon style={{ color: "#1976D2" }} />
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
                style={{
                  borderRadius: 8,
                  background: "#1976D2",
                  color: "white",
                }}
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
