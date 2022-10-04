import * as React from "react";
import axios from "axios";
import {AppBar, CircularProgress, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import MenuIcon from "@mui/icons-material/Menu";
import { useOperation, useOperationMethod } from "react-openapi-client";
import AppTitleAndLogo from "./AppTitleAndLogo";

const pages = [{ text: "Home", url: "/" }];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [endSession] = useOperationMethod("endSession");
  const { loading, data, error } = useOperation("getSession");

  let userName = null;
  let userId = 0;
  let settings = {};

  const HandleSignOut = async () => {
    await endSession();
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      axios.get("/");
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (loading) {
    return <div><CircularProgress /></div>;
  }

  if (error) {
    userName = null;
    userId = 0;
    settings = [
      { text: "Login", url: "users/sign_in" },
      { text: "Signup", url: "users/sign_up" },
    ];
  } else {
    userName = data.name;
    userId = data.id;
    settings = [{ text: "Logout", url: null }];
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppTitleAndLogo display={{ xs: "none", md: "flex" }} variant="h6" flexGrow={0} />

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                  key={page.text}
                  onClick={handleCloseNavMenu}
                  href={page.url}
                >
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AppTitleAndLogo display={{ xs: "flex", md: "none" }} variant ="h5" flexGrow={1}/>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={handleCloseNavMenu}
                href={page.url}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Manage session">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName} src={`/avatar/${userId}.jpg`} />
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
                <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                  {setting.url == null ? (
                    <Button onClick={HandleSignOut}>
                      <Typography textAlign="center">{setting.text}</Typography>
                    </Button>
                  ) : (
                    <Button href={setting.url}>
                      <Typography textAlign="center">{setting.text}</Typography>
                    </Button>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
