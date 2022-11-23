/* eslint-disable react/prop-types */
import { Container, Grid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { RgbaColorPicker } from "react-colorful";
import {
  useSceneObjects,
  useTransformStore
} from "../../store/useSceneObjects";
import InputCategoryLabel from "./InputCategoryLabel";
import InputEditor from "./InputEditor";

export default function SideEditor(props) {
  const { object } = props;
  const {
    getActiveObject,
    updateActiveChildColor,
  } = useSceneObjects();
  const { transformUpdate } = useTransformStore();

  useEffect(() => {
    console.log("side editor", object);
  }, [object]);

  // const [objectPosProps, setObjectPosProps] = useState([0, 0, 0]);
  // const [objectRotateProps, setObjectRotateProps] = useState([0, 0, 0]);
  // const [objectScaleProps, setObjectScaleProps] = useState([0, 0, 0]);

  const [color, setColor] = React.useState({ r: 0, g: 0, b: 0, a: 1 });

  // useEffect(() => {
  //   if (transformUpdate) {
  //     // console.log(getActiveObject().scene.children.find((obj) => obj.uuid === "f45a6d6f-0729-43ca-a6e7-89366e5668cb"));
  //     setObjectPosProps([
  //       getActiveObject().scene.position.x,
  //       getActiveObject().scene.position.y,
  //       getActiveObject().scene.position.z,
  //     ]);

  //     setObjectRotateProps([
  //       getActiveObject().scene.rotation.x,
  //       getActiveObject().scene.rotation.y,
  //       getActiveObject().scene.rotation.z,
  //     ]);

  //     setObjectScaleProps([
  //       getActiveObject().scene.scale.x,
  //       getActiveObject().scene.scale.y,
  //       getActiveObject().scene.scale.z,
  //     ]);

  //     setColor({
  //       r: getActiveChildObject().instance.current.material.color.r * 255,
  //       g: getActiveChildObject().instance.current.material.color.g * 255,
  //       b: getActiveChildObject().instance.current.material.color.b * 255,
  //     });
  //   } else {
  //     setObjectPosProps([0, 0, 0]);
  //     setObjectRotateProps([0, 0, 0]);
  //     setObjectScaleProps([0, 0, 0]);
  //     setColor({ r: 0, g: 0, b: 0 });
  //   }
  // }, [transformUpdate]);

  useEffect(() => {
    if (color && transformUpdate) {
      updateActiveChildColor(getActiveObject().id, color);
    }
  }, [color]);

  return (
    <Container p="4">
      <Text fontSize="sm" mb="2">
        Transformation
      </Text>
      <Grid templateColumns={"1fr 1fr 1fr"} gap={2} alignItems="center" mb="8">
        <InputCategoryLabel catergoryLabel="Position" />
        <InputEditor inputLabel="x" value={props.object.position.x} />
        <InputEditor inputLabel="y" value={props.object.position.y} />
        <InputEditor inputLabel="z" value={props.object.position.z} />
        <InputCategoryLabel catergoryLabel="Rotation" />
        <InputEditor inputLabel="x" value={props.object.rotation.x} />
        <InputEditor inputLabel="y" value={props.object.rotation.y} />
        <InputEditor inputLabel="z" value={props.object.rotation.z} />
        <InputCategoryLabel catergoryLabel="Scale" />
        <InputEditor inputLabel="x" value={props.object.scale.x} />
        <InputEditor inputLabel="y" value={props.object.scale.y} />
        <InputEditor inputLabel="z" value={props.object.scale.z} />
      </Grid>
      <Text fontSize="sm" mb="4">
        Material
      </Text>
      <Grid templateColumns={"1fr 1fr 1fr"} gap={2} alignItems="center" mb="8">
        <InputCategoryLabel catergoryLabel="Color" />
        <InputEditor inputLabel="r" value={color.r} />
        <InputEditor inputLabel="g" value={color.g} />
        <InputEditor inputLabel="b" value={color.b} />
      </Grid>
      <RgbaColorPicker color={color} onChange={setColor} />
    </Container>
  );
}
