import NavBar from "../components/AppBar";
import Grid from "@mui/material/Grid";

// TODO: divided the section into 2 grids -- spacing/rowSpacing/columnSpacing
// 1) clickable menu card md={9}}
// 2) billing calculation

{
  /* <Grid container columns={{ xs: 4, md: 12 }}>
  <Grid item xs={2} />
</Grid> */
}

// complex grid -- billing calculation

// TODO: should billing calculation be a drawer on mobile screen?

export default function POSOrderPage() {
  return (
    <>
      <NavBar />
      <Grid container spacing={2}>
        <Grid xs={12} md={9}>
          {/* TODO: menu cards */}
        </Grid>
        <Grid item xs={12} md={9}>
          {/* TODO: billing calculations */}
          {/*  */}
        </Grid>
      </Grid>
    </>
  );
}
