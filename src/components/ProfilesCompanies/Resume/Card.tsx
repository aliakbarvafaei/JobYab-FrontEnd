import React from "react";
import { Typography, Stack, Box, Card, Divider, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { reciveResume } from "../../../ts/interfaces";
import { API_URL } from "../../../config";
import { changeStateResume } from "../../../services/api";
import DefaultPicture from "../../../assets/images/default.png";
import DifferenceData from "../../../services/utils/DifferenceData";
import { useHistory } from "react-router-dom";
import { accessToken } from "../../../ts/functions";
import { useDispatch } from "react-redux";

const CardItem: React.FC<{ index: Number; item: reciveResume }> = ({
  index,
  item,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const changeState = (state: number) => {
    accessToken(dispatch);
    changeStateResume(item.id, { state: String(state) })
      .then((response) => {
        window.location.href = "/profile-company?section=request";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card
      className="sm:w-[95%] smmin:w-[80%]"
      style={{
        height: "135px",
        fontFamily: "IRANSans",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box className="smmin:w-[88%] sm:w-[85%]">
        <Box
          className="sm:py-[8px] smmin:py-[16px] sm:px-[6px] md:px-[16px] mdmin:px-[32px]"
          style={{
            height: "70%",
            display: "flex",
            gap: "10%",
          }}
        >
          <img
            onClick={() => history.push(`/postPage/${item.post.id}`)}
            src={
              item.post.user.logo === null
                ? DefaultPicture
                : API_URL.split("api")[0] + (item.post.user.logo as string)
            }
            alt=""
            className="rounded-[50%] sm:w-[40px] sm:h-[40px] smmin:w-[70px] smmin:h-[70px]"
          />
          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
              color="var(--primary)"
              style={{
                fontFamily: "IRANSans",

                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                onClick={() => history.push(`/postPage/${item.post.id}`)}
                component={"div"}
                className="sm:text-[12px] md:text-[14px] mdmin:text-[16px]"
                style={{
                  display: "inline",
                }}
              >
                {item.post.title}
              </Typography>
              <Typography
                component={"span"}
                className="sm:text-[8px] md:text-[9px] mdmin:text-[10px]"
                style={{
                  color: "var(--lightBlack)",

                  marginRight: "5px",
                }}
              >
                <span>{DifferenceData(item.sent_date)}</span>
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="sm:text-[8px] md:text-[10px] mdmin:text-[12px]"
              style={{
                fontFamily: "IRANSans",
              }}
            >
              <LocationOnIcon
                style={{ color: "grey[500]", fontSize: "16px" }}
              />{" "}
              {item.post.city.title}, {item.post.state.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="sm:text-[8px] md:text-[10px] mdmin:text-[12px]"
              style={{
                fontFamily: "IRANSans",
              }}
            >
              <FactCheckOutlinedIcon
                style={{ color: "grey[500]", fontSize: "16px" }}
              />{" "}
              {item.post.cooperation_type} ({item.post.salary})
            </Typography>
          </Stack>
          <Box
            className="sm:text-[8px] smmin:text-[12px]"
            style={{
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              color: "var(--lightBlack)",

              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() =>
              (window.location.href = API_URL.split("api")[0] + item.resume)
            }
          >
            <DownloadOutlinedIcon className="sm:text-[25px] smmin:text-[35px]" />
            رزومه
          </Box>
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="sm:px-[2px] md:px-[32px] mdmin:px-[64px] py-[8px]"
          style={{
            height: "30%",
            backgroundColor: "background.default",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            className="sm:text-[8px] smmin:text-[12px]"
            style={{
              fontFamily: "IRANSans",
            }}
          >
            <DriveFileRenameOutlineOutlinedIcon
              style={{ color: "grey[500]", fontSize: "16px" }}
            />{" "}
            {item.user.full_name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="sm:text-[8px] smmin:text-[12px]"
            style={{
              fontFamily: "IRANSans",
            }}
          >
            <EmailIcon style={{ color: "grey[500]", fontSize: "16px" }} />{" "}
            {item.user.data.username}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="sm:text-[8px] smmin:text-[12px]"
            style={{
              fontFamily: "IRANSans",
            }}
          >
            <FactCheckOutlinedIcon
              style={{ color: "grey[500]", fontSize: "16px" }}
            />{" "}
            {item.user.phone_number}
          </Typography>
        </Stack>
      </Box>
      {index === 0 ? (
        <Button
          className="smmin:w-[12%] sm:w-[15%] sm:text-[10px] smmin:text-[14px] hover:opacity-50 hover:bg-black"
          onClick={() => changeState(2)}
          style={{
            backgroundColor: "var(--primary)",
            color: "white",

            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
          }}
        >
          در حال بررسی
        </Button>
      ) : index === 1 ? (
        <Box
          className="smmin:w-[12%] sm:w-[15%]"
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Button
            onClick={() => changeState(3)}
            className="sm:text-[10px] smmin:text-[14px] hover:opacity-50 hover:bg-black"
            style={{
              backgroundColor: "green",
              color: "white",
              height: "50%",

              fontFamily: "IRANSans",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
              minWidth: "0px",
            }}
          >
            پذیرش
          </Button>
          <Button
            onClick={() => changeState(4)}
            className="sm:text-[10px] smmin:text-[14px] hover:opacity-50 hover:bg-black"
            style={{
              backgroundColor: "red",
              color: "white",
              height: "50%",

              fontFamily: "IRANSans",
              borderTopRightRadius: "0px",
              borderTopLeftRadius: "0px",
              borderBottomRightRadius: "0px",
              minWidth: "0px",
            }}
          >
            رد
          </Button>
        </Box>
      ) : (
        <Button
          className="smmin:w-[12%] sm:w-[15%] sm:text-[10px] smmin:text-[14px] hover:opacity-50 hover:bg-black"
          style={{
            backgroundColor: `${item.state === "رد شده" ? "red" : "green"}`,
            color: "white",

            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
          }}
        >
          {item.state === "رد شده" ? "رد شد" : "پذیرفته شد"}
        </Button>
      )}
    </Card>
  );
};

export default CardItem;
