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
  className: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={className} sx={{ py: 1 }}>
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
            label="درخواست‌های ارسالی"
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
      <TabPanel value={value} index={0} className="">
        <Content index={0} />
      </TabPanel>
      <TabPanel value={value} index={1} className="">
        <Content index={1} />
      </TabPanel>
      <TabPanel value={value} index={2} className="">
        <Content index={2} />
      </TabPanel>
    </Box>
  );
}
