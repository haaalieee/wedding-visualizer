/* eslint-disable react/prop-types */
import { TransformControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { useKey } from "react-use";
import { sceneStateStore } from "../store/sceneData";

export default function ObjectTransformControls({id, object }) {
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

  useFrame(()=>{
    if (currentObject) {
      if (transformMode === "scale") {
        currentObject.scene.scale.x = object.scale.x;
        currentObject.scene.scale.y = object.scale.y;
        currentObject.scene.scale.z = object.scale.z;
      } else if (transformMode === "rotate") {
        currentObject.scene.rotation.x = object.rotation.x;
        currentObject.scene.rotation.y = object.rotation.y;
        currentObject.scene.rotation.z = object.rotation.z;
      } else {
        currentObject.scene.position.x = object.position.x;
        currentObject.scene.position.y = object.position.y;
        currentObject.scene.position.z = object.position.z;
      }
    }
  })
  
  return (
    <TransformControls
      object={object}
      mode={transformMode}
      translationSnap={0.5}
      scaleSnap={0.5}
      rotationSnap={0.5}
    />
  );
}
