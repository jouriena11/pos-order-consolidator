import React, { useState, useEffect } from "react";
import { useLocation, Outlet, Link } from "react-router-dom";
import Auth from "../utils/auth";
import {
  styled,
  alpha,
  InputBase,
  useTheme,
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Badge,
  Grid,
  Container,
  useMediaQuery,
} from "@mui/material";

import MuiAppBar from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox"; // profile icon
import RestaurantIcon from "@mui/icons-material/Restaurant"; // food menu icon
import AssessmentIcon from "@mui/icons-material/Assessment"; // report icon
import SearchIcon from "@mui/icons-material/Search"; // search magnifier icon
import NotificationsIcon from "@mui/icons-material/Notifications"; // notification icon
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"; // checkout icon
import PendingActionsIcon from "@mui/icons-material/PendingActions"; // pending order icon
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen"; // Kitchen Orders icon
import PointOfSaleIcon from "@mui/icons-material/PointOfSale"; // POS Order icon
import KeyIcon from "@mui/icons-material/Key"; // Permissions icon

import OrderSummaryDrawer from "./OrderSummary/OrderSummaryDrawer";

// TODO: if OrderSummaryDrawer is open (i.e. on mobile screen), it should be automatically closed when a user tabs the hamburger icon
// TODO: Also, 'Order Consolidator' title, the search bar, the 'pending order', and menu cards should be hidden, whereas the notification icon is pushed to the left

const drawerWidth = 240;
const headerHeight = 64;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  marginTop: headerHeight,
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

// Search Bar
// TODO: to replace search bar with magnifier icon on mobile screen

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(4),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "24ch",
    },
  },
}));

// Main Drawer
const MainDrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MainDrawerMenu = [
  {
    name: "Dashboard",
    icon: <SpaceDashboardIcon />,
    link: "/dashboard",
  },
  {
    name: "POS Order",
    icon: <PointOfSaleIcon />,
    link: "/pos",
    requiredRole: ["Admin", "FOH Manager"],
    requiredStatus: "active",
  },
  {
    name: "Profile",
    subMenus: [
      {
        name: "Update Profile",
        link: "/update-profile",
      },
      {
        name: "Change Password",
        link: "/change-password",
      },
    ],
    icon: <AccountBoxIcon />,
  },
  {
    name: "Menu",
    subMenus: [
      // {
      //   name: "Category",
      //   link: "/menu-category",
      //   requiredRole: ["Admin", "FOH Manager"],
      //   requiredStatus: "active",
      // },
      // {
      //   name: "Menu",
      //   link: "/menu",
      //   requiredRole: ["Admin", "FOH Manager"],
      //   requiredStatus: "active",
      // },
      {
        name: "Add Menu Category",
        link: "/add-menu-category",
        requiredRole: ["Admin", "FOH Manager"],
        requiredStatus: "active",
      },
      {
        name: "Update/Delete Menu Category",
        link: "/update-delete-menu-category",
        requiredRole: ["Admin", "FOH Manager"],
        requiredStatus: "active",
      },
      {
        name: "Add Menu",
        link: "/add-menu",
        requiredRole: ["Admin", "FOH Manager"],
        requiredStatus: "active",
      },
      {
        name: "Update/Delete Menu",
        link: "/update-delete-menu",
        requiredRole: ["Admin", "FOH Manager"],
        requiredStatus: "active",
      },
    ],
    icon: <RestaurantIcon />,
    requiredRole: ["Admin", "FOH Manager"],
    requiredStatus: "active",
  },
  {
    name: "Kitchen Orders",
    icon: <SoupKitchenIcon />,
    link: "/kitchen-orders",
    requiredRole: ["Admin", "Kitchen Manager"],
    requiredStatus: "active",
  },
  {
    name: "Report",
    subMenus: [
      {
        name: "Order Status",
        link: "/order-status-report", // TODO: how to combine this with Express, e.g. reports/order-status-report
      },
    ],
    icon: <AssessmentIcon />,
  },
];

const MainDrawerMenu2 = [
  {
    name: "Permissions",
    icon: <KeyIcon />,
    link: "/user-permissions",
    requiredRole: "Admin",
    requiredStatus: "active",
  },
  {
    name: "Log out",
    icon: <LogoutIcon />,
  },
];

