/* eslint-disable react/no-unknown-property */
import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { useControls } from "leva";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { subscribe, useSnapshot } from "valtio";
import {
  ChairsInstances,
  ChandelierInstances,
  DiningSetInstances,
  FairyLightsInstances,
  TableFlowersInstances
} from "../models";
import {
  cameraOrbitStateStore, canvasPointerStateStore, sceneStateStore
} from "../store/sceneData";
import CameraController from "./CameraController";
import Floor from "./Floor";
import Loader from "./Loader";
import OverviewDisplay from "./OverviewDisplay";
import {
  SceneChairsObjectList,
  SceneChandelierObjectList,
  SceneDiningSetObjectList,
  SceneFairyLightsObjectList,
  SceneTableFlowersObjectList
} from "./sceneList";
import SceneRoomList from "./sceneList/SceneRoomList";

export default function MainScene() {
  const [loadedObjects, setLoadedObjects] = useState(false);

  subscribe(
    sceneStateStore.sceneObjects,
    () => {
      setLoadedObjects(true);
    },
    sceneStateStore.sceneObjects
  );

  const gridRef = useRef();

  useEffect(() => {
    console.log(gridRef);
  }, [gridRef]);

  /** Get orbit camera props from store */
  const cameraState = useSnapshot(cameraOrbitStateStore);

  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      /** Listener when pointer or cursor leaves or enter the canvas */
      onPointerLeave={() => {
        canvasPointerStateStore.pointerActive = false;
      }}
      onPointerEnter={() => {
        canvasPointerStateStore.pointerActive = true;
      }}
      shadows
    >
      {/* <color args={["#e3f4ff"]} attach="background" /> */}
      <spotLight angle={1} position={[-80, 200, -100]} intensity={1} />
      <ambientLight intensity={0.5} />
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
          <Suspense fallback={<Loader />}>
            <ChairsInstances>
              <SceneChairsObjectList />
            </ChairsInstances>
          </Suspense>
        </>
      )}
      <Floor />
      <SceneRoomList />
      {/* <Environment
          files="/dancing_hall_1k.hdr"
          ground={{ height: envHeight, radius: envRadius, scale: envScale }}
        /> */}
      <OrbitControls makeDefault enabled={cameraState.orbitCameraEnabled} />
      <CameraController />
      <gridHelper args={[250, 50, "blue", "hotpink"]} ref={gridRef} />
      <OverviewDisplay />
      <Stats className="stats" />
    </Canvas>
  );
}
