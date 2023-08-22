import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MENU } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { GET_MENU_CATEGORIES } from "../../utils/queries";

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
  IconButton,
  Card,
  CardMedia,
} from "@mui/material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

const theme = createTheme();

export default function AddMenu() {
  const [addMenuFormData, setAddMenuFormData] = useState({
    name: "",
    price: "",
    category_id: "",
  });

  const [nameError, setNameError] = useState(false);
  const [imgFile, setImgFile] = useState(undefined);
  const [previewImg, setPreviewImg] = useState("")

  const { loading, data: menuCategoriesList } = useQuery(GET_MENU_CATEGORIES);
  const [addMenu, { error, data }] = useMutation(ADD_MENU);

  const fieldLabelWidth = "100px";

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    } else {
      console.log(
        "menuCategoriesList.getMenuCategories => ",
        menuCategoriesList.getMenuCategories
      );
    }
  }, [menuCategoriesList]);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    let newValue =
      type === "number" && value !== ""
        ? Number(parseFloat(value).toFixed(2))
        : value;
    setAddMenuFormData({ ...addMenuFormData, [name]: newValue });
  };

  const handleFileUpload = (event) => {
    setImgFile(event.target.files[0]);
    const tempURLFile = URL.createObjectURL(event.target.files[0])
    setPreviewImg(tempURLFile);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (addMenuFormData.name.trim() === "") {
      setNameError(true);
    } else if (!addMenuFormData.category_id) {
      setNameError(true);
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // console.log("addMenuFormData => ", addMenuFormData);

    try {
      const { data } = await addMenu({
        variables: {
          input: {
            name: addMenuFormData.name,
            price: addMenuFormData.price,
            category_id: addMenuFormData.category_id,
          },
        },
        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        },
      });

      setAddMenuFormData({
        name: "",
        price: "",
        category_id: "",
      });

      // TODO: to replace alert with MUI Snackbar
      alert("New menu has been created");
      // console.log("data from client/src/pages/AddMenu.jsx", data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategorySelect = (event) => {
    console.log(event.target.value); // "ABC"
    setAddMenuFormData({ ...addMenuFormData, category_id: event.target.value });
  };

  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {/* TODO: to flatten Box */}
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
              {/* TODO: to change from Box to Grid */}
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
                    value={addMenuFormData.category_id}
                    onChange={handleCategorySelect}
                    required
                  >
                    {menuCategoriesList &&
                      menuCategoriesList.getMenuCategories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                {/* TODO: error message */}
              </Box>
              <Box
                display="flex"
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <Typography sx={{ mr: 2, width: fieldLabelWidth }}>
                  Image:
                </Typography>
                <Button 
                  variant="contained" 
                  component="label" 
                  startIcon={<PhotoCamera/>}
                  onChange={handleFileUpload}
                  sx={{mr: 1}}
                >
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
                <Typography >
                  {imgFile && (imgFile.name)}
                </Typography>
                {imgFile && (
                  <Card>
                    <CardMedia
                      sx={{ height: 140 }}
                      src={previewImg}
                      title="Preview Image"
                    />
                  </Card>
                )}
                
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                
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