export default function NavBar() {
  const theme = useTheme(); // TODO: what if the mainTheme specified in App.jsx is to be used?
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(-1);
  const [openOrderSummary, setOpenOrderSummary] = useState(false);

  const [pageTitle, setPageTitle] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const rightDrawerWidth = isMobile ? "80%" : 380 + "px";

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width", "left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    left: 0,
    width: `calc(100% - ${
      isMobile || location !== "/pos" ? "0px" : rightDrawerWidth
    })`,
    ...(open && {
      width: `calc(100% - ${drawerWidth}px - ${
        isMobile || location !== "/pos" ? "0px" : rightDrawerWidth
      })`,
      left: `${drawerWidth}px`,
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  useEffect(() => {
    switch (location) {
      case "/pos":
        setPageTitle("POS Order");
        break;
      case "/kitchen-orders":
        setPageTitle("Kitchen Orders");
        break;
      case "/update-profile":
        setPageTitle("Update Profile");
        break;
      case "/change-password":
        setPageTitle("Change Password");
        break;
      case "/add-menu-category":
        setPageTitle("Add Menu Category");
        break;
      case "/update-delete-menu-category":
        setPageTitle("Update/Delete Menu Category");
        break;
      case "/add-menu":
        setPageTitle("Add Menu");
        break;
      case "/update-delete-menu":
        setPageTitle("Update/Delete Menu");
        break;
      case "/delete-menu":
        setPageTitle("Delete Menu");
        break;
      case "/order-status-report":
        setPageTitle("Order Status Report");
        break;
      case "/user-permissions":
        setPageTitle("User Permissions");
        break;
      default:
        setPageTitle("/");
        break;
    }
  }, [location]);

  const handleMainDrawerOpen = () => {
    setOpen(true);
  };

  const handleMainDrawerClose = () => {
    setOpen(false);
  };

  const handleOrderSummaryDrawerOpen = () => {
    setOpenOrderSummary(true);
  };

  const handleOrderSummaryDrawerClose = () => {
    setOpenOrderSummary(false);
  };

  const MainMenuDrawer = (
    <>
      <MainDrawerHeader sx={{ backgroundColor: "rgb(24,118,209, 0.75)" }}>
        <IconButton onClick={handleMainDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </MainDrawerHeader>
      <Divider />
      {/* TODO: still don't understand the logic... of setOpenMenu(openMenu === index ? -1 : index) */}
      <List>
        {MainDrawerMenu.map((menu, index) => {
          return (menu.requiredRole && menu.requiredRole.includes(Auth.getRole())) || !menu.requiredRole ? 
            (menu.subMenus ? (
              <div key={index}>
                <ListItemButton
                  onClick={() => setOpenMenu(openMenu === index ? -1 : index)}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                  {openMenu === index ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openMenu === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.subMenus.map((subMenu, subIndex) =>
                      (subMenu.requiredRole &&
                        subMenu.requiredRole.includes(Auth.getRole())) ||
                      !subMenu.requiredRole ? (
                        <Link
                          to={subMenu.link}
                          style={{ color: "inherit", textDecoration: "none" }}
                          onClick={() => {
                            setOpen(false);
                          }}
                          key={subIndex}
                        >
                          <ListItemButton sx={{ pl: 9 }}>
                            <ListItemText primary={subMenu.name} />
                          </ListItemButton>
                        </Link>
                      ) : null
                    )}
                  </List>
                </Collapse>
              </div>
            ) : (
              <Link
                to={menu.link}
                style={{ color: "inherit", textDecoration: "none" }}
                onClick={() => {
                  setOpen(false);
                }}
                key={index}
              >
                <ListItemButton>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItemButton>
              </Link>
            )
          ) : null;
        })}
      </List>

      <Divider />
      <List>
        <List>
          {MainDrawerMenu2.map((menu, index) =>
            (menu.requiredRole && Auth.getRole() === menu.requiredRole) ||
            !menu.requiredRole ? (
              <ListItem disablePadding key={index}>
                {menu.link ? (
                  <Link
                    to={menu.link}
                    style={{ color: "inherit", textDecoration: "none" }}
                    onClick={() => setOpen(false)}
                  >
                    <ListItemButton>
                      <ListItemIcon>{menu.icon}</ListItemIcon>
                      <ListItemText primary={menu.name} />
                    </ListItemButton>
                  </Link>
                ) : (
                  <ListItemButton onClick={() => Auth.logout()}>
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.name} />
                  </ListItemButton>
                )}
              </ListItem>
            ) : null
          )}
        </List>
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMainDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }} // Note: hide the hamburger icon when the drawer is open
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "700" }}
          >
            {pageTitle}
          </Typography>
          {location === "/pos" && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Menu search"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Pending Orders" arrow>
            <IconButton color="inherit">
              <PendingActionsIcon />
            </IconButton>
          </Tooltip>

          {/* TODO: to fix badge position */}
          <Tooltip title="Notifications" arrow>
            {/* <Badge badgeContent={1} color="secondary"> */}
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            {/* </Badge> */}
          </Tooltip>

          {isMobile && (
            <Tooltip title="Checkout" arrow>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleOrderSummaryDrawerOpen}
                edge="end"
                // sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <ShoppingCartCheckoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      {/* Main Drawer on the left */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {MainMenuDrawer}
      </Drawer>
      <Main open={open}>
        <Outlet />
      </Main>
      {/* Order Summary (Permanent/Persistent) Drawer on the right */}
      {location === "/pos" && (
        <OrderSummaryDrawer
          open={openOrderSummary}
          onClose={handleOrderSummaryDrawerClose}
          isMobile={isMobile}
          drawerWidth={rightDrawerWidth}
        />
      )}
    </Box>
  );
}
