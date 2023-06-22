import { Button, Grid, IconButton, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useRef } from "react";
import { PostType } from "../../../constants/types";
import { RemoveBookmark, postBookmark } from "../../../services/api";
import { useToast } from "../../../contexts/ToastState";
import { accessToken, addItemOnce } from "../../../ts/functions";
import { eachToast, statesRedux } from "../../../ts/interfaces";
// import DefaultPicture from "../../assets/images/default.png";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import BookmarkIcon from "@mui/icons-material/Bookmark";

interface DetailHeaderProps {
  onclick?: () => void;
  haveCompanyDetail?: boolean;
  data?: PostType;
  updateData?: () => void;
}
const DetailHeader = ({
  onclick,
  haveCompanyDetail = true,
  data,
  updateData,
}: DetailHeaderProps) => {
  const windowWidth = useRef(window.innerWidth);
  const { setToastState } = useToast();
  const history = useHistory();
  const { token } = useSelector((state: statesRedux) => state.userAuth);
  const dispatch = useDispatch();
  
  return (
    <Grid
      className=" sm:mr-1 sm:ml-1 md:mr-10 md:ml-10 xl:ml-3 xl:mr-3 xlmin:mr-20 xlmin:ml-20"
      style={{
        border: "1.5px solid var(--primary)",
        height: 200,
        borderRadius: 12,
        marginTop: 10,
        position: "relative",
        backgroundImage:
          "linear-gradient(to left top,var(--primary),var(--primary),var(--primary)",
      }}
    >
      <Grid
        className="flex items-center absolute -bottom-3"
        style={{ right: windowWidth.current > 450 ? 40 : 20 }}
      >
        <Grid>
          <img
            src={
              data?.user.logo === null
                ? // todo....
                  "../../assets/images/default.png"
                : API_URL.split("api")[0] + (data?.user.logo as string)
            }
            alt=""
            style={{
              borderRadius: "50%",
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
              {data?.title}
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
                    {data?.user.company_persian_name}
                  </Typography>
                </Grid>
              </Grid>

              {/* <Grid item style={{ display: "flex", alignItems: "center" }}>
                <Grid item>
                  <IconButton disabled>
                    <LocationOnIcon style={{ color: "white" }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography style={{ fontSize: 12, color: "white" }}>
                    {`${data?.state.title}, ${data?.city.title}`}
                  </Typography>
                </Grid>
              </Grid> */}
            </>
          ) : null}
        </Grid>
      </Grid>
      <Grid item className="absolute left-0 bottom-3">
        {haveCompanyDetail && (
          <>
            <Button
              variant="contained"
              className="!ml-[5px] !bg-white !text-primary"
              onClick={onclick}
            >
              اطلاعات شرکت
            </Button>

            <IconButton
              style={{ marginLeft: 5, padding: 5 }}
              disabled={!token}
              onClick={() => {
                accessToken(dispatch);
                if (data?.is_bookmark) {
                  RemoveBookmark(data.id || 0)
                    .then((res) => {
                      if (res.status === 204) {
                        setToastState((old: Array<eachToast>) =>
                          addItemOnce(old.slice(), {
                            title: "1",
                            description:
                              "آگهی با موفقیت از لیست نشان شده‌ها حذف شد.",
                            key: Math.random(),
                          })
                        );
                        updateData?.();
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
                } else {
                  postBookmark(data?.id.toString() ?? "")
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
                        updateData?.();
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
                }
              }}
            >
              {data?.is_bookmark ? (
                <BookmarkIcon className={token ? "text-white" : "text-gray"} />
              ) : (
                <BookmarkBorderOutlinedIcon
                  className={token ? "text-white" : "text-gray"}
                />
              )}{" "}
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
};
export default DetailHeader;
