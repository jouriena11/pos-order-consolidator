// TODO: to pass to OrderSummaryDrawer: [menu id, name, unit price, qty] - each click/tab is +1 to the qty?
// TODO: to use in search: [category, name]

import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MENUS } from "../utils/queries";
import {
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  createTheme,
} from "@mui/material";

import CeasarSaladImg from "../assets/img/menu-salad-caesar.jpg";
import RocketSaladImg from "../assets/img/menu-salad-rocket.jpg";
import BerrySaladImg from "../assets/img/menu-salad-berry-rhapsody.jpg";
import BerryAvocadoToastImg from "../assets/img/menu-toast-avocado-strawberry.jpg";
import PepperoniMagheritaToastImg from "../assets/img/menu-toast-margherita-pepperoni.jpg";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../stores/counterSlice";
import { addItem } from "../stores/orderSlice";

export default function MenuCard(props) {
  const { loading, data: menuList } = useQuery(GET_MENUS);

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    } else {
      console.log("menuList", menuList.getMenus);
    }
  }, [menuList]);

  const count = useSelector((state) => state.counter.value);

  const HandleMenuClick = (name, price, id) => {
    useDispatch(addItem({
      name,
      price,
      id,
    }))
    // TODO: to pass menu data to OrderSummaryDrawer
  };

  // TODO: to apply responsive screen to MenuCards
  // const theme = createTheme({
  //   breakpoints: {
  //     values: {
  //       sm: 576,
  //       md: 768
  //     }
  //   }
  // })

  // const smallScreen = useMediaQuery(theme => theme.breakpoints.up("xs"));
  // const mediumScreen = useMediaQuery(theme => theme.breakpoints.up("md"));

  // let cols;
  // if(smallScreen) {
  //   cols = 1;
  // } else if (mediumScreen) {
  //   cols = 3;
  // }

  return (
    <>
      {count}
      
      <ImageList
        // cols={cols}
        cols={3}
      >
        {menuList?.getMenus.map((item) => (
          <Button key={item._id}>
            <ImageListItem
              onClick={() => HandleMenuClick(item.name, item.price, item._id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={CeasarSaladImg}
                alt={item.name}
                loading="lazy"
                style={{ width: "250px", height: "250px" }}
              />
              <ImageListItemBar
                title={item.name}
                subtitle={<span>{item.price}</span>}
                // position="below"
                sx={{ textAlign: "center", background: "rgba(0, 0, 0, 0.35)" }}
              />
            </ImageListItem>
          </Button>
        ))}
      </ImageList>
    </>
  );
}
