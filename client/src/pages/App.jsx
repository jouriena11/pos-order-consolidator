import React, { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
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
import AccessDenied from "./AccessDenied";
import NotFound from "./NotFound";
import Auth from "../utils/auth";

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


function ProtectedRoute({ children }) {
  const location = useLocation().pathname;
  const role = Auth.getRole();
  const FOHPath = [
    "/pos",
    "/add-menu-category",
    "/add-menu",
    "/order-status-report",
  ];
  const FOHUser = ["Admin", "FOH Manager"];
  const kitchenUser = ["Admin", "Kitchen Manager"]

  if (
    (location === "/user-permissions" && role !== "Admin") ||
    (FOHPath.includes(location) && !FOHUser.includes(role)) ||
    (location === "/kitchen-orders" && !kitchenUser.includes(role))
  ) {
    return <Navigate to="/access-denied" replace />;
  }
  return <Outlet/>;
}

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
              <Route path="/update-profile" element={<ProfileUpdate />} />
              <Route path="/change-password" element={<ChangePassword />} />
                <Route element={<ProtectedRoute/>}>
                  <Route path="/kitchen-orders" element={<KitchenOrders />} />
                  <Route path="/add-menu-category" element={<AddCategory />} />
                  <Route path="/add-menu" element={<AddMenu />} />
                  <Route path="/pos" element={<POSOrderPage />} />
                  <Route path="/order-status-report" element={<OrderStatus />}/>
                  <Route path="/user-permissions" element={<Permissions />}/>
                </Route>
              <Route path="/access-denied" element={<AccessDenied />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
