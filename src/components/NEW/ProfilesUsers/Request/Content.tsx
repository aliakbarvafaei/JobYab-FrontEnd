import { Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "./Card";

const Content: React.FC<{ index: Number }> = ({ index }) => {
  return (
    <Box sx={{ fontFamily: "IRANYekan", paddingX: "0px" }}>
      <Box
        sx={{
          backgroundColor: "#d8dbe2",
          paddingX: "0px",
          paddingY: "10px",
          marginTop: "10px",
          minHeight: "58vh",
          fontSize: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {true ? (
          <>
            <CardItem index={index}/>
            <CardItem index={index}/>
            <CardItem index={index}/>
          </>
        ) : (
          <>
            <SearchIcon sx={{ fontSize: "4rem", color: "gray" }} />
            لیست درخواست‌های این بخش خالی است
          </>
        )}
      </Box>
    </Box>
  );
};

export default Content;
