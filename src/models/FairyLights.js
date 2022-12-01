/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: cartti (https://sketchfab.com/cartti)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/fairy-lights-82a67d28bc554f29b70c3300dc06bc3d
title: Fairy Lights
*/

import { Merged, useGLTF } from "@react-three/drei";
import React, { createContext, useContext, useMemo, useRef } from "react";
import { useToggle } from "react-use";
import ObjectTransformControls from "../components/ObjectTransformControls";
import { sceneActions, sceneStateStore } from "../store/sceneData";

const context = createContext();
export function FairyLightsInstances({ children, ...props }) {
  const { nodes } = useGLTF("/fairy_lights-transformed.glb");
  const instances = useMemo(
    () => ({
      Object: nodes.Object_4,
      Object1: nodes.Object_5,
      Object2: nodes.Object_6,
      Object3: nodes.Object_7,
      Object4: nodes.Object_9,
      Object5: nodes.Object_10,
      Object6: nodes.Object_11,
      Object7: nodes.Object_12,
      Object8: nodes.Object_14,
      Object9: nodes.Object_15,
      Object10: nodes.Object_16,
      Object11: nodes.Object_17,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
}

export function FairyLights(props) {
  const instances = useContext(context);

  const [active, toggleActive] = useToggle(false);

  const objectRef = useRef();

  return (
    <>
      <group
        {...props}
        dispose={null}
        onClick={(e) => {
          e.stopPropagation();
          // setActiveObject(props.objectId);
          // setActiveChildObject(props.objectId, e.object.uuid);
          // setTransformUpdate(true);
          sceneActions.setActiveObject(props.objectId);
          // console.log(e.object.instance.current.material.name)
          sceneActions.setActiveMaterial(
            e.object.instance.current.material.name
          );
          toggleActive(true);
        }}
        onPointerMissed={(e) => {
          e.type === "click" && toggleActive(false);
          sceneActions.removeActiveObject();
          console.log(sceneStateStore);
          // rmActiveObject(props.objectId);
          // setTransformUpdate(false);
        }}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[4, 4, 4]}
        ref={objectRef}
      >
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-2.02, 0.68, 1]}>
              <instances.Object color={props.nodes.Emissive}/>
              <instances.Object1 color={props.nodes.Metal}/>
              <instances.Object2 color={props.nodes.Cable}/>
              <instances.Object3 color={props.nodes.Socket}/>
            </group>
            <group position={[-2.02, 0.68, 0]}>
              <instances.Object4 color={props.nodes.Emissive}/>
              <instances.Object5 color={props.nodes.Metal}/>
              <instances.Object6 color={props.nodes.Cable}/>
              <instances.Object7 color={props.nodes.Socket}/>
            </group>
            <group position={[-2.02, 0.68, -1]}>
              <instances.Object8 color={props.nodes.Emissive}/>
              <instances.Object9 color={props.nodes.Metal}/>
              <instances.Object10 color={props.nodes.Cable}/>
              <instances.Object11 color={props.nodes.Socket}/>
            </group>
          </group>
        </group>
      </group>
      {active && (
        <ObjectTransformControls
          id={props.objectId}
          object={objectRef.current}
        />
      )}
    </>
  );
}

useGLTF.preload("/fairy_lights-transformed.glb");
