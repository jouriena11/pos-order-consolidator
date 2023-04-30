import React, { useState } from "react";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  FormControlLabel,
  Switch,
  Typography,
  Tooltip,
  IconButton,
  Checkbox,
  Paper,
  Collapse,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

// Data sent from FOH
const orderGetData = {
  orderId: 111,
  order_created_at: "timestramp",
  cooking_status: "On Queue",
  menu: [
    // [{},{},{}]
    {
      id: 1,
      name: "Caesar Salad",
      qty: 1,
    },
    {
      id: 2,
      name: "Rocket Salad",
      qty: 1,
    },
  ],
};

const cookingOrder = [];
// cooking status (useState('On Queue') = initial value) -- cooking status (Kitchen) !== order status (FOH)
// chef name
const orderStatus = ["Received", "Ready", "Served"];

// TODO: to modify the following sample MUI codes
function createData(name, calories, fat, price) {
  return {
    name,
    calories,
    fat,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

// cookingOrder = [{menu: , qty: },{},{}]

// function createData(order_id, order_created_at, cooking_status) {
//   return [
//     {
//       orderId: order_id,
//       orderTime: order_created_at, // for calculating time elapsed
//       order: [
//         {
//           menu: "Caesar Salad",
//           qty: 1,
//           orderTime: order_created_at,
//         },
//         {
//           menu: "Rocket Salad",
//           qty: 1,
//           orderTime: order_created_at,
//         },
//       ],
//       cooking_status
//     },
//     {
//       orderId: order_id,
//       orderTime: order_created_at, // for calculating time elapsed
//       order: [
//         {
//           menu: "Caesar Salad",
//           qty: 2,
//           orderTime: order_created_at,
//         },
//         {
//           menu: "Rocket Salad",
//           qty: 3,
//           orderTime: order_created_at,
//         },
//       ],
//     },
//   ];
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [cookingStatus, setCookingStatus] = useState("On Queue");

  const handleChange = (event) => {
    setCookingStatus(event.target.value);
  };

  const selectBgColor = (status) => {
    switch (status) {
      case "Cooking":
        return { sx: { backgroundColor: "#ffcc80" } };
      case "Done":
        return { sx: { backgroundColor: "#4dd0e1" } };
      case "Cancelled":
        return { sx: { backgroundColor: "darkgrey" } };
      default:
        return { sx: { backgroundColor: "#ff8a80" } };
    }
  };

  const statusColor = selectBgColor(cookingStatus);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">
          {/* Status dropdown */}
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId={cookingStatus}
              id={cookingStatus.split(" ").join("-").toLowerCase()}
              value={cookingStatus}
              onChange={handleChange}
              sx={statusColor.sx}
            >
              <MenuItem value="On Queue">On Queue</MenuItem>
              <MenuItem value="Cooking">Cooking</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Select order to update" arrow placement="top">
            {/* TODO: to apply parent-child checkbox */}
            <Checkbox
              label="parent"
              defaultChecked
              sx={{
                color: "grey",
                "&.Mui-checked": {
                  color: "grey",
                },
              }}
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={rowCount > 0 && numSelected === rowCount}
              // onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all orders",
              }}
            />
          </Tooltip>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Save status change" arrow placement="top">
            <IconButton sx={{ color: "grey" }}>
              {/* TODO: `cancelled` and `done` status Select component should be deactivated once selected and saved  */}
              <SaveRoundedIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      Order ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      Time of Order
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      Time Elapsed
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      Servings
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                {/* TODO: still can't get the children table columns to align with the parent's  */}
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell align="center" component="th" scope="row">
                        {/* TODO: to change value */}
                        {historyRow.date}
                      </TableCell>
                      <TableCell align="center">
                        {/* TODO: to change value */}
                        {historyRow.customerId}
                      </TableCell>
                      <TableCell align="center">{historyRow.amount}</TableCell>
                      <TableCell align="center">
                        {/* TODO: to change value */}
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          defaultChecked
                          sx={{
                            color: "grey",
                            "&.Mui-checked": {
                              color: "grey",
                            },
                          }}
                          inputProps={{
                            "aria-label": "select all orders",
                          }}
                        />
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

// order_id, order_created_at, cooking_status

// const rows = [
//   createData(111)
// ]

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99)
];

export default function KitchenOrders() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center" sx={{ fontWeight: 700 }}>
              <Tooltip title="Ordered Menu" placement="top" arrow>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Menu
                </Typography>
              </Tooltip>
            </TableCell>

            <TableCell align="center" sx={{ fontWeight: 700 }}>
              <Tooltip
                title="Elapsed time since first order"
                arrow
                placement="top"
              >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Time Elapsed&nbsp;(min)
                </Typography>
              </Tooltip>
            </TableCell>

            <TableCell align="center" sx={{ fontWeight: 700 }}>
              Total Servings
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 700 }}>
              Cooking Status
            </TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
