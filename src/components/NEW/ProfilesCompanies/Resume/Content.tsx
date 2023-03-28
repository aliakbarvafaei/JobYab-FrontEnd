import { Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Content: React.FC = () => {
  return (
    <Box sx={{ fontFamily: "IRANYekan",paddingX:"0px" }}>
      <Box
        sx={{
          backgroundColor: "#d8dbe2",
          paddingX:"0px",
          marginTop: "10px",
          minHeight: "58vh",
          fontSize: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchIcon sx={{ fontSize: "4rem", color: "gray" }} />
        لیست آگهی‌های این بخش خالی است
      </Box>
    </Box>
  );
};

export default Content;
