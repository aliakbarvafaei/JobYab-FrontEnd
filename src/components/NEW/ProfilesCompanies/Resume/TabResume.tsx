import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Content from "./Content";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx: object;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, sx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 1, ...sx }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", fontFamily: "IRANSans" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable auto tabs example"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& button": {
              fontSize: { xs: "10px", sm: "14px" },
              padding: { xs: "4px 8px", sm: "12px 16px" },
              minWidth: "60px !important",
            },
          }}
        >
          <Tab
            label="رزومه‌های دریافتی"
            {...a11yProps(0)}
            sx={{ fontFamily: "IRANSans" }}
          />
          <Tab
            label="درحال بررسی"
            {...a11yProps(1)}
            sx={{ fontFamily: "IRANSans" }}
          />
          <Tab
            label="پذیرفته یا رد"
            {...a11yProps(2)}
            sx={{ fontFamily: "IRANSans" }}
          />
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
        sx={{ backgroundColor: "#e0e5eb" }}
      >
        <Content index={0} />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        sx={{ backgroundColor: "#e0e5eb"}}
      >
        <Content index={1} />
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        sx={{ backgroundColor: "#e0e5eb" }}
      >
        <Content index={2} />
      </TabPanel>
    </Box>
  );
}
