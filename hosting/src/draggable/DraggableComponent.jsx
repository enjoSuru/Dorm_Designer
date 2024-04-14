import React, { useRef, useEffect } from "react";
import useDragger from "./useDragger";
import "./draggable.css";

function DraggableComponent(props) {
  useDragger("draggableElementId");
  const width = props.width;
  const height = props.height;
  const color = props.color;
  const radius = props.radius;
  return (
    <div
      id="draggableElementId"
      style={{
        width: width,
        height: height,
        borderRadius: `${radius}%`,
        backgroundColor: color,
        position: "absolute",
      }}
    >
      Drag me!
    </div>
  );
}

export default DraggableComponent;
