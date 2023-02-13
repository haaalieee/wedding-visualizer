/* eslint-disable react/no-unknown-property */
import { OrthographicCamera, Plane, useFBO } from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useRef } from "react";
import * as THREE from "three";
import { Scene } from "three";
import OverviewCamera from "./OverviewCamera";

export default function OverviewDisplay() {
  const { size } = useThree();

  const buffer = useFBO(window.innerWidth / 4, window.innerHeight / 4);
  const planeAspect = window.innerWidth / window.innerHeight;
  const planeSize = 150;

  const hudScene = new Scene();
  const hudCamera = useRef();

  const debugBG = new THREE.Color("#fff");

  const [{ camPosition, camZoom }] = useControls("HUD Camera Settings", () => ({
    camPosition: {
      value: {
        x: 0,
        y: 0,
        z: 0,
      },
      min: -1000,
      max: 1000,
      step: 0.1,
    },
    camZoom: {
      value: 2.5, //67
      min: 0,
      max: 100,
      step: 0.5,
    },
  }));

  useFrame(({ gl, scene, camera }) => {
    gl.autoClear = false;
    scene.background = debugBG;

    // render main scene
    scene.overrideMaterial = null;
    gl.setRenderTarget(null);
    gl.render(scene, camera);

    gl.render(hudScene, hudCamera.current);
    gl.autoClear = true;
  }, 1);

  return (
    <>
      {createPortal(
        <>
          <OrthographicCamera
            ref={hudCamera}
            makeDefault
            position={[camPosition.x, camPosition.y, camPosition.z]}
            zoom={camZoom}
          />
          <group position={[size.width / 5 - 60, size.height / 5 - 60, -0.1]}>
            {/** size.width/5 - 60, size.height/5 - 60, 0*/}
            <ambientLight intensity={1} />
            <Plane args={[planeSize, planeSize / planeAspect, 1]}>
              <meshStandardMaterial map={buffer.texture} />
            </Plane>
          </group>
        </>,
        hudScene
      )}
      <OverviewCamera buffer={buffer} />
    </>
  );
}
