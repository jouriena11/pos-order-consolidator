import React, { useState } from "react";
import {
  styled,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

const OrderSummaryDrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function OrderSummaryDrawer(props) {
  const theme = useTheme();

  const { open, onClose } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerWidth = isMobile ? "80%" : 400;

  // Customer Name Input
  const [customerName, setCustomerName] = useState("");

  const handleInputChange = (event) => {
    setCustomerName(event.target.value);
  };

  // Qty +/- box
  const QtyControl = () => {
    const [count, setCount] = useState(0);

    const handleIncrease = () => {
      setCount((prevCount) => prevCount + 1);
    };

    const handleDecrease = () => {
      setCount((prevCount) => {
        if (prevCount === 0) {
          return 0;
        } else {
          return prevCount - 1;
        }
      });
    };

    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton size="small" onClick={handleDecrease} sx={{ px: 1 }}>
            <RemoveIcon />
          </IconButton>

          <Box
            sx={{
              border: "1px solid #bdbdbd",
              borderRadius: 1,
              px: 2,
              py: "5px",
            }}
          >
            {count}
          </Box>
          <IconButton size="small" onClick={handleIncrease} sx={{ px: 1 }}>
            <AddIcon />
          </IconButton>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton size="small" onClick={handleDecrease} sx={{ px: 1 }}>
            <RemoveCircleOutlineRoundedIcon />
          </IconButton>
          <Box sx={{ px: 1 }}>{count}</Box>
          <IconButton size="small" onClick={handleIncrease} sx={{ px: 1 }}>
            <AddCircleOutlineRoundedIcon />
          </IconButton>
        </Box> */}
      </>
    );
  };

  // TODO: to align the Chevron logo to the left on mobile screen
  const drawer = (
    <>
      <OrderSummaryDrawerHeader
        sx={{
          backgroundColor: "rgb(24,118,209, 0.75)",
          display: "flex",
          justifyContent: "center",
          color: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: "inherit" }}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        )}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "700" }}
        >
          {/* to pass total items qty */}
          Order (qty)
        </Typography>
      </OrderSummaryDrawerHeader>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: 2,
          my: 2,
        }}
      >
        <Typography variant="body1">Customer Name:</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <TextField
          placeholder="Enter customer name"
          variant="outlined"
          size="small"
          type="text"
          value={customerName}
          onChange={handleInputChange}
        />
      </Box>
      <Divider />
      {/* TODO: to add order items */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          mx: 3,
          my: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1">
            Menu;aldsfjl;adskjf;lasjfdl;sk;ladfl;asjf;lk
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mx: 2,
              my: 1,
            }}
          >
            <Typography variant="body1">$18.90</Typography>
          </Box>
        </Box>
        <QtyControl />
      </Box>
    </>
  );

  return (
    // TODO: the permanent drawer is currently blocking the IconButtons on the right side of the NavBar
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      // variant="persistent"
      variant={isMobile ? "persistent" : "permanent"}
      anchor="right"
      open={open} // Note: `open` is an MUI component property that checks wheter it's `true` or `false`, then display or hide a component accordingly
      onClose={onClose} // Note: `onClose` is also an MUI component property
    >
      {drawer}
    </Drawer>
  );
}
