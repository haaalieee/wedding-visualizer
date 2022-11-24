/* eslint-disable react/prop-types */
import { TransformControls } from "@react-three/drei";
import React from "react";
import { useKey } from "react-use";

export default function ObjectTransformControls({ object }) {
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
      onPointerMissed={() => console.log("missing")}
    />
  );
}
