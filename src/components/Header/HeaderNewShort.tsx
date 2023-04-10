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
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const pages = [
  { title: "نشان شده‌ها", link: "/profile?section=bookmark" },
  { title: "پشتیبانی", link: "/profile?section=message" },
];
const settings = [
  { title: "درخواست‌ها", link: "/profile?section=request" },
  { title: "اطلاعات", link: "/profile?section=information" },
  { title: "خروج", link: "/" },
];

const HeaderNewShort = () => {
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
        minHeight: "90px",
        justifyContent: "center",
        paddingX: { sm: "80px", xs: "20px" },
        fontFamily: "IRANSans",
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
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: { xs: "16px", sm: "20px" },
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOBYAB
          </Typography>

          <Box sx={{ flexGrow: 0, alignItems: "center" }}>
            <Button
              key="جستجوی مشاغل"
              //   onClick={handleCloseNavMenu}
              href="/search"
              sx={{
                my: 2,
                color: "#e0e5eb",
                gap: "5px",
                paddingLeft: "20px",
                fontFamily: "IRANSans",
                display: { xs: "none", md: "inline-flex" },
              }}
            >
              <SearchIcon />
              جستجوی مشاغل
            </Button>
            <Button
              key="نشان شده‌ها"
              //   onClick={handleCloseNavMenu}
              href="/profile?section=bookmark"
              sx={{
                my: 2,
                color: "#e0e5eb",
                gap: "5px",
                paddingLeft: "20px",
                fontFamily: "IRANSans",
                display: { xs: "none", md: "inline-flex" },
              }}
            >
              <BookmarksOutlinedIcon />
              نشان شده‌ها
            </Button>
            <Button
              key="پشتیبانی"
              onClick={handleCloseNavMenu}
              href="/profile?section=message"
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
            {true ? (
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
            ) : (
              <Tooltip title="ورود | ثبت نام">
                <Link to="/login">
                  <IconButton sx={{ p: 0, color: "#e0e5eb" }}>
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                    <PermIdentityOutlinedIcon />
                    <div className="text-[14px] pr-2 text-[#e0e5eb] md:hidden">
                      ورود | ثبت نام
                    </div>
                  </IconButton>
                </Link>
              </Tooltip>
            )}
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
                    window.location.href = setting.link as string;
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

export default HeaderNewShort;
