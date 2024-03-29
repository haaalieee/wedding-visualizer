/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { Merged, useGLTF } from "@react-three/drei";
import React, { createContext, useContext, useMemo, useRef } from "react";
import { useBoolean } from "react-use";
import ObjectTransformControls from "../components/ObjectTransformControls";
import { useSceneObjects } from "../store/useSceneObjects";
import { useUpdateObjectPosition } from "../utils/hooks";

const context = createContext();
export function TableInstances({ children, ...props }) {
  const { nodes } = useGLTF("/table-transformed.glb");
  const instances = useMemo(
    () => ({
      Object: nodes.Object_4,
      Object1: nodes.Object_6,
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

export function Table(props) {
  const instances = useContext(context);

  const [active, toggleActive] = useBoolean(false);
  const [localPosition, setLocalPosition] = React.useState(props.position);
  const { updateObjectPosition } = useSceneObjects();
  const objectRef = useRef();

  useUpdateObjectPosition(props.id, localPosition, updateObjectPosition);

  return (
    <>
      <group
        {...props}
        dispose={null}
        onClick={() => {
          toggleActive();
        }}
        onPointerMissed={(e) => {
          e.type === "click" && toggleActive(false);
        }}
        ref={objectRef}
      >
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.85}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group scale={1.87}>
              <instances.Object />
            </group>
            <group scale={1.87}>
              <instances.Object1 />
            </group>
          </group>
        </group>
      </group>
      {active && (
        <ObjectTransformControls
          object={objectRef.current}
          setLocalPosition={() => setLocalPosition}
        />
      )}
    </>
  );
}

useGLTF.preload("/table-transformed.glb");
