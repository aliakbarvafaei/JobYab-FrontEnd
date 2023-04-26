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
import Bookmark from "../Bookmark/Bookmark";

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
        <Box className={className} style={{ padding: "24px" }}>
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

export default function BasicTabs(user: any) {
  const queryParams = new URLSearchParams(window.location.search);

  const [value, setValue] = React.useState(() => {
    if (queryParams.get("section")) {
      if (queryParams.get("section") === "request") {
        return 0;
      } else if (queryParams.get("section") === "information") {
        return 1;
      } else if (queryParams.get("section") === "message") {
        return 2;
      } else if (queryParams.get("section") === "bookmark") {
        return 3;
      } else return 0;
    } else return 0;
  });

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box style={{ width: "100%", fontFamily: "IRANSans" }}>
      <Box
        className="sm:px-[10px] smmin:px-[80px]"
        style={{
          borderColor: "divider",
          backgroundColor: "white",

          boxShadow: "0 4px 8px 0 rgba(0,0,0,.12), 0 2px 4px 0 rgba(0,0,0,.08)",
          position: "relative",
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
            label="درخواست‌های من"
            {...a11yProps(0)}
            style={{
              borderBottom: value === 0 ? 5 : 0,
              fontFamily: "IRANSans",
            }}
          />
          <Tab
            label="اطلاعات"
            {...a11yProps(1)}
            style={{
              borderBottom: value === 1 ? 5 : 0,
              fontFamily: "IRANSans",
            }}
          />
          <Tab
            label="پیام‌ها"
            {...a11yProps(2)}
            style={{
              borderBottom: value === 2 ? 5 : 0,
              fontFamily: "IRANSans",
            }}
          />
          <Tab
            label="نشان شده‌ها"
            {...a11yProps(3)}
            style={{
              borderBottom: value === 3 ? 5 : 0,
              fontFamily: "IRANSans",
            }}
          />
          <div className="mr-auto flex items-center">
            <Menu
              style={{ marginTop: "45px" }}
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
      <TabPanel value={value} index={0} className="min-h-[80.9vh] bg-tabBg">
        <Request />
      </TabPanel>
      <TabPanel value={value} index={1} className="min-h-[80.9vh] bg-tabBg">
        <Information user={user.user} />
      </TabPanel>
      <TabPanel value={value} index={2} className="min-h-[80.9vh] bg-tabBg">
        <Messages />
      </TabPanel>
      <TabPanel value={value} index={3} className="min-h-[80.9vh] bg-tabBg">
        <Bookmark />
      </TabPanel>
    </Box>
  );
}
