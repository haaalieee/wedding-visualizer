import { proxy } from "valtio";

export const sceneState = proxy({
  current: null,
  sceneObjects: [],
});
