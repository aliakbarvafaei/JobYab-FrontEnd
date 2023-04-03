import { Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "./Card";

const MyPosts: React.FC = () => {
  return (
    <Box className="mdmin:mx-[15%]" sx={{ fontFamily: "IRANYekan" }}>
      <h1 className="text-[20px]">آگهی‌های من</h1>
      <Box
        sx={{
          backgroundColor: "#d8dbe2",
          marginTop: "10px",
          paddingY:"20px",
          fontSize: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {true ? (
          <>
            <CardItem />
            <CardItem />
            <CardItem />
          </>
        ) : (
          <>
            <SearchIcon sx={{ fontSize: "4rem", color: "gray" }} />
            لیست آگهی‌های این بخش خالی است
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyPosts;
