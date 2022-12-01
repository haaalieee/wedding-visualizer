import { Container, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import objectData from "../data/objects.json";
import { sceneStateStore, sceneActions } from "../store/sceneData";
import ItemCard from "./builder/ItemCard";

export default function SideDrawer() {
  // const addSceneObject = useSceneObjects((state) => state.addSceneObject);
  // const setActiveObject = useActiveSceneObject(
  //   (state) => state.setActiveObject
  // );
  // console.log("sceneObjects", sceneObjects);

  return (
    <Container p="4">
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
    </Container>
  );
}
