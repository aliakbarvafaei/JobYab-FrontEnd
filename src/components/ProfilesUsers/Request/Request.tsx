import { Box } from "@mui/material";
import React from "react";
import BasicTabs from "./TabRequest";

const Request: React.FC = () => {
  return (
    <Box className="mdmin:mx-[15%]" sx={{ fontFamily: "IRANSans" }}>
      <h1 className="text-[20px]">درخواست‌ها</h1>
      <BasicTabs />
    </Box>
  );
};

export default Request;
