import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import MainScene from "./components/MainScene";
import SideDrawer from "./components/SideDrawer";

export default function App() {
  return (
    <Grid templateColumns="300px 1fr" height="100vh">
      <GridItem>
        <SideDrawer />
      </GridItem>
      <GridItem>
        <MainScene />
      </GridItem>
      {/* <GridItem>
        <SideEditor />
      </GridItem> */}
    </Grid>
  );
}
