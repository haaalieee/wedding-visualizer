/* eslint-disable react/no-unknown-property */
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { useControls } from "leva";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { subscribe } from "valtio";
import {
  ChandelierInstances,
  DiningSetInstances,
  FairyLightsInstances, TableFlowersInstances
} from "../models";
import { sceneStateStore } from "../store/sceneData";
import CameraController from "./CameraController";
import {
  SceneChandelierObjectList, SceneDiningSetObjectList, SceneFairyLightsObjectList,
  SceneTableFlowersObjectList
} from "./sceneList";

export default function MainScene() {
  const [loadedObjects, setLoadedObjects] = useState(false);

  subscribe(
    sceneStateStore.sceneObjects,
    () => {
      setLoadedObjects(true);
    },
    sceneStateStore.sceneObjects
  );

  // const [{ envHeight, envRadius, envScale }] = useControls(
  //   "Env Map Settings",
  //   () => ({
  //     envHeight: {
  //       value: 29,
  //       min: 0,
  //       max: 1000,
  //       step: 1,
  //     },
  //     envRadius: {
  //       value: 214,
  //       min: 0,
  //       max: 1000,
  //       step: 1,
  //     },
  //     envScale: {
  //       value: 50,
  //       min: 0,
  //       max: 1000,
  //       step: 1,
  //     },
  //   })
  // );

  const gridRef = useRef();

  useEffect(()=>{
    if(gridRef.current) {
      console.log(gridRef.current)
    }
  },[gridRef.current])

  return (
    <>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
        shadows
      >
        {/* <color args={["#e3f4ff"]} attach="background" /> */}
        <spotLight angle={1} position={[-80, 200, -100]} intensity={1} />
        <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
        <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
        {loadedObjects && (
          <>
            <Suspense fallback={<Loader />}>
              <DiningSetInstances>
                <SceneDiningSetObjectList />
              </DiningSetInstances>
            </Suspense>
            <Suspense fallback={<Loader />}>
              <TableFlowersInstances>
                <SceneTableFlowersObjectList />
              </TableFlowersInstances>
            </Suspense>
            <Suspense fallback={<Loader />}>
              <FairyLightsInstances>
                <SceneFairyLightsObjectList />
              </FairyLightsInstances>
            </Suspense>
            <Suspense fallback={<Loader />}>
              <ChandelierInstances>
                <SceneChandelierObjectList />
              </ChandelierInstances>
            </Suspense>
          </>
        )}
        {/* <ContactShadows scale={20} blur={10} far={20} /> */}
        <OrbitControls makeDefault />
        {/* <Environment
          files="/dancing_hall_1k.hdr"
          ground={{ height: envHeight, radius: envRadius, scale: envScale }}
        /> */}
        <CameraController />
        <gridHelper args={[150, 50, "blue", "hotpink"]} ref={gridRef} />
      </Canvas>
    </>
  );
}
