import { Loader } from "@react-three/drei";
import React, { Suspense } from "react";
import { useSnapshot } from "valtio";
import { Chandelier } from "../../models/Chandelier";
import { sceneStateStore } from "../../store/sceneData";

export function SceneChandelierObjectList() {
    const snap = useSnapshot(sceneStateStore);

    return Array.from(snap.sceneObjects.values())
      .filter(({ type }) => type === "chandelier")
      .map(({ id, nodes }) => (
        <Suspense key={id} fallback={<Loader />}>
          <Chandelier
            objectId={id}
            nodes={nodes}
          />
        </Suspense>
      ));
}
