import React, { useState } from "react"
import {
  styled,
  useTheme,
  Drawer,
  IconButton,
  Divider,
  Box,
  Typography,
  TextField,
  Grid,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

import OrderSummaryMenuItems from "./OrderSummaryMenuItems";

const OrderSummaryDrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// TODO: Stripe library actually supports these payment methods -- [Apple Pay, Google Pay, Credit Card, Debit Card, Direct Debit]
const PaymentMethod = [
  {
    method: "Cash",
    icon: <AttachMoneyOutlinedIcon />,
  },
  {
    method: "Debit Card",
    icon: <CreditCardOutlinedIcon />,
  },
  {
    method: "Credit Card",
    icon: <CreditCardOutlinedIcon />,
  },
  {
    method: "Stripe",
    // icon: // TODO: to add Stripe icon -- is this available in Stripe library?
  },
];

export default function OrderSummaryDrawer(props) {
  const theme = useTheme();

  const { open, onClose, isMobile, drawerWidth } = props;

  // Customer Name Input
  const [customerName, setCustomerName] = useState("");

  const handleInputChange = (event) => {
    setCustomerName(event.target.value);
  };

  const drawer = (
    <>
      <OrderSummaryDrawerHeader
        sx={{
          backgroundColor: "rgb(24,118,209, 0.75)",
          color: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          position: 'relative'
        }}
      >
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: "inherit", position: 'absolute', left: '0px' }}>
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
          sx={{ fontWeight: "700", textAlign: 'center' }}
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
      <OrderSummaryMenuItems />
      <Divider />
      <Box
        sx={{
          ml: 2,
          mr: 7,
          my: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: "5px",
          }}
        >
          <Typography variant="body1">Subtotal</Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Typography variant="body1">$10.70</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: "5px",
          }}
        >
          <Typography variant="body1">Discount</Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          {/* TODO: to add discount box */}
          {/* <TextField
            variant="outlined"
            size="small"
            type="text"
            // value={}
            // onChange={}
          /> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: "5px",
          }}
        >
          <Typography variant="body1">GST (10%)</Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Typography variant="body1">$0.70</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 1.5,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            Total
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Typography variant="h6" sx={{ fontWeight: "700" }}>
            $0.70
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Grid container spacing={2}>
        {/* TODO: payment method */}
        {/* TODO: 'confirm payment' modal  */}
      </Grid>
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



const orderDataToSave = {
  order_status: 'On Queue', // default = 'On Queue' -- ['On Queue', 'Ready', 'Served'] -- updatable
  order_accepted_by: 'user_id', // FOH staff user_id
  order_created_at: 'timestamp', // type: Date -- to use DayJS?
  order_status_updated_by: 'user_id', // FOH Staff or Chef user_id -- when a cooking status is updated to 'Cooking Done', the order status would be automatically updated to 'Ready' 
  order_status_updated_at: 'timestamp', // type: Date -- to use DayJS? -- updatable
  cooking_status: 'On Queue', // default value -- updatable
  customer_name: 'John', // input from POS Order Page
  menu: [
    {
        id: 1,
        name: 'Caesar Salad', // TODO: should this be queried instead?
        qty: 1,
        unit_price: 14.90, // TODO: should this be queried instead?
        category: 'Salad', // TODO: should this be queried instead?
        order_created_at: 'timestamp' // the menu would be mapped and sorted by timestamp?
    }
  ],
  subtotal: 14.90,
  discount_flat: 1.49, // discount applicable to the whole bill (instead of per menu item)
  gst: 1.49,
  total: 1.22,
  payment_method: 'stripe', // TODO: must use stripe library -- ['Cash', 'Debit Card', 'Credit Card', 'Stripe']
  payment_status: 'paid' // this property key will be useful in future development where customers can pay later.
}