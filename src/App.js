import { Box } from "@chakra-ui/react";
import React from "react";
import { useSnapshot } from "valtio";
import { RoomOptions } from "./components/builder";
import MainScene from "./components/MainScene";
import SideDrawer from "./components/SideDrawer";
import { roomStateStore } from "./store/sceneData";

export default function App() {
  // const sceneSnap = useSnapshot(sceneStateStore);
  const roomSnap = useSnapshot(roomStateStore);

  return (
    <Box height="100vh" >
      {/* <Grid templateColumns="300px 1fr" height="100vh">
        <GridItem>
          <SideDrawer />
        </GridItem>
        <GridItem>
          <MainScene />
        </GridItem>
      </Grid> */}
      {roomSnap.currentRoom && <SideDrawer />}
      <MainScene />
      {/* {sceneSnap.current.id && <SideEditor />} */}
      {!roomSnap.currentRoom && (
        <RoomOptions
          className="room-centered"
          textAlign="center"
          textSize="md"
        />
      )}
    </Box>
  );
}
