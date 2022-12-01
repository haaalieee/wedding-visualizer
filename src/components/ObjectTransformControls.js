/* eslint-disable react/prop-types */
import { TransformControls } from "@react-three/drei";
import React from "react";
import { useKey } from "react-use";
import { sceneStateStore } from "../store/sceneData";

export default function ObjectTransformControls({ id, object }) {
  const [transformMode, setTransformMode] = React.useState("translate");

  const translateMode = () => {
    console.log("translating");
    setTransformMode("translate");
  };
  const rotateMode = () => {
    console.log("rotating");
    setTransformMode("rotate");
  };
  const scaleMode = () => {
    console.log("scaling");
    setTransformMode("scale");
  };

  useKey("w", translateMode);
  useKey("r", rotateMode);
  useKey("s", scaleMode);

  const currentObject = sceneStateStore.sceneObjects.get(id);

  // const { setTransformUpdate } = useTransformStore();

  // const [localPosition, setLocalPosition] = React.useState(position);
  // const [localRotation, setLocalRotation] = React.useState(rotation);
  // const [localScale, setLocalScale] = React.useState(scale);

  // const {
  //   updateObjectPosition,
  //   updateObjectRotation,
  //   updateObjectScale
  // } = useSceneObjects();

  // useUpdateObjectPosition(id, localPosition, updateObjectPosition);
  // useUpdateObjectRotation(id, localRotation, updateObjectRotation);
  // useUpdateObjectScale(id, localScale, updateObjectScale);

  return (
    <TransformControls
      object={object}
      mode={transformMode}
      onObjectChange={() => {
        if (currentObject) {
          currentObject.scene.position.x = object.position.x;
          currentObject.scene.position.y = object.position.y;
          currentObject.scene.position.z = object.position.z;

          currentObject.scene.scale.x = object.scale.x;
          currentObject.scene.scale.y = object.scale.y;
          currentObject.scene.scale.z = object.scale.z;

          currentObject.scene.rotation.x = object.rotation.x;
          currentObject.scene.rotation.y = object.rotation.y;
          currentObject.scene.rotation.z = object.rotation.z;
        }
        // setObjectTransformed({...object});
        // if (transformMode === "scale") {
        //   console.log("scaling");
        //   setLocalScale([object.scale.x, object.scale.y, object.scale.z]);
        // } else if (transformMode === "rotate") {
        //   console.log("rotating");
        //   console.log(
        //     "rotation " +
        //       object.rotation.x +
        //       object.rotation.y +
        //       object.rotation.z
        //   );
        //   setLocalRotation([
        //     object.rotation.x,
        //     object.rotation.y,
        //     object.rotation.z,
        //   ]);
        // } else {
        //   console.log(
        //     "positioning",
        //     object.position.x,
        //     object.position.y,
        //     object.position.z
        //   );
        //   // setLocalPosition([
        //   //   object.position.x,
        //   //   object.position.y,
        //   //   object.position.z,
        //   // ]);
        // }
        // setTransformUpdate(true);
      }}
    />
  );
}
