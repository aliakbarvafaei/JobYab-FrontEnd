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
import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const CardItem: React.FC = () => {
  return (
    <Card
      sx={{
        width: { sm: "80%", xs: "95%" },
        fontFamily: "IRANYekan",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box className="smmin:w-[88%] sm:w-[85%]">
        <Box sx={{ py: 2, px: { xs: 1, sm: 4 }, display: "flex", gap: "10%" }}>
          <Avatar
            variant="rounded"
            src="avatar1.jpg"
            sx={{ display: { xs: "none", sm: "flex" } }}
          />
          {/* <Woman2OutlinedIcon sx={{ color: "#00000099", fontSize: "45px" }}/> */}
          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
              color="#1976D2"
              sx={{
                fontFamily: "IRANYekan",
                fontSize: { xs: "12px", sm: "16px" },
              }}
            >
              توسعه دهنده ارشد Front End
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "IRANYekan",
                fontSize: { xs: "8px", sm: "12px" },
              }}
            >
              <LocationOnIcon sx={{ color: "grey[500]", fontSize: "16px" }} />{" "}
              تهران, تهران
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "IRANYekan",
                fontSize: { xs: "8px", sm: "12px" },
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
            <DownloadOutlinedIcon sx={{ fontSize: "35px" }} />
            رزومه
          </Box>
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: { xs: "2px", sm: 8 },
            py: 1,
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "IRANYekan",
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
              fontFamily: "IRANYekan",
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
              fontFamily: "IRANYekan",
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
      <Button
        className="smmin:w-[12%] sm:w-[15%]"
        sx={{
          backgroundColor: "#1976D2",
          color: "white",
          fontSize: { xs: "10px", sm: "14px" },
          fontFamily: "IRANYekan",
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
    </Card>
  );
};

export default CardItem;
