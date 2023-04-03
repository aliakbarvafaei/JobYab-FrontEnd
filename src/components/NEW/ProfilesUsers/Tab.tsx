import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Request from "./Request/Request";
import Information from "./Information/Information";
import Messages from "../Messages/Messages";

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
        <Box sx={{ p: 3, ...sx }}>
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

const level = ["ارتقای سطح"];

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ width: "100%", fontFamily: "IRANSans" }}>
      <Box
        sx={{
          // borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
          paddingX: { sm: "80px", xs: "10px" },
          boxShadow: "0 4px 8px 0 rgba(0,0,0,.12), 0 2px 4px 0 rgba(0,0,0,.08)",
          position: "relative",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="درخواست‌های من"
            {...a11yProps(0)}
            sx={{ borderBottom: value === 0 ? 5 : 0, fontFamily: "IRANSans" }}
          />
          <Tab
            label="اطلاعات"
            {...a11yProps(1)}
            sx={{ borderBottom: value === 1 ? 5 : 0, fontFamily: "IRANSans" }}
          />
          <Tab
            label="پیام‌ها"
            {...a11yProps(2)}
            sx={{ borderBottom: value === 2 ? 5 : 0, fontFamily: "IRANSans" }}
          />
          <div className="mr-auto flex items-center">
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {level.map((level) => (
                <MenuItem key={level} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{level}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
        sx={{
          backgroundColor: "#e0e5eb",
          minHeight: "80.9vh",
        }}
      >
        <Request />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        sx={{
          backgroundColor: "#e0e5eb",
          minHeight: "80.9vh",
        }}
      >
        <Information />
      </TabPanel>
      <TabPanel
        value={value}
        index={2}
        sx={{
          backgroundColor: "#e0e5eb",
          minHeight: "80.9vh",
        }}
      >
        <Messages />
      </TabPanel>
    </Box>
  );
}
