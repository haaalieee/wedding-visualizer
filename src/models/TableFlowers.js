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
export function TableFlowersInstances({ children, ...props }) {
  const { nodes } = useGLTF("/table_flowers-transformed.glb");
  const instances = useMemo(
    () => ({
      Flowersmagnoliaflowersmagnolia:
        nodes.flowers_magnolia_003_flowers_magnolia_0,
      Flowersmagnoliaflowersmagnoliabowl:
        nodes.flowers_magnolia_003_flowers_magnolia_bowl_0,
      Flowersmagnoliaflowersmagnoliastem:
        nodes.flowers_magnolia_003_flowers_magnolia_stem_0,
      Flowersmagnoliaflowersmagnoliawater:
        nodes.flowers_magnolia_003_flowers_magnolia_water_0,
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

export function TableFlowers(props) {
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
        <group scale={0.005}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <instances.Flowersmagnoliaflowersmagnolia />
            <instances.Flowersmagnoliaflowersmagnoliabowl />
            <instances.Flowersmagnoliaflowersmagnoliastem />
            <instances.Flowersmagnoliaflowersmagnoliawater />
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

useGLTF.preload("/table_flowers-transformed.glb");
