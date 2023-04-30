import React, { useState } from "react";

import {
  IconButton,
  Box,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function OrderSummaryMenuItems(props) {
  
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
      </>
    );
  };

  return (
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
          Menu
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            my: 1,
          }}
        >
          <Typography variant="body2">$18.90</Typography>
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}></Box>
      <QtyControl />
    </Box>
  );
}
