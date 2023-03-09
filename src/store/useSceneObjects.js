import uniqueId from "lodash.uniqueid";
import create from "zustand";

export const useSceneObjects = create((set, get) => ({
  sceneObjects: [],
  setActiveObject: (id) =>
    set((state) => {
      const newSceneObjects = state.sceneObjects.map((sceneObject) => {
        if (sceneObject.id === id) {
          return { ...sceneObject, isActive: true };
        }
        return sceneObject;
      });
      return { sceneObjects: newSceneObjects };
    }),
  setActiveChildObject: (parentId, childId) =>
    set((state) => {
      const newSceneObjects = state.sceneObjects.map((sceneObject) => {
        if (sceneObject.id === parentId) {
          return { ...sceneObject, activeChild: childId };
        }
        return sceneObject;
      });
      return { sceneObjects: newSceneObjects };
    }),
  saveObjectScene: (id, scene) =>
    set((state) => {
      const newSceneObjects = state.sceneObjects.map((sceneObject) => {
        if (sceneObject.id === id) {
          console.log("saving....");
          return { ...sceneObject, scene };
        }
        return sceneObject;
      });
      return { sceneObjects: newSceneObjects };
    }),
  getActiveObject: () => {
    const objects = get().sceneObjects;
    const activeObject = objects.find((object) => object.isActive === true);
    return activeObject;
  },
  getActiveChildObject: () => {
    const objects = get().sceneObjects;
    const activeParentObject = objects.find(
      (object) => object.isActive === true
    );
    const activeChildObject = activeParentObject.scene.children.find(
      (obj) => obj.uuid === activeParentObject.activeChild
    );
    return activeChildObject;
  },
  rmActiveObject: (id) =>
    set((state) => {
      const newSceneObjects = state.sceneObjects.map((sceneObject) => {
        if (sceneObject.id === id) {
          delete sceneObject.isActive;
          delete sceneObject.activeChild;
          return { ...sceneObject };
        }
        return sceneObject;
      });
      return { sceneObjects: newSceneObjects };
    }),
  updateObjectPosition: (id, position) =>
    set((state) => {
      const newSceneObjects = state.sceneObjects.map((sceneObject) => {
        if (sceneObject.id === id) {
          return { ...sceneObject, position };
        }
        return sceneObject;
      });
      return { sceneObjects: newSceneObjects };
    }),
  updateObjectRotation: (id, rotation) =>
    set((state) => {
      const newSceneObjects = state.sceneObjects.map((sceneObject) => {
        if (sceneObject.id === id) {
          return { ...sceneObject, rotation };
        }
        return sceneObject;
      });
      return { sceneObjects: newSceneObjects };
    }),
  updateObjectScale: (id, scale) =>
    set((state) => {
      const newSceneObjects = state.sceneObjects.map((sceneObject) => {
        if (sceneObject.id === id) {
          return { ...sceneObject, scale };
        }
        return sceneObject;
      });
      return { sceneObjects: newSceneObjects };
    }),
  updateActiveChildColor: (id, color) =>
    set((state) => {
      const newSceneObjects = state.sceneObjects.map((sceneObject) => {
        if (sceneObject.id === id) {
          const newChildren = [...sceneObject.scene.children];
          const activeChildObjectIndex = newChildren.findIndex(
            (obj) => obj.uuid === sceneObject.activeChild
          );
          if (activeChildObjectIndex > -1) {
            newChildren[
              activeChildObjectIndex
            ].instance.current.material.color = {
              r: color.r / 255,
              g: color.g / 255,
              b: color.b / 255,
            };
          }
          return {
            ...sceneObject,
            scene: {
              ...sceneObject.scene,
              children: newChildren,
            },
          };
        }
        return sceneObject;
      });
      return { sceneObjects: newSceneObjects };
    }),
  addSceneObject: (sceneObject) =>
    set((state) => ({
      sceneObjects: [...state.sceneObjects, { id: uniqueId(), ...sceneObject }],
    })),
  rmSceneObject: (sceneObject) =>
    set((state) => ({
      sceneObjects: state.sceneObjects.filter((obj) => {
        return obj !== sceneObject;
      }),
    })),
}));

export const useCameraOrbitStore = create((set) => ({
  cameraOrbit: true,
  setCameraOrbitUpdate: (isOrbitting) => {
    set({
      cameraOrbit: isOrbitting,
    });
  },
}));
