import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useMutation } from "@apollo/client";
import { SIGNUP } from "../utils/mutations";
import Auth from "../utils/auth";
import { validateEmail } from "../utils/helpers";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © POS "}
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);

  const [signUp, { error, data }] = useMutation(SIGNUP);

  const validateInputs = () => {
    const errors = [];

    if (!signUpFormData.first_name) {
      errors.push("Please enter your first name");
    }

    if (!signUpFormData.last_name) {
      errors.push("Please enter your last name");
    }

    if (!signUpFormData.email) {
      errors.push("Please enter your email");
    } else if (!validateEmail(signUpFormData.email)) {
      errors.push("Your email is not in a correct format.");
    }

    if (!signUpFormData.username) {
      errors.push("Please enter your username");
    }

    if (!signUpFormData.password) {
      errors.push("Please enter your password");
    }

    setErrors(errors);

    // console.log('errors => ', errors)
  };

  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });

    validateInputs();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await signUp({ 
        variables: {
          input: {...signUpFormData},
        }
      });

      console.log('data from client/src/pages/SignUp.jsx', data);

      const { token } = data.signup;
      Auth.login(token)
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={signUpFormData.first_name}
                  onChange={handleInputChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={signUpFormData.last_name}
                  onChange={handleInputChange}
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={signUpFormData.email}
                  onChange={handleInputChange}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  value={signUpFormData.username}
                  onChange={handleInputChange}
                  name="username"
                  autoComplete="new-username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={signUpFormData.password}
                  onChange={handleInputChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
            disabled={
              !(
                signUpFormData.first_name &&
                signUpFormData.last_name &&
                signUpFormData.email &&
                signUpFormData.username &&
                signUpFormData.password
              )
            }
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <Box sx={{mt: 2, color: 'red'}}>
          {errors.length > 0 &&
            errors.map((error, index) => {
              return <Typography key={index}>{error}</Typography>;
            })}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
