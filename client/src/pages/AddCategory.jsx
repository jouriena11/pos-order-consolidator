import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_MENU_CATEGORY } from "../utils/mutations";
import Auth from "../utils/auth";

import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Container,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme();

export default function AddCategory() {
  const [addCategoryFormData, setAddCategoryFormData] = useState("");

  const [addMenuCategory, { error, data }] = useMutation(ADD_MENU_CATEGORY);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddCategoryFormData({ ...addCategoryFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    console.log('addCategoryFormData => ', addCategoryFormData)

    try {
      const { data } = await addMenuCategory({
        variables: {
          categoryName: addCategoryFormData.name,
        },
        context: {
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        },
      });
      
      // TODO: bug fix - input value persists
      setAddCategoryFormData("");

      //   TODO: to invoke a notification modal, confirming to user that a new category has been created?
      console.log("data from client/src/pages/AddCategory.jsx", data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box xs={12} sm={8} md={5} component={Paper} elevation={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              py: 4,            
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Menu Category
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
                id="new-menu-category-name"
                label="Enter a Menu Category name"
                name="name"
                value={addCategoryFormData.name}
                onChange={handleInputChange}
                autoComplete="New Menu Category"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!addCategoryFormData}

              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
