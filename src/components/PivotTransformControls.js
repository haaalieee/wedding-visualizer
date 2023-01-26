/* eslint-disable react/prop-types */
import { PivotControls } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { sceneStateStore } from "../store/sceneData";

export default function PivotTransformControls({
  id,
  currentObject,
  isVisible,
}) {
  const [triggerUpdate, setTriggerUpdate] = React.useState(false);
  const sceneObject = sceneStateStore.sceneObjects.get(id);

  useEffect(() => {
    if (triggerUpdate) {
      sceneObject.scene.position.x = currentObject.position.x;
      sceneObject.scene.position.y = currentObject.position.y;
      sceneObject.scene.position.z = currentObject.position.z;
    }
  }, [triggerUpdate]);

  const pivotRef = useRef();
  const matrix = new THREE.Matrix4();

  useEffect(() => {
    console.log(isVisible);
  }, [isVisible]);

  return (
    <PivotControls
      ref={pivotRef}
      object={currentObject}
      matrix={matrix}
      depthTest={false}
      anchor={[0, 0, 0]}
      visible={isVisible}
      autoTransform={false}
      onDragStart={() => {
        setTriggerUpdate(true);
      }}
      onDragEnd={() => {
        setTriggerUpdate(false);
      }}
    />
  );
}
