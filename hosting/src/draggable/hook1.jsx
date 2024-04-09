import React, { useRef, useEffect } from "react";
import useDragger from "./useDragger";
import "./hook1.css";

function Hook1() {
  useDragger("draggableElementId2");

  return (
    <div
      id="draggableElementId2"
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "red",
        position: "absolute",
      }}
    >
      Drag me!
    </div>
  );
}

export default Hook1;
