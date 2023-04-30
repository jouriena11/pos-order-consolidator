import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider, createTheme, Typography } from "@mui/material";
import "@fontsource/karla";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NavBar from "../components/AppBar";
import POSOrderPage from "./POSOrderPage";
import KitchenOrders from "./KitchenOrders";

const mainTheme = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: "karla",
    fontWeight: "700",
  },
});

// TODO: default homepage for FOH user = POS Order page
// TODO: default homepage for kitchen user = Kitchen Orders page

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<NavBar />}>
            <Route path="/pos" element={<POSOrderPage />} />
            <Route path="/kitchen-orders" element={<KitchenOrders />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
