import React, { Suspense } from "react";
import { useSnapshot } from "valtio";
import { roomStateStore } from "../../store/sceneData";
import Loader from "../Loader";
import { Bricks, Vintage, Warehouse } from "../rooms";

export default function SceneRoomList() {
  const roomState = useSnapshot(roomStateStore);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Warehouse visible={roomState.currentRoom === "warehouse"} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Vintage visible={roomState.currentRoom === "vintage"} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Bricks visible={roomState.currentRoom === "bricks"} />
      </Suspense>
    </>
  );
}
