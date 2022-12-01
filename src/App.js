import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { useSnapshot } from "valtio";
import { SideEditor } from "./components/editor";
import MainScene from "./components/MainScene";
import SideDrawer from "./components/SideDrawer";
import { sceneStateStore } from "./store/sceneData";

export default function App() {
  const snap = useSnapshot(sceneStateStore);

  return (
    <>
      <Grid templateColumns="300px 1fr" height="100vh">
        <GridItem>
          <SideDrawer />
        </GridItem>
        <GridItem>
          <MainScene />
        </GridItem>
      </Grid>
      {snap.current.id && <SideEditor />}
    </>
  );
}
