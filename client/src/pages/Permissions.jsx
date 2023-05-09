import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../utils/queries";
import { UPDATE_USER_ROLE_STATUS } from "../utils/mutations";
import Auth from "../utils/auth";

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
  MenuItem,
  Select,
  Checkbox,
  Snackbar,
} from "@mui/material";

import MuiAlert from "@mui/material/Alert";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

function SaveNotification(props) {
  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });

  const { notiMsg, openNoti } = props;
  const [openNotification, setOpenNotification] = useState(openNoti);
  console.log(notiMsg, openNoti);
  const handleClick = () => {
    setOpenNotification(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNotification(false);
  };

  return (
    <Snackbar
      open={openNotification}
      autoHideDuration={3000}
      onClose={handleClose}
      message={notiMsg}
    >
      {/* <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {notiMsg}
      </Alert> */}
    </Snackbar>
  );
}

function Users(props) {
  const { user, setNoti } = props;
  const [userRole, setUserRole] = useState(user.role);
  const [userStatus, setUserStatus] = useState(user.status);
  const [userChecked, setUserCheked] = useState(false);

  const handleChangeRole = (event) => {
    setUserRole(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setUserStatus(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setUserCheked((prevState) => !prevState);
  };

  const selectBgColor = (status) => {
    switch (status) {
      case "pending":
        return { sx: { backgroundColor: "#ffcc80" } };
      case "active":
        return { sx: { backgroundColor: "#4dd0e1" } };
      case "inactive":
        return { sx: { backgroundColor: "darkgrey" } };
      default:
        return { sx: { backgroundColor: "#ff8a80" } };
    }
  };

  const statusColor = selectBgColor(userStatus);

  const [updateUser, { loading, data }] = useMutation(UPDATE_USER_ROLE_STATUS);

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const handleSaveButtonClick = async () => {
    try {
      await updateUser({
        variables: {
          input: {
            user_id: user._id,
            user_status: userStatus,
            user_role: userRole,
          },
        },
        // only Admin can 'save' changes to user data
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        },
      });
      setUserCheked();
      alert(`"${user.username}'s data has been updated"`)
      setNoti(true, `"${user.username}'s data has been updated"`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableRow>
      <TableCell align="center">
        <Typography variant="body2">{user.first_name}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">{user.last_name}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">{user.username}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">{user.email}</Typography>
      </TableCell>
      <TableCell align="center">
        {user.role === "Admin" ? (
          <Typography variant="body2">{user.role}</Typography>
        ) : (
          <Select
            value={userRole}
            onChange={handleChangeRole}
            size="small"
            sx={{ width: "170px" }}
          >
            <MenuItem value="TBA">
              <Typography variant="body2">To be assigned</Typography>
            </MenuItem>
            <MenuItem value="FOH Manager">
              <Typography variant="body2">FOH Manager</Typography>
            </MenuItem>
            <MenuItem value="Kitchen Manager">
              <Typography variant="body2">Kitchen Manager</Typography>
            </MenuItem>
          </Select>
        )}
      </TableCell>
      <TableCell align="center">
        {user.role === "Admin" ? (
          <Typography variant="body2">{user.status}</Typography>
        ) : (
          <Select
            value={userStatus}
            onChange={handleChangeStatus}
            size="small"
            sx={{ width: "130px", ...statusColor.sx }}
          >
            <MenuItem value="pending">
              <Typography variant="body2">pending</Typography>
            </MenuItem>
            <MenuItem value="active">
              <Typography variant="body2">active</Typography>
            </MenuItem>
            <MenuItem value="inactive">
              <Typography variant="body2">inactive</Typography>
            </MenuItem>
          </Select>
        )}
      </TableCell>
      <TableCell align="center">
        <Tooltip title="Select user to update" arrow placement="top">
          <Checkbox
            disabled={user.role === "Admin" ? true : false}
            checked={userChecked}
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
        <Tooltip title="Save status change" arrow placement="top">
          <span>
            <IconButton
              sx={{ color: "grey" }}
              onClick={handleSaveButtonClick}
              disabled={!userChecked}
            >
              <SaveRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default function Permissions() {
  const { loading, data: usersList } = useQuery(GET_USERS);
  const [notiMsg, setNotiMsg] = useState("");
  const [openNoti, setOpenNoti] = useState(false);

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    } else {
      // console.log("usersList.getUsers from Permissions => ", usersList.getUsers);
      // console.log("Loading completed")
    }
  }, [usersList]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Users Management Table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  First Name
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Last Name
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Username
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Email
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Role
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell align="center" />
              <TableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList &&
              usersList.getUsers.map((user) => (
                <Users
                  key={user._id}
                  user={user}
                  setNoti={(openStatus, msg) => {
                    console.log(openStatus, msg);
                    setNotiMsg(msg);
                    setOpenNoti(openStatus);
                  }}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* TODO: Snackbar is not showing */}
      <SaveNotification notiMsg={notiMsg} openNoti={openNoti} />
    </>
  );
}
