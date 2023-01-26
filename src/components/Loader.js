import { Html, useProgress } from "@react-three/drei";
import React from "react";

export default function Loader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div style={{ width: "150px", textAlign: "center" }}>
        <span>{Math.floor(progress)}% loaded</span>
      </div>
    </Html>
  );
}
