import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ORDERS } from "../utils/queries";
import { UPDATE_ORDERS } from "../utils/mutations";
import dayjs from "dayjs";

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

function Orders(props) {
  const { order } = props;
  // console.log('order.orders => ', order.orders)
  const [open, setOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("On Queue");
  const [cookingStatus, setCookingStatus] = useState("On Queue");
  const [menuChecked, setMenuChecked] = useState(false);
  const [updateOrder, { loading, data }] = useMutation(UPDATE_ORDERS);

  const handleChangeCookingStatus = (event) => {
    setCookingStatus(event.target.value);

    if (cookingStatus === "Ready") {
      setOrderStatus("Ready");
    } else if (cookingStatus === "Cancelled") {
      setOrderStatus("Cancelled");
    } else {
      return orderStatus;
    }
  };

  const handleCheckboxChange = (event) => {
    setMenuChecked((prevState) => !prevState);
  };

  const handleSubmitBtnClick = async () => {
    try {
      const orderIds = order.orders.map((order) => order.order_id);

      //   const testInput = {
      //     orderId: orderIds,
      //     cookingStatus: cookingStatus,
      //     orderStatus: orderStatus,
      //   }

      // console.log ('testInput => ', testInput)

      // TODO:

      await updateOrder({
        variables: {
          orderId: orderIds,
          cookingStatus: cookingStatus,
          orderStatus: orderStatus,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const selectCookingStatusBgColor = (status) => {
    switch (status) {
      case "On Queue":
        return { sx: { backgroundColor: "#ffcc80" } };
      case "Cooking":
        return { sx: { backgroundColor: "#4dd0e1" } };
      case "Ready":
        return { sx: { backgroundColor: "#2CDA9D" } };
      case "Cancelled":
        return { sx: { backgroundColor: "darkgrey" } };
      default:
        return { sx: { backgroundColor: "#ff8a80" } };
    }
  };

  const statusColor = selectCookingStatusBgColor(cookingStatus);

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
          {order.menu}
        </TableCell>
        <TableCell align="center">elapsed min:sec since first order</TableCell>
        <TableCell align="center">{order.qty}</TableCell>
        <TableCell align="center">
          {/* Status dropdown */}
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId={order.menu} // TODO: to review
              id={order.menu} // TODO: to review
              value={cookingStatus}
              onChange={handleChangeCookingStatus}
              sx={statusColor.sx}
            >
              <MenuItem value="On Queue">On Queue</MenuItem>
              <MenuItem value="Cooking">Cooking</MenuItem>
              <MenuItem value="Ready">Ready</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Select order to update" arrow placement="top">
            <Checkbox
              label="parent"
              checked={menuChecked}
              onChange={handleCheckboxChange}
              sx={{
                color: "grey",
                "&.Mui-checked": {
                  color: "grey",
                },
              }}
              // TODO: to apply parent-child checkbox
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
            <span>
              <IconButton
                disabled={!menuChecked}
                sx={{ color: "grey" }}
                onClick={handleSubmitBtnClick}
              >
                {/* TODO: `cancelled` and `ready` status Select component should be deactivated once selected and saved  */}
                <SaveRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell width={100} />
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
                {/* TODO: to align children table columns to the parent's  */}
                <TableBody>
                  {order.orders.map((order) => (
                    <TableRow key={order.order_id}>
                      <TableCell width={100} />
                      <TableCell align="center" component="th" scope="row">
                        {order.order_id}
                      </TableCell>
                      <TableCell align="center">{order.createdAt}</TableCell>
                      {/* TODO: to get time counter */}
                      <TableCell align="center">min:sec</TableCell>
                      <TableCell align="center">{order.qty}</TableCell>
                      {/* TODO: to implement checkbox with Indeterminate property, i.e. parent-child checkboxes */}
                      {/* <TableCell align="center">
                        <Checkbox
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
                      </TableCell> */}
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

export default function KitchenOrders() {
  const { loading, data: ordersList } = useQuery(GET_ORDERS);
  const [formattedOrders, setFormattedOrders] = useState([]);

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    } else {
      const orders = ordersList.getOrders;
      // console.log("ordersList.getOrders => ", orders);

      const formattedOrders = orders.flatMap((order) => {
        return order.menu_items.map((item) => {
          return {
            menu: item.menu,
            createdAt: dayjs(order.createdAt).format("HH:mm:ss"),
            qty: item.order_qty,
            order_status: order.order_status,
            cooking_status: order.cooking_status,
            order_id: order._id,
          };
        });
      });

      setFormattedOrders(formattedOrders);
    }
  }, [ordersList]);
  const consolidatedOrders = (formattedOrders) => {
    return formattedOrders.reduce((acc, { menu, qty, order_id, createdAt, order_status, cooking_status }) => {
        const index = acc.findIndex((item) => item.menu === menu); // TODO: to change to menu.name -- to work on joining table
        // if the item doesn't exist in the acc array, push the item into the array
        if (index === -1) {
          acc.push({
            menu,
            qty,
            order_status,
            cooking_status,
            orders: [{ order_id, createdAt, qty }], // also create a new `orders` array nested in acc array
          });
          // but if the item does exist in the acc array, 
          } else { // check if the cooking_status is still "On Queue",
            if (acc[index].cooking_status === "On Queue") { // TODO: to test
            acc[index].qty += qty; // if yes, increase the qty by the item.order_qty
            acc[index].orders.push({ order_id, createdAt, qty }); // and add the order details to the item.orders array
            // but if the acc[index] cooking status is no longer "On Queue", e.g. it has been changed to "Cooking", then the incoming new menu order would be treated as a new menu item in the acc array
            } else {
              acc.push({
                menu,
                qty,
                order_status,
                cooking_status,
                orders: [{ order_id, createdAt, qty }],
              });
            };
          }
        return acc;
      },[]);
  };

  const kitchenOrders = consolidatedOrders(formattedOrders);

  console.log("formattedOrders => ", formattedOrders);
  console.log("kitchenOrders => ", kitchenOrders);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width={100} />
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
          {kitchenOrders &&
            kitchenOrders.map((order) => (
              // TODO: to review key
              <Orders key={order.menu + order.orders.order_id} order={order} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
