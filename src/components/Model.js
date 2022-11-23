/* eslint-disable react/prop-types */
import {
  Instance,
  Instances,
  TransformControls,
  useGLTF
} from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useBoolean, useKey } from "react-use";
import { useSceneObjects } from "../store/useSceneObjects";

const Model = ({ url, id, position, rotation, objGeometry}) => {
  const {scene, nodes } = useGLTF(url);
  const [active, toggleActive] = useBoolean(false);
  const [transformMode, setTransformMode] = React.useState("translate");
  const [localPosition, setLocalPosition] = React.useState(position);
  const {updateObjectPosition } = useSceneObjects();

  const translateMode = () => {
    setTransformMode("translate");
  };
  const rotateMode = () => {
    setTransformMode("rotate");
  };
  const scaleMode = () => {
    setTransformMode("scale");
  };

  useKey("w", translateMode);
  useKey("e", rotateMode);
  useKey("r", scaleMode);

  React.useEffect(() => {
    updateObjectPosition(id, localPosition);
  }, [localPosition, updateObjectPosition]);

  const objectRef = useRef();

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

  return (
    <>
      <Instances
        range={10}
        geometry={nodes[objGeometry].geometry}
      >
        {/* <primitive object={scene} castShadow receiveShadow /> */}
        {/* <boxGeometry /> */}
        <meshStandardMaterial color="white"/>
        <Instance
          ref={objectRef}
          onClick={() => {
            toggleActive();
          }}
          onPointerMissed={(e) => {
            e.type === "click" && toggleActive(false);
          }}
          position={localPosition}
          rotation={rotation}
        />
      </Instances>
      {active && (
        <TransformControls
          object={objectRef}
          mode={transformMode}
          onChange={() => setLocalPosition(scene.position)}
        />
      )}
    </>
  );
};

export default Model;
