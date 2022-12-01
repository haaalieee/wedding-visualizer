import { proxy, useSnapshot } from "valtio";
import { proxyMap } from "valtio/utils";
import uniqueId from "lodash.uniqueid";

export const sceneStateStore = proxy({
  current: {
    id: null,
    material: null
  },
  sceneObjects: proxyMap([]),
});

export const sceneActions = {
  addObject(object) {
    const id = uniqueId();
    sceneStateStore.sceneObjects.set(id, {
      id: id,
      name: object.name,
      type: object.type,
      scene: {
        position: {
          x: object.position.x,
          y: object.position.y,
          z: object.position.z,
        },
        rotation: {
          x: object.rotation.x,
          y: object.rotation.y,
          z: object.rotation.z,
        },
        scale: {
          x: object.scale.x,
          y: object.scale.y,
          z: object.scale.z,
        },
      },
      nodes: object.nodes
    });
  },

  saveScene(id) {
    const object = sceneStateStore.sceneObjects.get(id);
    console.log(object);
  },

  setActiveObject(id) {
    sceneStateStore.current.id = id;
  },

  setActiveMaterial(name) {
    sceneStateStore.current.material = name
  },

  getActiveObject() {
    const id = sceneStateStore.current
    const currentObject = useSnapshot(sceneStateStore.sceneObjects)

    if (!sceneStateStore.current) {
      console.log("checking")
      const sceneCurrent = Array.from(currentObject.scene.values()).find(
        ( object ) => object.id === id
      )
      return sceneCurrent.position
    } else {
      return 0;
    }
  },

  removeActiveObject() {
    sceneStateStore.current.id = null;
    sceneStateStore.current.material = null;
  },

  updateObjectPosition(id, position) {
    const object = sceneStateStore.sceneObjects.get(id);
    if (object) {
      object.scene.position.x = position.x;
      object.scene.position.y = position.y;
      object.scene.position.z = position.z;
    }
  },
};
