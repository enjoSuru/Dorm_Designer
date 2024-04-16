import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import useDragger from "./useDragger";
import "./draggable.css";
import { db } from "../firebase-config";

function DraggableComponent({
  initialWidth,
  initialHeight,
  initialColor,
  initialRadius,
  initialText,
  elementId,
  roomId,
  onDelete,
}) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [color, setColor] = useState(initialColor);
  const [radius, setRadius] = useState(initialRadius);
  const [text, setText] = useState(initialText);

  const handleDelete = () => {
    onDelete(elementId);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const docRef = doc(db, `rooms/${roomId}/positions/${elementId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWidth(data.width || initialWidth);
          setHeight(data.height || initialHeight);
          setColor(data.color || initialColor);
          setRadius(data.radius || initialRadius);
          setText(data.text || initialText);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [
    roomId,
    elementId,
    initialWidth,
    initialHeight,
    initialColor,
    initialRadius,
    initialText,
  ]);

  useDragger(roomId, elementId);

  return (
    <div
      id={elementId}
      style={{
        width,
        height,
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
      {/* Render text content */}
      <span>{text}</span>
    </div>
  );
}

export default DraggableComponent;
