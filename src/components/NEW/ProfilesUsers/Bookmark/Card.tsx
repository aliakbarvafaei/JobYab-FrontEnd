import React, { useState } from "react";
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

const CardItem: React.FC = () => {
  const [labels] = useState<Array<string>>(["React", "Node", "Python"]);

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
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={"20px"}
          sx={{
            px: { xs: "2px", sm: 4, md: 10 },
            py: 1,
            height: "30%",
            bgcolor: "background.default",
          }}
        >
          {labels.map((item, index) => {
            return (
              <Typography
                component={"span"}
                sx={{
                  backgroundColor: "#555555",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "10px",
                  padding: "1%",
                  margin: "2px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {item}
              </Typography>
            );
          })}
        </Stack>
      </Box>

      <Button
        className="smmin:w-[12%] sm:w-[15%]"
        sx={{
          backgroundColor: "red",
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
        حذف
      </Button>
    </Card>
  );
};

export default CardItem;
