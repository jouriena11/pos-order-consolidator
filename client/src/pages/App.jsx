import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ThemeProvider, createTheme, Typography } from "@mui/material";
import "@fontsource/karla";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NavBar from "../components/AppBar";
import Dashboard from "./Dashboard";
import OrderStatus from "./Reports/OrderStatus";
import POSOrderPage from "./POSOrderPage";
import AddCategory from "./Menu/AddCategory";
import AddMenu from "./Menu/AddMenu";
import KitchenOrders from "./KitchenOrders";
import Permissions from "./Permissions";
import ProfileUpdate from "./Profile/ProfileUpdate";
import ChangePassword from "./Profile/ChangePassword";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // setContext() allows you to modify the request headers before sending them to the server
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const mainTheme = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: "karla",
    fontWeight: "700",
  },
});

// TODO: currently, menus are hidden from unauthorized user but unauthorized user can still access the page through URL

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<NavBar />}>
            <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pos" element={<POSOrderPage />} />
              <Route path="/update-profile" element={<ProfileUpdate />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/add-menu-category" element={< AddCategory/>} />
              <Route path="/add-menu" element={< AddMenu/>} />
              <Route path="/kitchen-orders" element={<KitchenOrders />} />
              <Route path="/order-status-report" element={<OrderStatus />} />
              <Route path="/user-permissions" element={<Permissions />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
