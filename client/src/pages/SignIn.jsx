import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { validateEmail } from "../utils/helpers";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// TODO: to incorporate React validator (ref: personal portfolio)

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © POS"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  // TODO: how to use error? error is from resolvers function, correct?
  const [signIn, { error, data }] = useMutation(LOGIN);

  const validateInputs = () => {
    const errors = [];

    if (!signInFormData.email) {
      errors.push("Please enter your email");
    } else if (!validateEmail(signInFormData.email)) {
      errors.push("Your email is not in a correct format.");
    }

    if (!signInFormData.password) {
      errors.push("Please enter your password");
    }

    setErrors(errors);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignInFormData({
      ...signInFormData,
      [name]: value,
    });

    validateInputs();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('signInFormData => ', signInFormData)
    const { data } = await signIn({
      variables: {...signInFormData}
    })
    const { token, user } = data.login;
    // console.log('token from client/src/pages/SignIn.jsx => ', token);
    // console.log('user from client/src/pages/SignIn.jsx => ', user);
    const { role, status } = user;
    Auth.login(token, role, status);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={signInFormData.email}
                onChange={handleInputChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={signInFormData.password}
                onChange={handleInputChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!(signInFormData.email && signInFormData.password)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              <Box sx={{ mt: 2, color: "red" }}>
                {errors.length > 0 &&
                  errors.map((error, index) => {
                    return <Typography key={index}>{error}</Typography>;
                  })}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
