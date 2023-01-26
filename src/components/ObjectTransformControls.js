/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { TransformControls } from "@react-three/drei";
import React, { useEffect } from "react";
import { useKey } from "react-use";
import { sceneStateStore } from "../store/sceneData";

export default function ObjectTransformControls({
  id,
  object,
  onTransformChange,
  onTransformEnd,
}) {

  /** Change transform mode when keys are triggered */
  const [transformMode, setTransformMode] = React.useState("translate");

  /** Set transform mode to translate */
  const translateMode = () => {
    console.log("translating");
    setTransformMode("translate");
  };

  /** Set transform mode to translate */
  const rotateMode = () => {
    console.log("rotating");
    setTransformMode("rotate");
  };

  /** Keys for setting up mode */
  useKey("w", translateMode);
  useKey("r", rotateMode);

  const [triggerUpdate, setTriggerUpdate] = React.useState(false);

  const currentObject = sceneStateStore.sceneObjects.get(id);

  useEffect(() => {
    if (triggerUpdate) {
      if (transformMode === "rotate") {
        currentObject.scene.rotation.x = object.rotation.x;
        currentObject.scene.rotation.y = object.rotation.y;
        currentObject.scene.rotation.z = object.rotation.z;
      } else {
        currentObject.scene.position.x = object.position.x;
        currentObject.scene.position.y = object.position.y;
        currentObject.scene.position.z = object.position.z;
      }
    }
  }, [triggerUpdate]);

  return (
    <>
      <TransformControls
        object={object}
        mode={transformMode}
        translationSnap={0.5}
        scaleSnap={0.5}
        rotationSnap={0.5}
        onMouseDown={() => {
          onTransformEnd();
          setTriggerUpdate(true);
        }}
        onPointerMissed={() => {
          setTriggerUpdate(false);
        }}
        onChange={
          onTransformChange
        }
      />
    </>
  );
}
