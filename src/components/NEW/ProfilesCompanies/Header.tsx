import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { useDispatch } from "react-redux";
import { useToast } from "../../../contexts/ToastState";
import { addItemOnce } from "../../../ts/functions";
import { eachToast } from "../../../ts/interfaces";
import { useHistory } from "react-router-dom";

const pages = [
  { title: "آگهی جدید", link: "/profile-company/new-post" },
  { title: "پشتیبانی", link: "/profile-company?section=message" },
];
const settings = [
  { title: "درخواست‌ها", link: "/profile-company?section=request" },
  { title: "آگهی‌های من", link: "/profile-company?section=mypost" },
  { title: "اطلاعات", link: "/profile-company?section=information" },
  { title: "خروج", link: "/" },
];

const Header = () => {
  const dispatch = useDispatch();
  const { setToastState } = useToast();
  const history = useHistory();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        fontFamily: "IRANSans",
        paddingX: { sm: "80px", xs: "20px" },
        minHeight: "90px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl" sx={{ padding: "0px !important" }}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOBYAB
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ padding: "0px !important" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    window.location.href = page.link as string;
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontSize: { xs: "16px", sm: "20px" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOBYAB
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="contained"
              href="/profile-company/new-post"
              sx={{
                backgroundColor: "white",
                color: "black",
                fontFamily: "IRANSans",
                display: { xs: "none", md: "inline" },
              }}
            >
              + ثبت آگهی
            </Button>
            <Button
              key="پشتیبانی"
              href="/profile-company?section=message"
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "#e0e5eb",
                gap: "5px",
                paddingLeft: "20px",
                fontFamily: "IRANSans",
                display: { xs: "none", md: "inline-flex" },
              }}
            >
              <ContactSupportIcon />
              پشتیبانی
            </Button>
            <Tooltip title="حساب کاربری">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    width: { xs: "30px", sm: "40px" },
                    height: { xs: "30px", sm: "40px" },
                    fontSize: { xs: "0.8rem", sm: "1.25rem" },
                  }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/2.jpg"
                />
                <div className="text-[14px] pr-2 text-[#e0e5eb] md:hidden">
                  حساب کاربری
                </div>
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={() => {
                    if (setting.title === "خروج") {
                      history.push("/home");
                      handleCloseUserMenu();
                      dispatch({ type: "logout" });
                      localStorage.setItem("token_user", JSON.stringify(""));
                      setToastState((old: Array<eachToast>) =>
                        addItemOnce(old.slice(), {
                          title: "1",
                          description: "خروج با موفقیت انجام شد",
                          key: Math.random(),
                        })
                      );
                    } else {
                      window.location.href = setting.link as string;
                    }
                  }}
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
