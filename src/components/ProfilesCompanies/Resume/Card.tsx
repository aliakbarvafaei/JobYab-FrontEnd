import React from "react";
import {
  Typography,
  Stack,
  Box,
  Card,
  Divider,
  Button,
} from "@mui/material";
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

const CardItem: React.FC<{ index: Number; item: reciveResume }> = ({
  index,
  item,
}) => {
  const changeState = (state: number) => {
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
      sx={{
        width: { sm: "80%", xs: "95%" },
        height: "135px",
        fontFamily: "IRANSans",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box className="smmin:w-[88%] sm:w-[85%]">
        <Box
          sx={{
            py: { xs: 1, sm: 2 },
            px: { xs: "6px", sm: 2, md: 4 },
            height: "70%",
            display: "flex",
            gap: "10%",
          }}
        >
          <img
            src={
              item.post.user.logo === null
                ? DefaultPicture
                : API_URL.split("api")[0] + (item.post.user.logo as string)
            }
            alt=""
            className="rounded-[50%]"
          />
          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
              color="var(--primary)"
              sx={{
                fontFamily: "IRANSans",

                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                component={"div"}
                sx={{
                  display: "inline",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                }}
              >
                {item.post.title}
              </Typography>
              <Typography
                component={"span"}
                sx={{
                  color: "var(--lightBlack)",
                  fontSize: { xs: "8px", sm: "9px", md: "10px" },
                  marginRight: "5px",
                }}
              >
                <span>{DifferenceData(item.sent_date)}</span>
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "IRANSans",
                fontSize: { xs: "8px", sm: "10px", md: "12px" },
              }}
            >
              <LocationOnIcon sx={{ color: "grey[500]", fontSize: "16px" }} />{" "}
              {item.post.city.title}, {item.post.state.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "IRANSans",
                fontSize: { xs: "8px", sm: "10px", md: "12px" },
              }}
            >
              <FactCheckOutlinedIcon
                sx={{ color: "grey[500]", fontSize: "16px" }}
              />{" "}
              {item.post.cooperation_type} ({item.post.salary})
            </Typography>
          </Stack>
          <Box
            sx={{
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              color: "var(--lightBlack)",
              fontSize: { xs: "8px", sm: "12px" },
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() =>
              (window.location.href = API_URL.split("api")[0] + item.resume)
            }
          >
            <DownloadOutlinedIcon
              sx={{ fontSize: { xs: "25px", sm: "35px" } }}
            />
            رزومه
          </Box>
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: { xs: "2px", sm: 4, md: 8 },
            py: 1,
            height: "30%",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "IRANSans",
              fontSize: { xs: "8px", sm: "12px" },
            }}
          >
            <DriveFileRenameOutlineOutlinedIcon
              sx={{ color: "grey[500]", fontSize: "16px" }}
            />{" "}
            {item.user.full_name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "IRANSans",
              fontSize: { xs: "8px", sm: "12px" },
            }}
          >
            <EmailIcon sx={{ color: "grey[500]", fontSize: "16px" }} />{" "}
            {item.user.data.username}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "IRANSans",
              fontSize: { xs: "8px", sm: "12px" },
            }}
          >
            <FactCheckOutlinedIcon
              sx={{ color: "grey[500]", fontSize: "16px" }}
            />{" "}
            {item.user.phone_number}
          </Typography>
        </Stack>
      </Box>
      {index === 0 ? (
        <Button
          className="smmin:w-[12%] sm:w-[15%]"
          onClick={() => changeState(2)}
          sx={{
            backgroundColor: "var(--primary)",
            color: "white",
            fontSize: { xs: "10px", sm: "14px" },
            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
            "&:hover": {
              opacity: 0.5,
              backgroundColor: "black",
            },
          }}
        >
          در حال بررسی
        </Button>
      ) : index === 1 ? (
        <Box
          className="smmin:w-[12%] sm:w-[15%]"
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Button
            onClick={() => changeState(3)}
            sx={{
              backgroundColor: "green",
              color: "white",
              height: "50%",
              fontSize: { xs: "10px", sm: "14px" },
              fontFamily: "IRANSans",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
              minWidth: "0px",
              "&:hover": {
                opacity: 0.5,
                backgroundColor: "black",
              },
            }}
          >
            پذیرش
          </Button>
          <Button
            onClick={() => changeState(4)}
            sx={{
              backgroundColor: "red",
              color: "white",
              height: "50%",
              fontSize: { xs: "10px", sm: "14px" },
              fontFamily: "IRANSans",
              borderTopRightRadius: "0px",
              borderTopLeftRadius: "0px",
              borderBottomRightRadius: "0px",
              minWidth: "0px",
              "&:hover": {
                opacity: 0.5,
                backgroundColor: "black",
              },
            }}
          >
            رد
          </Button>
        </Box>
      ) : (
        <Button
          className="smmin:w-[12%] sm:w-[15%]"
          sx={{
            backgroundColor: `${item.state === "رد شده" ? "red" : "green"}`,
            color: "white",
            fontSize: { xs: "10px", sm: "14px" },
            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
            "&:hover": {
              opacity: 0.5,
              backgroundColor: "black",
            },
          }}
        >
          {item.state === "رد شده" ? "رد شد" : "پذیرفته شد"}
        </Button>
      )}
    </Card>
  );
};

export default CardItem;
