// TODO: to use in search: [category, name]

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MENUS } from "../utils/queries";
import {
  Button,
  ImageListItem,
  ImageListItemBar,
  Grid,
} from "@mui/material";

import CeasarSaladImg from "../assets/img/menu-salad-caesar.jpg";
// import RocketSaladImg from "../assets/img/menu-salad-rocket.jpg";
// import BerrySaladImg from "../assets/img/menu-salad-berry-rhapsody.jpg";
// import BerryAvocadoToastImg from "../assets/img/menu-toast-avocado-strawberry.jpg";
// import PepperoniMagheritaToastImg from "../assets/img/menu-toast-margherita-pepperoni.jpg";
import { useDispatch } from "react-redux";
import { addItem } from "../stores/orderSlice";

export default function MenuCard(props) {
  const dispatch = useDispatch()
  const { loading, data: menuList } = useQuery(GET_MENUS);


  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    } else {
      console.log("menuList", menuList.getMenus);
    }
  }, [menuList]);

  const HandleMenuClick = (name, price, id) => {
    dispatch(addItem({
      name,
      price,
      id,
      qty: 1
    }))
  };

  return (
    <>
      <Grid container spacing={2}>
          {menuList?.getMenus.map((item) => (
            <Grid item xs={6} sm={4} md={6} lg={4}>
              <Button sx={{width: "100%", display: 'block'}} key={item._id}>
                <ImageListItem
                  onClick={() => HandleMenuClick(item.name, item.price, item._id)}
                >
                  <img
                    src={CeasarSaladImg}
                    alt={item.name}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.name}
                    subtitle={<span>{item.price.toLocaleString("en-AU", {minimumFractionDigits: 2})}</span>}
                    // position="below"
                    sx={{ textAlign: "center", background: "rgba(0, 0, 0, 0.35)" }}
                  />
                </ImageListItem>
              </Button>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
