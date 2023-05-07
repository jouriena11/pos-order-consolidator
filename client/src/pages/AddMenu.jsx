import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MENU } from "../utils/mutations";
import Auth from "../utils/auth";
import { GET_MENU_CATEGORIES } from "../utils/queries";

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const theme = createTheme();

function Menu() {
  return <></>;
}

export default function AddMenu() {
  const [addMenuFormData, setAddMenuFormData] = useState({
    name: "",
    price: 0,
    category_id: "",
  });

  const [nameError, setNameError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const { loading, data: menuCategoriesList } = useQuery(GET_MENU_CATEGORIES);
  const [addMenu, { error, data }] = useMutation(ADD_MENU);

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    } else {
      console.log("menuCategoriesList.getMenuCategories => ", menuCategoriesList.getMenuCategories);
    }
  }, [menuCategoriesList]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddMenuFormData({ ...addMenuFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (addMenuFormData.name.trim() === "") {
      setNameError(true);
    } else if (!addMenuFormData.category_id) {
      setNameError(true);
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    console.log("addMenuFormData => ", addMenuFormData);

    try {
      const { data } = await addMenu({
        variables: {
          name: addMenuFormData.name,
          price: addMenuFormData.price,
          category_id: addMenuFormData.category_id
        },
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        },
      });

      //   TODO: to invoke a notification modal, confirming to user that a new menu has been created?
      console.log("data from client/src/pages/AddMenu.jsx", data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value)
  };

  const fieldLabelWidth = "100px";

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
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
              Add Menu
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography sx={{ mr: 2, width: fieldLabelWidth }}>
                  Name:
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="new-menu-name"
                  label="Enter a Menu name"
                  name="name"
                  value={addMenuFormData.name}
                  onChange={handleInputChange}
                  autoComplete="off"
                  autoFocus
                />
              </Box>
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography sx={{ mr: 2, width: fieldLabelWidth }}>
                  Price ($):
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  inputProps={{ min: 0, step: 1 }}
                  id="new-menu-price"
                  label="Enter a Menu price"
                  name="price"
                  value={addMenuFormData.price}
                  onChange={handleInputChange}
                  autoComplete="off"
                  autoFocus
                />
              </Box>
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Typography sx={{ mr: 2, width: fieldLabelWidth }}>
                  Category:
                </Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel
                    variant="outlined"
                    sx={{ bgcolor: "background.paper", px: 1 }}
                    id="category-label"
                  >
                    Choose Associated Category
                  </InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    name="category_id"
                    value={addMenuFormData.name}
                    onChange={handleCategorySelect}
                    required
                  >
                    {menuCategoriesList &&
                      menuCategoriesList.getMenuCategories.map((category) => (
                        <MenuItem key={category._id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {/* TODO: error message */}
              </Box>
              <Box display={"flex"} justifyContent={"flex-end"}>
                {/* TODO: image upload  */}
                {/* TODO: to change justifyContent to "space-between" */}

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!addMenuFormData}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
