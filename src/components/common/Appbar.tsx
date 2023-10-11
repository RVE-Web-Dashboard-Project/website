import { PersonOutlineOutlined } from "@mui/icons-material";
import { AppBar, Box, Button, Container, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";

import { WebsiteName } from "../../styles/theme";

export default function Appbar() {
  const settings: {[key: string]: string} = useMemo(() => ({
    "Placeholder": "/",
    "Log out": "/logout",
  }), []);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <SiteTitle />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={"Profile"}>
              <IconButton
                onClick={handleOpenUserMenu}
              >
                <PersonOutlineOutlined fontSize="large" htmlColor={theme.palette.primary.contrastText} />
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
              open={Boolean(anchorElUser)}
              onClick={handleCloseUserMenu}
              onClose={handleCloseUserMenu}
            >
              {Object.keys(settings).map((key) => (
                <MenuItem key={key} component={Link} href={settings[key]}>
                  <Typography textAlign="center">{key}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

function SiteTitle() {
  return (
    <Button
      component={Link}
      href="/"
      color="inherit"
      mr={2}
      sx={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none", padding: "4px 8px" }}
    >
      <Typography
        variant="h5"
        noWrap
        sx={{
          fontFamily: "'Roboto Mono Variable', sans-serif",
          fontWeight: 700,
          letterSpacing: ".2rem",
        }}
      >
        {WebsiteName}
      </Typography>
    </Button>
  );
}