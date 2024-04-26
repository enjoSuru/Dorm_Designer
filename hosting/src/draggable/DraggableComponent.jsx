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

  // Fetch properties from Firestore when the component mounts or when roomId or elementId changes
  useEffect(() => {
    const propRef = doc(db, `rooms/${roomId}/properties/${elementId}`);
    const fetchProperties = async () => {
      try {
        const docSnap = await getDoc(propRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Update state with fetched properties
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
  }, [roomId, elementId]); // Run effect when roomId or elementId changes

  // Prepare properties object to pass to useDragger hook
  const properties = { width, height, color, radius, text };

  // Use custom hook for draggable functionality
  useDragger(roomId, elementId, properties);

  // Function to handle delete action
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
        e.preventDefault(); // Prevent default context menu
        handleDelete(); // Call delete handler
      }}
    >
      {text} {/* Render text content */}
    </div>
  );
}

export default DraggableComponent;
