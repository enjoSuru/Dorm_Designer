import React, { useRef, useEffect } from "react";
import useDragger from "./useDragger";
import "./draggable.css"

function DraggableComponent() {
  useDragger("draggableElementId");

  return (
    <div
      id="draggableElementId"
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

export default DraggableComponent;