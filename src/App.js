import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import MainScene from "./components/MainScene";
import SideDrawer from "./components/SideDrawer";
import SideEditor from "./components/editor/SideEditor";
import { useSnapshot } from "valtio";
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
