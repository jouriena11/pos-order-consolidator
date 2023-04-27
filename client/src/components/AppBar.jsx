import React, { useState } from "react";
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

import OrderSummaryDrawer from "./OrderSummaryDrawer";

// TODO: JavaScript function to be in which folder? src/utils?
// TODO: if OrderSummaryDrawer is open (i.e. on mobile screen), it should be automatically closed when a user tabs the hamburger icon
// Also, 'Order Consolidator' title, the search bar, the 'pending order', and menu cards should be hidden, whereas the notification icon is pushed to the left

const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// TODO: why is (({ theme, open }) outside the styled() if they're the same block of codes?
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  })
}));

// Search Bar
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
  },
  {
    name: "Profile",
    subMenus: ["Update Profile", "Change Password"],
    icon: <AccountBoxIcon />,
  },
  {
    name: "Menu",
    subMenus: ["Add New Menu", "Update Menu", "Delete Menu"],
    icon: <RestaurantIcon />,
  },
  {
    name: "Report",
    subMenus: ["Order Status"],
    icon: <AssessmentIcon />,
  },
];

const MainDrawerMenu2 = [
  {
    name: "Log out",
    icon: <LogoutIcon />,
  },
];

export default function NavBar() {
  const theme = useTheme(); // TODO: what if the mainTheme specified in App.jsx is to be used?
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(-1);
  const [openOrderSummaryMenu, setOpenOrderSummaryMenu] = useState(false);

  const handleMainDrawerOpen = () => {
    setOpen(true);
  };

  const handleMainDrawerClose = () => {
    setOpen(false);
  };

  const handleOrderSummaryDrawerOpen = () => {
    setOpenOrderSummaryMenu(true);
  };

  const handleOrderSummaryDrawerClose = () => {
    setOpenOrderSummaryMenu(false);
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
            if (menu.subMenus) {
              return (
                <div key={index}>
                  <ListItemButton
                    onClick={() => setOpenMenu(openMenu === index ? -1 : index)}
                  >
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.name} />
                    {openMenu === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={openMenu === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {menu.subMenus.map((subMenu, subIndex) => (
                        <ListItemButton key={subIndex} sx={{ pl: 9 }}>
                          <ListItemText primary={subMenu} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </div>
              );
            } else {
              return (
                <ListItemButton key={index}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItemButton>
              );
            }
          })}
        </List>

        <Divider />

        <List>
          {MainDrawerMenu2.map((menu, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </>
  )

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
          <Typography variant="h6" noWrap component="div" sx={{fontWeight: "700"}}>
            POS Order Page
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Menu search"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Pending Orders" arrow>
            <IconButton color="inherit">
              <PendingActionsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications" arrow>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
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
        </Toolbar>
      </AppBar>

      <OrderSummaryDrawer
        open={openOrderSummaryMenu}
        onClose={handleOrderSummaryDrawerClose}
      />

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

      {/* <Main open={open}>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main> */}
    </Box>
  );
}
