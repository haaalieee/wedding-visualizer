import { Box, Container, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { useSnapshot } from "valtio";
import objectData from "../data/objects.json";
import {
  roomStateStore,
  sceneActions,
  sceneStateStore
} from "../store/sceneData";
import { ItemCard, RoomOptions } from "./builder";

export default function SideDrawer() {
  // const addSceneObject = useSceneObjects((state) => state.addSceneObject);
  // const setActiveObject = useActiveSceneObject(
  //   (state) => state.setActiveObject
  // );
  // console.log("sceneObjects", sceneObjects);
  const roomSnap = useSnapshot(roomStateStore);

  return (
    <Container
      p="4"
      style={{
        position: "absolute",
        top: 0,
        width: "300px",
        left: 0,
        height: "100%",
        backgroundColor: "white",
        zIndex: '2000'
      }}
    >
      <Heading size="md">Assets</Heading>
      <Wrap my="4" spacing="20px">
        {objectData.map((object, key) => (
          <WrapItem key={key}>
            <ItemCard
              text={object.name}
              onClick={() => {
                // if (sceneObjects.includes(key)) {
                //   setActiveObject(null, null);
                //   rmSceneObject(key);
                //   return;
                // }
                // addSceneObject(object);
                sceneActions.addObject(object);
                console.log(sceneStateStore);
              }}
            />
          </WrapItem>
        ))}
      </Wrap>
      {roomSnap.currentRoom && (
        <Box mt="10">
          <RoomOptions textSize="sm" />
        </Box>
      )}
    </Container>
  );
}
