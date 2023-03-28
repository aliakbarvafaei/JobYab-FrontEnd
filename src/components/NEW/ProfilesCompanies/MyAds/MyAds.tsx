import { Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const MyAds: React.FC = () => {
  return (
    <Box className="mdmin:mx-[15%]" sx={{ fontFamily: "IRANYekan" }}>
      <h1 className="text-[20px]">آگهی‌های من</h1>
      <Box
        sx={{
          backgroundColor: "#d8dbe2",
          marginTop: "10px",
          minHeight: "70vh",
          fontSize: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchIcon sx={{ fontSize: "4rem", color: "gray" }} />
        لیست آگهی‌های شما خالی است
      </Box>
    </Box>
  );
};

export default MyAds;
