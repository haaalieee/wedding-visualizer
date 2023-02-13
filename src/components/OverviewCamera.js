/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { OrthographicCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import { Vector2, Vector3 } from "three";

export default function OverviewCamera({ buffer }) {
  const orthoCam = useRef();
  const { gl, scene, camera } = useThree();

  const [{ camPosition, camRotation }] = useControls(
    "Overview Camera Settings",
    () => ({
      camPosition: {
        value: {
          x: 0, //20
          y: 15, //40
          z: 0, //20
        },
        min: -1000,
        max: 1000,
        step: 0.1,
      },
      camLookAt: {
        value: {
          x: 0,
          y: -1, //32
          z: 0,
        },
        min: -100,
        max: 100,
        step: 0.1,
      },
      camRotation: {
        value: {
          x: 0,
          y: 0,
          z: 0,
        },
        min: -100,
        max: 100,
        step: 0.1,
      },
    })
  );

  useEffect(() => {
    orthoCam.current.up = new Vector3(0, 0, -1);
  }, []);

  const mainCameraWorldPos = new Vector3();
  const orthoCamRotation = new Vector2();

  useFrame(() => {
    gl.setRenderTarget(buffer);
    gl.render(scene, orthoCam.current);
    gl.setRenderTarget(null);

    /** Rotate ortho cam Z axis relative to camera world position */
    if (orthoCam.current) {
      camera.getWorldDirection(mainCameraWorldPos);
      orthoCamRotation.set(mainCameraWorldPos.x, mainCameraWorldPos.z);
      orthoCam.current.rotation.z = -Math.PI / 2 - orthoCamRotation.angle();
    }
  });

  return (
    <OrthographicCamera
      ref={orthoCam}
      position={[camPosition.x, camPosition.y, camPosition.z]}
      rotation={[-Math.PI / 2, camRotation.y, camRotation.z]}
      zoom={5}
    />
  );
}
