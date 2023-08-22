import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../utils/queries";
import { UPDATE_ORDER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  IconButton,
  Paper,
  Collapse,
  MenuItem,
  Select,
  Checkbox,
  Snackbar,
  Box,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { red } from "@mui/material/colors";

dayjs.extend(duration)

function Orders(props) {
  const { order, setNoti, refetch } = props;
  const [open, setOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.order_status);
  const [orderChecked, setOrderCheked] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [updateOrder] = useMutation(UPDATE_ORDER);

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const contextUser = Auth.getProfile().data.role;

  useEffect(() => {
      const timeInterval = setInterval(() => {      
        const elapsedTime = dayjs().diff(dayjs(order.createdAt));

        // TODO: to polish font, font size, font color
        setElapsedTime(<Typography sx={{color: elapsedTime < 1000 * 60 * 10 ? "black" : "red"}}>{dayjs.duration(elapsedTime).format("HH:mm:ss")}</Typography>);

      }, 1000);
      return () => {
        clearInterval(timeInterval) // cleanup function; executed when component is unmounted, e.g. component is refreshed, deleted, updated
      }
  }, [order.createdAt])

  const handleChangeOrderStatus = (event) => {
    setOrderStatus(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setOrderCheked((prevState) => !prevState);
  };

  const selectOrderBgColor = (status) => {
    switch (status) {
      case "On Queue":
        return { sx: { backgroundColor: "#ffcc80" } };
      case "Ready":
        return { sx: { backgroundColor: "#2CDA9D" } };
      case "Served":
        return { sx: { backgroundColor: "#5998C5" } };
      case "Cancelled":
        return { sx: { backgroundColor: "darkgrey" } };
      default:
        return { sx: { backgroundColor: "#EFD6AC" } };
    }
  };
  const orderStatusColor = selectOrderBgColor(orderStatus);

  const handleSaveButtonClick = async () => {
    try {
      await updateOrder({
        variables: {
          orderId: order._id,
          orderStatus: orderStatus,
        },
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        },
      });
      // TODO: to replace alert with MUI Snackbar
      alert("Order data has been updated");
      setOrderCheked();
      refetch();
      // setNoti(true, `"${user.username}'s data has been updated"`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{order._id}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{order.customer_name}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">
            {dayjs(order.createdAt).format("HH:mm:ss")}
          </Typography>
        </TableCell>
        <TableCell align="center">
          {/* TODO: once order staus is changed to "Served" and saved, the elapsed time counter should stop */}
          <Typography variant="body2">{elapsedTime}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">
            {order.total.toLocaleString("en-AU", { minimumFractionDigits: 2 })}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="body2">{order.cooking_status}</Typography>
        </TableCell>
        <TableCell align="center">
          {contextUser === "Kitchen Manager" ? (
            <Typography variant="body2">{order.order_status}</Typography>
          ) : (
            <Select
              // TODO: to uncomment the property below when codes on Kitchen Order is ready
              // TODO: once cooking order is ready, automatically change orderStatus to "Ready"
              // disabled={order.cooking_status !== "Ready" ? true : false }
              value={orderStatus}
              onChange={handleChangeOrderStatus}
              size="small"
              sx={{ width: "130px", ...orderStatusColor.sx }}
            >
              <MenuItem value="On Queue">
                <Typography variant="body2">On Queue</Typography>
              </MenuItem>
              <MenuItem value="Ready">
                <Typography variant="body2">Ready</Typography>
              </MenuItem>
              <MenuItem value="Served">
                <Typography variant="body2">Served</Typography>
              </MenuItem>
              <MenuItem value="Cancelled">
                <Typography variant="body2">Cancelled</Typography>
              </MenuItem>
            </Select>
          )}
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Select order to update" arrow placement="top">
            <Checkbox
              disabled={contextUser === "Kitchen Manager" ? true : false}
              checked={orderChecked}
              onChange={handleCheckboxChange}
              label="parent"
              sx={{
                color: "grey",
                "&.Mui-checked": {
                  color: "grey",
                },
              }}
              // onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select user to update",
              }}
            />
          </Tooltip>
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Save order status change" arrow placement="top">
            <span>
              <IconButton
                sx={{ color: "grey" }}
                onClick={handleSaveButtonClick}
                disabled={!orderChecked}
              >
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
                      Menu
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      Servings
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }} align="center">
                      Remarks
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                {/* TODO: to align children table columns to the parent's  */}
                <TableBody>
                  {order.menu_items.map((item) => (
                    <TableRow key={item.menu._id}>
                      <TableCell width={100} />
                      <TableCell align="center" component="th" scope="row">
                        {item.menu.name}
                      </TableCell>
                      <TableCell align="center">{item.order_qty}</TableCell>
                      <TableCell align="center"></TableCell>
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

export default function OrderStatus() {
  const { loading, data: ordersList, refetch: refetchOrders } = useQuery(GET_ORDERS);

  /*useEffect(() => {
    if (loading) {
      console.log("Loading...");
    } else {
      console.log(
        "ordersList.getOrders from OrderStatus => ",
        ordersList.getOrders
      );
      // console.log("Loading completed")
    }
  }, [ordersList]);*/

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Users Management Table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Order ID
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Customer Name
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Time of Order
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Elapsed Time 
                  <br/>
                  (Hour/Min/Sec)
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Bill Value ($)
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Cooking Status
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Order Status
                </Typography>
              </TableCell>
              <TableCell align="center" />
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersList &&
              ordersList.getOrders.map((order) => (
                <Orders
                  key={order._id}
                  order={order}
                  setNoti={(openStatus, msg) => {
                    console.log(openStatus, msg);
                    // setNotiMsg(msg);
                    // setOpenNoti(openStatus);
                  }}
                  refetch={refetchOrders}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <SaveNotification notiMsg={notiMsg} openNoti={openNoti}/> */}
    </>
  );
}
