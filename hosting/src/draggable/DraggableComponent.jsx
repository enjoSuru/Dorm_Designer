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
      try {
        const docRef = doc(db, `rooms/${roomId}/positions/${elementId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWidth(data.width || initialWidth);
          setHeight(data.height || initialHeight);
          setColor(data.color || initialColor);
          setRadius(data.radius || initialRadius);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        // Optionally, you can set default values or handle the error in some other way
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
