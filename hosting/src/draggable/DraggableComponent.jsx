import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useDragger from "./useDragger";
import "./draggable.css";
import { db } from "../firebase-config";

function DraggableComponent({
  // default properties for the draggable component if they are not specified
  initialWidth = 100,
  initialHeight = 100,
  initialColor = "#FFFFFF",
  initialRadius = 1,
  initialText = "Drag me!",
  elementId, // Unique identifier for the draggable element
  roomId, // Room identifier where the draggable is located
  onDelete, // Function to handle deletion of the element
}) {
  // State hooks to manage component properties
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [color, setColor] = useState(initialColor);
  const [radius, setRadius] = useState(initialRadius);
  const [text, setText] = useState(initialText);

  // Function to execute the onDelete callback with the element's ID
  const handleDelete = () => {
    onDelete(elementId);
  };

  // Effect hook to fetch and set properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      const propRef = doc(db, `rooms/${roomId}/properties/${elementId}`); // Reference to Firestore document
      try {
        const docSnap = await getDoc(propRef); // Get document snapshot
        if (docSnap.exists()) {
          // Check if the document exists
          const data = docSnap.data(); // Extract data from the document
          // Set component properties or default to initial values if not present in Firestore
          setWidth(data.width || initialWidth);
          setHeight(data.height || initialHeight);
          setColor(data.color || initialColor);
          setRadius(data.radius || initialRadius);
          setText(data.text || initialText);
        }
      } catch (error) {
        console.error("Error fetching properties:", error); // Log fetching errors
      }
    };
    fetchProperties(); // Call fetchProperties function
  }, [
    roomId,
    elementId,
    initialWidth,
    initialHeight,
    initialColor,
    initialRadius,
    initialText,
  ]);

  // Effect hook to save properties to Firestore whenever they change
  useEffect(() => {
    const saveProperties = async () => {
      const propertiesRef = doc(db, `rooms/${roomId}/properties/${elementId}`); // Reference to Firestore document
      try {
        // Set document with updated properties, merging with existing ones
        await setDoc(
          propertiesRef,
          { width, height, color, radius, text },
          { merge: true }
        );
        console.log("Properties saved:", {
          // Log saved properties
          width,
          height,
          color,
          radius,
          text,
        });
      } catch (error) {
        console.error("Error saving properties:", error); // Log saving errors
      }
    };

    // Trigger saveProperties if all property states are set
    if (width && height && color && radius && text) {
      saveProperties();
    }
  }, [width, height, color, radius, text, roomId, elementId]);

  useDragger(roomId, elementId); // Call useDragger hook to enable dragging

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
      {text}
    </div>
  );
}

export default DraggableComponent;
