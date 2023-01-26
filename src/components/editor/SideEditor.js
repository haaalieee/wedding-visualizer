/* eslint-disable react/prop-types */
import { Container, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useSnapshot } from "valtio";
import { sceneStateStore } from "../../store/sceneData";
import { InputCategoryLabel, InputEditor } from "../editor";
import { TextureOptions } from "./TextureOptions";

export function SideEditor() {
  const snap = useSnapshot(sceneStateStore, { sync: true });
  const activeId = snap.current.id;
  const activeMaterial = snap.current.material;

  const activeObject = Array.from(snap.sceneObjects.values()).find(
    (obj) => obj.id === activeId
  );

  const currentObject = sceneStateStore.sceneObjects.get(activeId);

  // const [ posX, setPosX ] = React.useState(0);

  return (
    <Container
      p="4"
      style={{
        position: "absolute",
        top: 0,
        width: "230px",
        right: 0,
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <Text fontSize="sm" mb="2">
        Transformation
      </Text>
      <Grid templateColumns={"1fr 1fr 1fr"} gap={2} alignItems="center" mb="8">
        <InputCategoryLabel catergoryLabel="Position" />
        <InputEditor
          inputLabel="x"
          value={activeObject.scene.position.x}
          onChange={(e) => {
            currentObject.scene.position.x = e;
          }}
        />
        <InputEditor
          inputLabel="y"
          value={activeObject.scene.position.y}
          onChange={(e) => {
            currentObject.scene.position.y = e;
          }}
        />
        <InputEditor
          inputLabel="z"
          value={activeObject.scene.position.z}
          onChange={(e) => {
            currentObject.scene.position.z = e;
          }}
        />
        <InputCategoryLabel catergoryLabel="Rotation" />
        <InputEditor
          inputLabel="x"
          value={activeObject.scene.rotation.x}
          onChange={(e) => {
            currentObject.scene.rotation.x = e;
          }}
        />
        <InputEditor
          inputLabel="y"
          value={activeObject.scene.rotation.y}
          onChange={(e) => {
            currentObject.scene.rotation.y = e;
          }}
        />
        <InputEditor
          inputLabel="z"
          value={activeObject.scene.rotation.z}
          onChange={(e) => {
            currentObject.scene.rotation.z = e;
          }}
        />
        <InputCategoryLabel catergoryLabel="Scale" />
        <InputEditor
          inputLabel="x"
          value={activeObject.scene.scale.x}
          onChange={(e) => {
            currentObject.scene.scale.x = e;
          }}
        />
        <InputEditor
          inputLabel="y"
          value={activeObject.scene.scale.y}
          onChange={(e) => {
            currentObject.scene.scale.y = e;
          }}
        />
        <InputEditor
          inputLabel="z"
          value={activeObject.scene.scale.z}
          onChange={(e) => {
            currentObject.scene.scale.z = e;
          }}
        />
      </Grid>
      {activeMaterial && (
        <>
          <Text fontSize="sm" mb="4">
            Material
          </Text>
          <Grid templateColumns={"1fr"} gap={2} alignItems="center" mb="8">
            <InputCategoryLabel catergoryLabel="Color" />
            {/* <InputEditor inputLabel="r" value={"0"} />
            <InputEditor inputLabel="g" value={"0"} />
            <InputEditor inputLabel="b" value={"0"} /> */}
            <GridItem>
              <Text fontSize="xs" mt={2}>
                #
              </Text>
            </GridItem>
            <GridItem>
              <HexColorInput
                color={activeObject.nodes[activeMaterial]}
                onChange={(color) =>
                  (currentObject.nodes[activeMaterial] = color)
                }
                style={{
                  border: "1px solid #e3e8f0",
                  padding: "0 10px",
                  width: "100%",
                }}
              />
            </GridItem>
          </Grid>
          <HexColorPicker
            color={activeObject.nodes[activeMaterial]}
            onChange={(color) => (currentObject.nodes[activeMaterial] = color)}
          />
          <TextureOptions/>
        </>
      )}
    </Container>
  );
  // return Array.from(snap.sceneObjects.values())
  //   .find((obj) => obj.id === activeId)
  //   .map(({ id, scene }) => {
  //     <Container p="4" key={id}>
  //       <Text fontSize="sm" mb="2">
  //         Transformation
  //       </Text>
  //       <Grid
  //         templateColumns={"1fr 1fr 1fr"}
  //         gap={2}
  //         alignItems="center"
  //         mb="8"
  //       >
  //         <InputCategoryLabel catergoryLabel="Position" />
  //         <InputEditor inputLabel="x" value={scene.position.x} />
  //         <InputEditor inputLabel="y" value={scene.position.y} />
  //         <InputEditor inputLabel="z" value={scene.position.z} />
  //         <InputCategoryLabel catergoryLabel="Rotation" />
  //         <InputEditor inputLabel="x" value={scene.rotation.x} />
  //         <InputEditor inputLabel="y" value={scene.rotation.y} />
  //         <InputEditor inputLabel="z" value={scene.rotation.z} />
  //         <InputCategoryLabel catergoryLabel="Scale" />
  //         <InputEditor inputLabel="x" value={scene.scale.x} />
  //         <InputEditor inputLabel="y" value={scene.scale.y} />
  //         <InputEditor inputLabel="z" value={scene.scale.z} />
  //       </Grid>
  //       <Text fontSize="sm" mb="4">
  //         Material
  //       </Text>
  //       <Grid
  //         templateColumns={"1fr 1fr 1fr"}
  //         gap={2}
  //         alignItems="center"
  //         mb="8"
  //       >
  //         <InputCategoryLabel catergoryLabel="Color" />
  //         <InputEditor inputLabel="r" value={color.r} />
  //         <InputEditor inputLabel="g" value={color.g} />
  //         <InputEditor inputLabel="b" value={color.b} />
  //       </Grid>
  //       <RgbaColorPicker color={color} onChange={setColor} />
  //     </Container>;
  //   });
}
