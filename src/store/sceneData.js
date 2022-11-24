import { proxy } from "valtio";
import { proxyMap } from 'valtio/utils';

export const sceneState = proxy({
  current: null,
  sceneObjects: proxyMap([]),
});
