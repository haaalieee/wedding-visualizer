import { Loader } from "@react-three/drei";
import React, { Suspense } from "react";
import { useSnapshot } from "valtio";
import { DiningSet } from "../../models/DiningSet";
import {
  sceneStateStore
} from "../../store/sceneData";

export function SceneDiningSetObjectList() {
  const snap = useSnapshot(sceneStateStore);

  return Array.from(snap.sceneObjects.values())
    .filter(({ type }) => type === "dining_set")
    .map(({ id, nodes, scene, texture }) => (
      <Suspense key={id} fallback={<Loader />}>
          <DiningSet
            objectId={id}
            nodes={nodes}
            position={scene.position}
            rotation={scene.rotation}
            scale={scene.scale}
            texture={texture}
          />
      </Suspense>
    ));
}
