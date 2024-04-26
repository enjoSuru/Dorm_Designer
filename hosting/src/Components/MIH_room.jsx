import "../comp_styling/dormCSS/MIH_room.css";
import React, { useState, useEffect } from "react";
import DraggableComponent from "../draggable/DraggableComponent";
import SliderSizes from "../sliders/sliders";
import InputColorPicker from "../color_picker/color_picker";
import { Button } from "bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { getDraggableItems } from "../firebaseService";
import { db } from "../firebase-config";
import {
  doc,
  deleteDoc,
  onSnapshot,
  collection,
  setDoc,
} from "firebase/firestore";
import BasicTextFields from "../textbox/textbox";

// Component for the Mignon Style Room
export default function MIH_room() {
  // State variables for draggable items and their properties
  const [draggables, setDraggables] = useState([]);
  const [widthValue, setWidthValue] = useState(50);
  const [heightValue, setHeightValue] = useState(50);
  const [radiusValue, setRadiusValue] = useState(50);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [divText, setDivText] = useState("Drag me!");
  const { roomID } = useParams();

  // Fetch draggable items and their properties from Firestore
  // useEffect hook to fetch draggable items and their properties from Firestore
  useEffect(() => {
    // Check if a roomID is available
    if (roomID) {
      // Set up a listener for changes in the positions collection of the current room
      const unsubscribe = onSnapshot(
        collection(db, "rooms", roomID, "positions"),
        (snapshot) => {
          // Map the documents to an array of items with IDs and data
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Set up a listener for changes in the properties collection of the current room
          const unsubProps = onSnapshot(
            collection(db, "rooms", roomID, "properties"),
            (snapshot) => {
              // Map the documents to an array of properties with IDs and data
              const properties = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              // Combine items and properties based on their IDs
              const combinedItems = items.map((item) => ({
                ...item,
                ...properties.find((prop) => prop.id === item.id),
              }));
              // Update the state variable with the combined items
              setDraggables(combinedItems);
            }
          );

          // Return cleanup function to unsubscribe from listeners
          return () => {
            unsubProps(); // Unsubscribe from properties listener
            unsubscribe(); // Unsubscribe from positions listener
          };
        }
      );

      // Return cleanup function to unsubscribe from positions listener
      return () => unsubscribe();
    }
  }, [roomID]); // Run effect when roomID changes

  // Add a new draggable element to the room
  const addNewDraggable = () => {
    const newId = uuidv4();
    const newPosRef = doc(db, `rooms/${roomID}/positions/${newId}`);
    const newPropRef = doc(db, `rooms/${roomID}/properties/${newId}`);
    const newDraggable = {
      id: newId,
      width: widthValue,
      height: heightValue,
      color: selectedColor,
      radius: radiusValue,
      text: divText,
    };

    setDoc(newPosRef, { x: 0.25, y: 0.25 });
    setDoc(newPropRef, newDraggable);

    setDraggables([...draggables, newDraggable]);
  };

  // Handle text change for the draggable element
  const handleTextChange = (newText) => {
    setDivText(newText);
  };

  // Delete a draggable element from the room
  const handleDelete = async (elementId) => {
    await deleteDoc(doc(db, `rooms/${roomID}/positions/${elementId}`));
    await deleteDoc(doc(db, `rooms/${roomID}/properties/${elementId}`));
    setDraggables(draggables.filter((item) => item.id !== elementId));
  };

  return (
    <>
      <h2>Mignon Style Room</h2>
      <div className="parent">
        <div className="left-component">
          {/* Sliders and input fields for properties */}
          <p>Width</p>
          <SliderSizes value={widthValue} onChange={setWidthValue} />
          <p>Height</p>
          <SliderSizes value={heightValue} onChange={setHeightValue} />
          <p>Radius</p>
          <SliderSizes value={radiusValue} onChange={setRadiusValue} />
          <p>Color</p>
          <InputColorPicker value={selectedColor} onChange={setSelectedColor} />
          <p>Text</p>
          <BasicTextFields value={divText} onChange={handleTextChange} />
          {/* Button to add new draggable */}
          <button onClick={addNewDraggable}>Add new draggable</button>
          {/* Preview of the draggable element */}
          <div
            style={{
              margin: "10px",
              padding: "10px",
              width: `${widthValue}px`,
              height: `${heightValue}px`,
              borderRadius: `${radiusValue}%`,
              backgroundColor: selectedColor,
              border: "2px solid black",
              textAlign: "center",
              lineHeight: `${heightValue}px`,
            }}
          >
            {divText}
          </div>
        </div>
        <div className="div1">
          {/* Render each draggable component */}
          {draggables.map((draggable) => (
            <DraggableComponent
              key={draggable.id}
              roomId={roomID}
              elementId={draggable.id}
              initialWidth={draggable.width}
              initialHeight={draggable.height}
              initialColor={draggable.color}
              initialText={draggable.text}
              initialRadius={draggable.radius}
              onDelete={handleDelete}
            />
          ))}
        </div>
        <div className="div2"></div>
        <div className="div3"></div>
        <div className="div4"></div>
        <div className="div5"></div>
      </div>
    </>
  );
}
