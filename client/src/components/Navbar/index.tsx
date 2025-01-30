import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { logout as userLogout } from "../../redux/slices/userSlice";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  DashboardCustomize,
} from "@mui/icons-material";
import { InfoIcon } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const ResponsiveNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated: isUserAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const isAuthenticated = isUserAuthenticated;

  // Handle screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Toggle sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Open/close profile menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    if (isUserAuthenticated) {
      dispatch(userLogout());
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, route: "/" },
    { text: "About", icon: <InfoIcon />, route: "/about" },
    isAuthenticated && { text: "Chat", route: "/chat" },
    isAuthenticated && { text: "Create Group", route: "/create-group" },
    !isAuthenticated && { text: "Login/Signup", route: "/user/auth" },
  ].filter(Boolean);

  const profileMenuItems = [
    { text: "Dashboard", icon: <DashboardCustomize />, route: "/dashboard" },

    { text: "Logout", icon: <LogoutIcon />, action: handleLogout },
  ];

  const renderMenuItems = () =>
    menuItems.map((item: any, index) => (
      <ListItem
        key={index}
        component="li"
        onClick={item.action || (() => navigate(item.route))}
        sx={{
          "&:hover": { backgroundColor: "#0f86e0" },
          color: "white",
        }}
      >
        {item.icon && <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.text} />
      </ListItem>
    ));

  const renderProfileMenuItems = () =>
    profileMenuItems.map((item, index) => (
      <ListItem
        key={index}
        component="li"
        onClick={item.action || (() => navigate(item.route))}
        sx={{
          "&:hover": { backgroundColor: "#0f86e0" },
          color: "white",
        }}
      >
        {item.icon && <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.text} />
      </ListItem>
    ));

  // Reset the profile menu on page load or after logout
  useEffect(() => {
    setAnchorEl(null); // Ensure profile menu is closed after logout or sign-up
  }, [isAuthenticated]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            ChatSphere
          </Typography>

          {/* Navbar for large screens */}
          {!isMobile &&
            menuItems.map(
              (item: any, index) =>
                !item.action && (
                  <Button
                    key={index}
                    color="inherit"
                    onClick={() => navigate(item.route)}
                    sx={{ marginLeft: 2 }}
                  >
                    {item.text}
                  </Button>
                )
            )}

          {isAuthenticated && !isMobile && (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar alt="Profile" src="/profile-pic.jpg" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { mt: 1, backgroundColor: "#1466d8", color: "white" },
                }}
              >
                {profileMenuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={item.action || (() => navigate(item.route))}
                    sx={{ "&:hover": { backgroundColor: "#0f86e0" } }}
                  >
                    {item.icon && (
                      <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                    )}
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}

          {/* Hamburger menu for mobile */}
          {isMobile && (
            <IconButton edge="end" color="inherit" onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar for mobile */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "#1466d8",
            color: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: "white" }} />
        <List>
          {renderMenuItems()}
          {isAuthenticated && (
            <>
              <Divider sx={{ backgroundColor: "white", marginY: 1 }} />
              {renderProfileMenuItems()}
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default ResponsiveNavbar;
