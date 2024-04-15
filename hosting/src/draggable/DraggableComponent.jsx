import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Make sure you import these Firestore functions
import useDragger from "./useDragger";
import "./draggable.css";
import { db } from "../firebase-config"; // Adjust the path as necessary

function DraggableComponent({
  initialWidth,
  initialHeight,
  initialColor,
  initialRadius,
  elementId,
  roomId,
}) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [color, setColor] = useState(initialColor);
  const [radius, setRadius] = useState(initialRadius);

  // Fetch properties from Firestore when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      const docRef = doc(db, `rooms/${roomId}/positions/${elementId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWidth(data.width || initialWidth);
        setHeight(data.height || initialHeight);
        setColor(data.color || initialColor);
        setRadius(data.radius || initialRadius);
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
  ]);

  //
  // TODO: Save properties to Firestore when they change
  //
  /* 
  useEffect(() => {
    const saveProperties = async () => {
      const docRef = doc(db, `rooms/${roomId}/positions/${elementId}`);
      await setDoc(docRef, { width, height, color, radius });
    };
    saveProperties();
  }, [width, height, color, radius, roomId, elementId]);
*/
  useDragger(roomId, elementId); // Initialize dragging functionality

  return (
    <div
      id={elementId}
      style={{
        width,
        height,
        borderRadius: `${radius}%`,
        backgroundColor: color,
        position: "absolute",
        border: "2px solid black", // Adds a visible border
      }}
    >
      Drag me!
    </div>
  );
}

export default DraggableComponent;
