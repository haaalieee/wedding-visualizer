import { Loader } from "@react-three/drei";
import React, { Suspense } from "react";
import { useSnapshot } from "valtio";
import { FairyLights } from "../../models";
import { sceneStateStore } from "../../store/sceneData";

export function SceneFairyLightsObjectList() {
  const snap = useSnapshot(sceneStateStore);

  return Array.from(snap.sceneObjects.values())
    .filter(({ type }) => type === "fairy_lights")
    .map(({ id, nodes, scene }) => (
      <Suspense key={id} fallback={<Loader />}>
        <FairyLights objectId={id} nodes={nodes}  position={scene.position}
          rotation={scene.rotation}
          scale={scene.scale}/>
      </Suspense>
    ));
}
