import { Box } from "@mui/material";
import React from "react";
import BasicTabs from "./TabResume";

const Resume: React.FC = () => {
  return (
    <Box className="mdmin:mx-[15%]" style={{ fontFamily: "IRANSans" }}>
      <h1 className="text-[20px]">رزومه ها</h1>
      <BasicTabs />
    </Box>
  );
};

export default Resume;
