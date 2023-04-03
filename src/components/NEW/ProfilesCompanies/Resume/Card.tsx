import React from "react";
import {
  Typography,
  Stack,
  Box,
  Card,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const CardItem: React.FC<{ index: Number }> = ({ index }) => {
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
          <Avatar
            variant="circular"
            src="avatar1.jpg"
            sx={{ display: { xs: "none", sm: "flex" } }}
          />
          {/* <Woman2OutlinedIcon sx={{ color: "#00000099", fontSize: "45px" }}/> */}
          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
              color="#1976D2"
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
                توسعه دهنده ارشد Front End
              </Typography>
              <Typography
                component={"span"}
                sx={{
                  color: "#00000099",
                  fontSize: { xs: "8px", sm: "9px", md: "10px" },
                  marginRight: "5px",
                }}
              >
                28 روز پیش
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
              تهران, تهران
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
              قرارداد تمام‌ وقت (حقوق توافقی)
            </Typography>
          </Stack>
          <Box
            sx={{
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              color: "#00000099",
              fontSize: { xs: "8px", sm: "12px" },
              textAlign: "center",
              cursor: "pointer",
            }}
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
            علی اکبر وفایی
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "IRANSans",
              fontSize: { xs: "8px", sm: "12px" },
            }}
          >
            <LocationOnIcon sx={{ color: "grey[500]", fontSize: "16px" }} /> قم,
            قم
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
            23 ساله
          </Typography>
        </Stack>
      </Box>
      {index === 0 ? (
        <Button
          className="smmin:w-[12%] sm:w-[15%]"
          sx={{
            backgroundColor: "#1976D2",
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
            backgroundColor: "green",
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
          پذیرفته شد
        </Button>
      )}
    </Card>
  );
};

export default CardItem;
