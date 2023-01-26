/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 chairs.glb --instanceall
*/

import { Merged, useGLTF, useHelper } from "@react-three/drei";
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import * as THREE from "three";
import { Box3Helper } from "three";
import { subscribe, useSnapshot } from "valtio";
import ObjectTransformControls from "../components/ObjectTransformControls";
import {
  sceneActions,
  sceneObjectBounds,
  sceneStateStore
} from "../store/sceneData";

const context = createContext();

// eslint-disable-next-line no-unused-vars
const remapMaterialUVs = (
  material,
  remapUVs,
  // eslint-disable-next-line no-unused-vars
  { uvAttributePrefix, uvAttributeOffset } = {}
) => {
  const _uvAttributePrefix = uvAttributePrefix || "texcoord_";
  const _uvAttributeOffset = 2;

  material.customProgramCacheKey = () => Math.random();
  // eslint-disable-next-line no-unused-vars
  material.onBeforeCompile = (shader, context) => {
    const resolveIncludes = (shader) => {
      // NOTE Straight from three/WebGLProgram.js
      const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;

      return shader.replace(includePattern, (match, include) => {
        const string = THREE.ShaderChunk[include];

        if (!string) {
          return;
        }

        return resolveIncludes(string);
      });
    };

    let maxTexCoordIndex = 0;
    const texCoordSwaps = [];

    Object.entries(remapUVs).forEach(([textureType, uvMap]) => {
      if (!uvMap.startsWith(_uvAttributePrefix)) {
        console.warn("Invalid UVMap name", uvMap);

        return;
      }

      const texCoordIndex = parseFloat(
        uvMap.split(new RegExp(`${_uvAttributePrefix}\\D*`, "gi")).join("")
      );

      maxTexCoordIndex = Math.max(texCoordIndex, maxTexCoordIndex);
      texCoordSwaps[textureType] = texCoordIndex;
    });

    if (maxTexCoordIndex - 1 <= 0) {
      return;
    }

    shader.vertexShader = shader.vertexShader
      .replace(
        `#include <uv2_pars_vertex>`,
        `
      ${Array(maxTexCoordIndex - 1)
        .fill(0)
        .map(
          (_, index) => `
        attribute vec2 ${_uvAttributePrefix}${index + _uvAttributeOffset};
        varying vec2 vTexCoord${index + _uvAttributeOffset};
      `
        )
        .join("\n")}

      #include <uv2_pars_vertex>
    `
      )
      .replace(
        `#include <uv2_vertex>`,
        `
      ${Array(maxTexCoordIndex - 1)
        .fill(0)
        .map(
          (_, index) => `
        vTexCoord${index + _uvAttributeOffset} = ( vec3( ${_uvAttributePrefix}${
            index + _uvAttributeOffset
          }, 1 ) ).xy;
      `
        )
        .join("\n")}

      #include <uv2_vertex>
    `
      );

    shader.fragmentShader = shader.fragmentShader.replace(
      `#include <uv2_pars_fragment>`,
      `
      ${Array(maxTexCoordIndex - 1)
        .fill(0)
        .map(
          (_, index) => `
        varying vec2 vTexCoord${index + _uvAttributeOffset};
      `
        )
        .join("\n")}

      #include <uv2_pars_fragment>
    `
    );

    shader.vertexShader = resolveIncludes(shader.vertexShader);
    shader.fragmentShader = resolveIncludes(shader.fragmentShader);

    Object.entries(texCoordSwaps).forEach(([textureType, texCoordIndex]) => {
      shader.fragmentShader = shader.fragmentShader
        .replaceAll(
          `texture2D( ${textureType}, vUv )`,
          `texture2D( ${textureType}, vTexCoord${texCoordIndex} )`
        )
        .replaceAll(
          `texture2D( ${textureType}, vUv2 )`,
          `texture2D( ${textureType}, vTexCoord${texCoordIndex} )`
        );
    });
  };
};

