import { Loader } from "@react-three/drei";
import React, { Suspense } from "react";
import { useSnapshot } from "valtio";
import { Chairs } from "../../models";
import { sceneStateStore } from "../../store/sceneData";

export function SceneChairsObjectList() {
  const snap = useSnapshot(sceneStateStore);

  return Array.from(snap.sceneObjects.values())
    .filter(({ type }) => type === "chairs")
    .map(({ id, nodes, scene, bounds }) => (
      <Suspense key={id} fallback={<Loader />}>
          <Chairs
            objectId={id}
            nodes={nodes}
            position={scene.position}
            rotation={scene.rotation}
            scale={scene.scale}
            bounds={bounds}
          />
      </Suspense>
    ));
}
