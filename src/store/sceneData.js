import uniqueId from "lodash.uniqueid";
import * as THREE from "three";
import { proxy, useSnapshot } from "valtio";
import { derive, proxyMap } from "valtio/utils";

export const sceneStateStore = proxy({
  current: {
    id: null,
    material: null,
    texture: null
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
      nodes: object.nodes,
      texture: "default",
      bounds: {
        min: new THREE.Vector3(
          object.bounds.min.x,
          object.bounds.min.y,
          object.bounds.min.z
        ),
        max: new THREE.Vector3(
          object.bounds.max.x,
          object.bounds.max.y,
          object.bounds.max.z
        ),
        isColliding: false,
      },
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
    sceneStateStore.current.material = name;
  },

  setActiveTexture(texture) {
    sceneStateStore.current.texture = texture;
  },

  getActiveObject() {
    const id = sceneStateStore.current;
    const currentObject = useSnapshot(sceneStateStore.sceneObjects);

    if (!sceneStateStore.current) {
      console.log("checking");
      const sceneCurrent = Array.from(currentObject.scene.values()).find(
        (object) => object.id === id
      );
      return sceneCurrent.position;
    } else {
      return 0;
    }
  },

  /** Get bounds except for current object */
  getSceneBounds(id) {
    const scene = sceneStateStore.sceneObjects;

    // return Array.from(scene.values())
    // .filter((obj) => obj.id !== id)
    // .map((obj) => [obj.bounds.min, obj.bounds.max])
    // .flat();

    return Array.from(scene.values())
      .filter((obj) => obj.id !== id)
      .map((obj) => ({ min: obj.bounds.min, max: obj.bounds.max }));
  },

  removeActiveObject() {
    sceneStateStore.current.id = null;
    sceneStateStore.current.material = null;
  },

  updateObjectBounds(id, bbMin, bbMax) {
    const object = sceneStateStore.sceneObjects.get(id);

    if (object) {
      object.bounds.min = bbMin;
      object.bounds.max = bbMax;
    }
    sceneStateStore.sceneObjects.set(id, object);
  },

  updateObjectPosition(id, position) {
    const object = sceneStateStore.sceneObjects.get(id);
    if (object) {
      object.scene.position.x = position.x;
      object.scene.position.y = position.y;
      object.scene.position.z = position.z;
    }
    sceneStateStore.sceneObjects.set(id, object);
  },
};

export const roomStateStore = proxy({
  currentRoom: null,
});

export const loaderStateStore = proxy({
  loaderProgress: false,
});

export const cameraOrbitStateStore = proxy({
  orbitCameraEnabled: true,
});

export const sceneObjectBounds = derive({
  data: (get) =>
    // I access the state with the get function provided by Valtio
    Array.from(get(sceneStateStore).sceneObjects.values()).map((obj) => ({
      id: obj.id,
      min: obj.bounds.min,
      max: obj.bounds.max,
    })),
});
