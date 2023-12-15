import { PersonOutlineOutlined } from "@mui/icons-material";
import { AppBar, Box, Button, Container, IconButton, Link, Menu, MenuItem, styled, Toolbar, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";

import { useLogout } from "../../repository/api/useLogout";
import { useGetOrFetchMe } from "../../repository/commands/useGetOrFetchMe";
import { WebsiteName } from "../../styles/theme";
import { BrokerConnectionIcon } from "./BrokerConnectionIcon";

export default function Appbar() {
  const { user } = useGetOrFetchMe();
  const { logoutCommand } = useLogout();

  const settings: {[key: string]: string} = useMemo(() => {
    let defaultPages: Record<string, string> = {
    };
    if (user?.isAdmin) {
      defaultPages = {
        "Manage users": "/admin/users",
        ...defaultPages,
      };
    }
    return defaultPages;
  }, [user?.isAdmin]);

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

          <RightIconsContainer>
            <BrokerConnectionIcon />

            <Tooltip title={user?.name ?? "Profile"}>
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
              {user && (
                <MenuItem key="logout" onClick={logoutCommand}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </RightIconsContainer>

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

const RightIconsContainer = styled(Box)(({ theme }) => ({
  flexGrow: 0,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(4),

  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(1),
  },
}));