export function ChairsInstances({ children, ...props }) {
  const { nodes } = useGLTF("/chairs-transformed.glb");
  const instances = useMemo(
    () => ({
      Body: nodes.Body49__0,
      BodyPolyurethane: nodes.Body50_Polyurethane_0,
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

export function Chairs(props) {
  const instances = useContext(context);

  const chairsRef = useRef();

  const [transformController, setTransformController] = useState(false);

  const bodyPolyurethaneRef = useRef();

  useLayoutEffect(() => {
    subscribe(
      sceneStateStore,
      () => {
        if (sceneStateStore.current.texture === "rattan") {
          remapMaterialUVs(
            bodyPolyurethaneRef.current.instance.current.material,
            {
              map: "texcoord_2", //texcoord_2
            }
          );
          bodyPolyurethaneRef.current.instance.current.material.needsUpdate = true;
        } else if (sceneStateStore.current.texture === "default") {
          remapMaterialUVs(
            bodyPolyurethaneRef.current.instance.current.material,
            {
              map: "texcoord_1",
            }
          );
          bodyPolyurethaneRef.current.instance.current.material.needsUpdate = true;
        }
      },
      []
    );
  }, []);

  /** Set sensor interaction for colliding meshes */
  // eslint-disable-next-line no-unused-vars
  const [boundIntersecting, setBoundIntersecting] = useState(false);

  /** Bounding box */
  const primeChairs = useRef();
  // const bbChairs = useRef();
  const bbChairsBox = useMemo(() => {
    return new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
  }, []);

  useEffect(() => {
    bbChairsBox.setFromObject(chairsRef.current);
  }, []);

  const otherBBChairsBox = useMemo(() => {
    return new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
  }, []);

  const sceneObjectBoundsSnap = useSnapshot(sceneObjectBounds);

  useHelper(primeChairs, Box3Helper, "cyan");

  /** Check if objects are colliding with each other */

  const handleTransformEnd = () => {
    sceneActions.updateObjectBounds(
      props.objectId,
      bbChairsBox.min,
      bbChairsBox.max
    );
  };

  const handleTransformChange = () => {
    let currentIntersectingIndex = 0;

    bbChairsBox.setFromObject(chairsRef.current);

    const arrayBounds = sceneObjectBoundsSnap.data.filter(
      (obj) => obj.id !== props.objectId
    );

    for (let i = 0; i < arrayBounds.length; i++) {
      const currentArrayBound = arrayBounds[i];

      otherBBChairsBox.set(currentArrayBound.min, currentArrayBound.max);

      if (bbChairsBox.intersectsBox(otherBBChairsBox)) {
        currentIntersectingIndex = currentArrayBound.id;
        console.log("colliding with " + currentIntersectingIndex);
      }
    }

    if (currentIntersectingIndex) {
      setBoundIntersecting(true);
    } else {
      setBoundIntersecting(false);
    }
  };

  return (
    <>
      {/* <primitive object={bbChairsBox} ref={primeChairs}> */}
      <group
        {...props}
        dispose={null}
        onClick={() => {
          setTransformController(true);
        }}
        onPointerMissed={() => {
          // e.type === "click" && toggleActive(false);
          sceneActions.removeActiveObject();
          // console.log(sceneStateStore);

          setTransformController(false);
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();

          sceneActions.setActiveObject(props.objectId);
          // console.log(e.object.instance.current.material.name)
          sceneActions.setActiveMaterial(
            e.object.instance.current.material.name
          );

          setTransformController(false);
          // toggleActive(true);
        }}
        position={[props.position.x, props.position.y, props.position.z]}
        rotation={[props.rotation.x, props.rotation.y, props.rotation.z]}
        scale={[props.scale.x, props.scale.y, props.scale.z]}
        ref={chairsRef}
      >
        <instances.Body color={boundIntersecting ? "red" : "white"} />
        <instances.BodyPolyurethane
          color={boundIntersecting ? "red" : "white"}
          ref={bodyPolyurethaneRef}
          onClick={(e) => {
            console.log(e);
          }}
        />
      </group>
      <primitive object={bbChairsBox} ref={primeChairs} />
      {transformController && (
        <ObjectTransformControls
          id={props.objectId}
          object={chairsRef.current}
          onTransformChange={handleTransformChange}
          onTransformEnd={handleTransformEnd}
        />
      )}
    </>
  );
}

// useGLTF.preload("/chairs-transformed.glb");
