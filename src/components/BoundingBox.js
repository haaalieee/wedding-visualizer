/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useHelper } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { Box3Helper } from "three";

const BoundingBox = (props) => {
  const bbRef = useRef();

  useEffect(() => {
    bbRef.current.setFromObject(props.refObj);
  }, [props.refObj, bbRef]);

//   useFrame(() => {
//     if (!props.isStatic) {
//       bbRef.current.update();
//     }
//   });

  useHelper(bbRef.current, Box3Helper, "cyan");

  return <box3 ref={bbRef}>{props.children}</box3>;
};

export default BoundingBox;
