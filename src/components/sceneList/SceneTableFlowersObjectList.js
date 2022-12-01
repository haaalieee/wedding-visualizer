import { Loader } from "@react-three/drei";
import React, { Suspense } from "react";
import { useSnapshot } from "valtio";
import { TableFlowers } from "../../models";
import { sceneStateStore } from "../../store/sceneData";

export function SceneTableFlowersObjectList() {
  const snap = useSnapshot(sceneStateStore);

  return Array.from(snap.sceneObjects.values())
    .filter(({ type }) => type === "table_flowers")
    .map(({ id, nodes }) => (
      <Suspense key={id} fallback={<Loader />}>
        <TableFlowers
          objectId={id}
          nodes={nodes}
        />
      </Suspense>
    ));
}
