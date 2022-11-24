/* eslint-disable react/no-unknown-property */
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import React, { Suspense, useState } from "react";
import { subscribe, useSnapshot } from "valtio";
import { Chandelier, ChandelierInstances } from "../models/Chandelier";
import { DiningSet, DiningSetInstances } from "../models/DiningSet";
import { FairyLights, FairyLightsInstances } from "../models/FairyLights";
import { TableFlowers, TableFlowersInstances } from "../models/TableFlowers";
import { sceneState } from "../store/sceneData";
import { useSceneObjects } from "../store/useSceneObjects";
import CameraController from "./CameraController";

// const SceneObjectList = () => {
//   const sceneObjects = useSceneObjects((state) => state.sceneObjects);

//   return sceneObjects.map(({ id, type, position, rotation }) => (
//     <Suspense key={id} fallback={<Loader />}>
//       {/* <Model
//           url={file}
//           id={id}
//           position={[position.x, position.y, position.z]}
//           rotation={[rotation.x, rotation.y, rotation.z]}
//           objGeometry={objGeometry}
//           objMaterial={objMaterial}
//         /> */}
//     </Suspense>
//   ));
// };

const SceneFairyLightsObjectList = () => {
  const { sceneObjects } = useSceneObjects();

  return sceneObjects
    .filter((object) => object.type === "fairy_lights")
    .map(({ id, position, rotation, scale }) => {
      return (
        <Suspense key={id} fallback={<Loader />}>
          <FairyLights
            objectId={id}
            position={[position.x, position.y, position.z]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={[scale.x, scale.y, scale.z]}
          />
        </Suspense>
      );
    });
};

const SceneDiningSetObjectList = () => {
  const snap = useSnapshot(sceneState);

  return Array.from(snap.sceneObjects.values())
    .filter(({ type }) => type === "dining_set")
    .map(({ id }) => (
      <Suspense key={id} fallback={<Loader />}>
        <DiningSet objectId={id} />
      </Suspense>
    ));
};

const SceneTableFlowersObjectList = () => {
  const { sceneObjects } = useSceneObjects();

  return sceneObjects
    .filter((object) => object.type === "table_flowers")
    .map(({ id, position, rotation, scale }) => {
      return (
        <Suspense key={id} fallback={<Loader />}>
          <TableFlowers
            objectId={id}
            position={[position.x, position.y, position.z]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={[scale.x, scale.y, scale.z]}
          />
        </Suspense>
      );
    });
};

const SceneChandelierObjectList = () => {
  const { sceneObjects } = useSceneObjects();

  return sceneObjects
    .filter((object) => object.type === "chandelier")
    .map(({ id, position, rotation, scale }) => {
      return (
        <Suspense key={id} fallback={<Loader />}>
          <Chandelier
            objectId={id}
            position={[position.x, position.y, position.z]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            scale={[scale.x, scale.y, scale.z]}
          />
        </Suspense>
      );
    });
};

export default function MainScene() {
  // const sceneObjects = useSceneObjects((state) => state.sceneObjects);

  // const snap = useSnapshot(sceneState);
  const [loadedObjects, setLoadedObjects] = useState(false);

  subscribe(
    sceneState.sceneObjects,
    () => {
      setLoadedObjects(true);
    },
    sceneState.sceneObjects
  );

  const [{ envHeight, envRadius, envScale }] = useControls(
    "Env Map Settings",
    () => ({
      envHeight: {
        value: 29,
        min: 0,
        max: 1000,
        step: 1,
      },
      envRadius: {
        value: 214,
        min: 0,
        max: 1000,
        step: 1,
      },
      envScale: {
        value: 50,
        min: 0,
        max: 1000,
        step: 1,
      },
    })
  );

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
        <Environment
          files="/dancing_hall_1k.hdr"
          ground={{ height: envHeight, radius: envRadius, scale: envScale }}
        />
        <CameraController />
      </Canvas>
    </>
  );
}
