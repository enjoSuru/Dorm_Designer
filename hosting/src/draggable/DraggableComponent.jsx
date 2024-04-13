import React, { useRef, useEffect } from "react";
import useDragger from "./useDragger";
import "./draggable.css";

function DraggableComponent(props) {
  useDragger("draggableElementId");
  const width = props.width;
  const height = props.height;
  const color = props.color;
  return (
    <div
      id="draggableElementId"
      style={{
        width: width,
        height: height,
        backgroundColor: "blue",
        position: "absolute",
      }}
    >
      Drag me!
    </div>
  );
}

export default DraggableComponent;
