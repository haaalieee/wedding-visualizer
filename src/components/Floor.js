/* eslint-disable react/no-unknown-property */
// import { useHelper } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
// import { Box3Helper } from "three";

export default function Floor() {
  const floorRef = useRef();
  const bbFloorRef = useRef();

  useEffect(() => {
    bbFloorRef.current?.setFromObject(floorRef.current);
  }, [bbFloorRef, floorRef]);

  // useHelper(bbFloorRef, Box3Helper, "cyan");

  return (
    <box3 ref={bbFloorRef}>
      <mesh ref={floorRef} receiveShadow position-y={-0.1}>
        <boxGeometry args={[250, 0.1, 250]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </box3>
  );
}
