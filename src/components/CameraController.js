import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React from "react";


export default function CameraController() {
  const [{ camPosition, camFov, camLookAt }] = useControls(
    "Camera Settings",
    () => ({
      camPosition: {
        value: {
          x: 0, //20
          y: 18, //40
          z: 33, //20
        },
        min: -1000,
        max: 1000,
        step: 0.1,
      },
      camLookAt: {
        value: {
          x: 0.3,
          y: 3.5, //32 
          z: 0,
        },
        min: -100,
        max: 100,
        step: 0.1,
      },
      camFov: {
        value: 45, //67
        min: 0,
        max: 100,
        step: 1,
      },
    })
  );

  useFrame((state) => {
    state.camera.lookAt(camLookAt.x, camLookAt.y, camLookAt.z);
    state.camera.updateProjectionMatrix();
  });

  return (
    <PerspectiveCamera
      makeDefault
      position={[camPosition.x, camPosition.y, camPosition.z]}
      fov={camFov}
    />
  );
}
