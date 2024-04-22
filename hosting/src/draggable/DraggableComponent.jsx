import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import useDragger from "./useDragger";
import "./draggable.css";
import { db } from "../firebase-config";

function DraggableComponent({
  initialWidth = 100,
  initialHeight = 100,
  initialColor = "#FFFFFF",
  initialRadius = 0,
  initialText = "Drag me!",
  elementId,
  roomId,
  onDelete,
}) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [color, setColor] = useState(initialColor);
  const [radius, setRadius] = useState(initialRadius);
  const [text, setText] = useState(initialText);

  // Fetch properties from Firestore when the component mounts
  useEffect(() => {
    const propRef = doc(db, `rooms/${roomId}/properties/${elementId}`);
    const fetchProperties = async () => {
      try {
        const docSnap = await getDoc(propRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWidth(data.width);
          setHeight(data.height);
          setColor(data.color);
          setRadius(data.radius);
          setText(data.text);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [roomId, elementId]);

  // Prepare properties object to pass to useDragger
  const properties = { width, height, color, radius, text };

  // Use custom hook for draggable functionality
  useDragger(roomId, elementId, properties);

  const handleDelete = () => {
    onDelete(elementId);
  };

  return (
    <div
      id={elementId}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}%`,
        backgroundColor: color,
        position: "absolute",
        border: "2px solid black",
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        handleDelete();
      }}
    >
      {text}
    </div>
  );
}

export default DraggableComponent;
