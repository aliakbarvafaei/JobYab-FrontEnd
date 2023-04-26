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
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import { useDispatch } from "react-redux";
import { useToast } from "../../contexts/ToastState";
import { addItemOnce } from "../../ts/functions";
import { eachToast } from "../../ts/interfaces";
import { useHistory } from "react-router-dom";

const pages = [
  { title: "آگهی جدید", link: "/profile-company/new-post" },
  { title: "پشتیبانی", link: "/profile-company?section=message" },
];
const settings = [
  { title: "آگهی‌های من", link: "/profile-company?section=mypost" },
  { title: "درخواست‌ها", link: "/profile-company?section=request" },
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
      className="lg:px-[20px] lgmin:px-[80px]"
      style={{
        fontFamily: "IRANSans",
        minHeight: "90px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl" style={{ padding: "0px !important" }}>
        <Toolbar
          disableGutters
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className="md:hidden mdmin:flex"
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOBYAB
          </Typography>

          <Box
            className="md:flex mdmin:hidden"
            style={{
              flexGrow: 1,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              style={{ padding: "0px" }}
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
              className="md:block mdmin:hidden"
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    window.location.href = page.link as string;
                  }}
                  className="block hoverItem"
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
            className="md:flex mdmin:hidden md:text-[16px] mdmin:text-[20px]"
            style={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOBYAB
          </Typography>

          <Box style={{ flexGrow: 0 }}>
            <Button
              variant="contained"
              href="/profile-company/new-post"
              className="md:hidden mdmin:inline px-[10px]"
              style={{
                backgroundColor: "white",
                color: "black",
                fontFamily: "IRANSans",
                marginLeft: "20px",
                marginRight: "20px",
                padding: "5px",
                borderRadius: "4px ",
              }}
            >
              + ثبت آگهی
            </Button>
            <Button
              key="نشان شده‌ها"
              href="/profile-company?section=bookmark"
              className="md:hidden mdmin:inline-flex"
              style={{
                marginTop: "2px",
                marginBottom: "2px",
                color: "white",
                gap: "5px",
                paddingLeft: "20px",
                fontFamily: "IRANSans",
              }}
            >
              <BookmarksOutlinedIcon />
              نشان شده‌ها
            </Button>
            <Button
              key="پشتیبانی"
              href="/profile-company?section=message"
              onClick={handleCloseNavMenu}
              className="md:hidden mdmin:inline-flex"
              style={{
                marginTop: "2px",
                marginBottom: "2px",
                color: "white",
                gap: "5px",
                paddingLeft: "20px",
                fontFamily: "IRANSans",
              }}
            >
              <ContactSupportIcon />
              پشتیبانی
            </Button>
            <Tooltip title="حساب کاربری">
              <IconButton
                onClick={handleOpenUserMenu}
                style={{ padding: 0 }}
                disableFocusRipple
                disableTouchRipple
                disableRipple
              >
                <Avatar
                  className="md:w-[30px] md:h-[30px] md:text-[0.8rem] mdmin:w-[40px] mdmin:h-[40px] mdmin:text-[1.25rem]"
                  src="/static/images/avatar/2.jpg"
                />
                <div className="text-[14px] pr-2 text-white md:hidden">
                  حساب کاربری
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              style={{ marginTop: "45px", border: "none" }}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.title}
                    className="text-primary hover:text-white hover:bg-primary px-[10px] py-[6px] block hoverItem"
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
              </div>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
