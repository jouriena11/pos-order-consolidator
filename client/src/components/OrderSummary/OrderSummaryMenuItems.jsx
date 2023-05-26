import React, { useState } from "react";

import { IconButton, Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { adjQty } from "../../stores/orderSlice";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Qty +/- box
function QtyControl(props) {
  const { id, qty } = props;
  const dispatch = useDispatch()

  //const [count, setCount] = useState(qty);

  const handleIncrease = () => {
    dispatch(adjQty({
      id,
      qty: 1
    }))
  };

  const handleDecrease = () => {
    dispatch(adjQty({
      id,
      qty: -1
    }))
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
          {qty}
        </Box>
        <IconButton size="small" onClick={handleIncrease} sx={{ px: 1 }}>
          <AddIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default function OrderSummaryMenuItems(props) {
  const { menu, price } = props;
  const orderList = useSelector((state) => state.order.order_list)
  console.log(orderList)

  return (
    <>
    { orderList && orderList.map((item) => 
      (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            mx: 2,
            my: 2,
          }}
        >
          <Box sx={{ flexGrow: 1, maxWidth: "60%" }}>
            <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
              {item.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                my: 1,
              }}
            >
              <Typography variant="body2">
                {`$${item.price.toLocaleString('en-AU', {minimumFractionDigits: 2})}`}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          <QtyControl qty={item.qty} id={item.id}/>
        </Box>
    ))}
    </>
  );
}
