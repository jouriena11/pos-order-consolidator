
// TODO: to pass to OrderSummaryDrawer: [menu id, name, unit price, qty] - each click/tab is +1 to the qty?
// TODO: to use in search: [category, name]

import React from "react";
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

const menuData = [
  {
    id: 1,
    img: CeasarSaladImg,
    name: "Caesar Salad",
    price: "$14.90",
    category: "Salad",
  },
  {
    id: 2,
    img: RocketSaladImg,
    name: "Rocket Salad",
    price: "$14.90",
    category: "Salad",
  },
  {
    id: 3,
    img: BerrySaladImg,
    name: "Berry Rhapsody Salad",
    price: "$16.90",
    category: "Salad",
  },
  {
    id: 4,
    img: BerryAvocadoToastImg,
    name: "Berries Avocado Toast",
    price: "$18.90",
    category: "Toast",
  },
  {
    id: 5,
    img: PepperoniMagheritaToastImg,
    name: "Pepperoni Margherita Toast",
    price: "$14.90",
    category: "Toast",
  },
];

export default function MenuCard(props) {
  const handleMenuClick = (event) => {
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
      <ImageList
        // cols={cols}
        cols={3}
      >
        {menuData.map((item) => (
          <Button>
            <ImageListItem
              key={item.img}
              onClick={handleMenuClick}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={item.img}
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
