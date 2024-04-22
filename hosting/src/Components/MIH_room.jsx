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
  const [draggables, setDraggables] = useState([]);
  const [widthValue, setWidthValue] = useState(50);
  const [heightValue, setHeightValue] = useState(50);
  const [radiusValue, setRadiusValue] = useState(50);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [divText, setDivText] = useState("Drag me!");
  const { roomID } = useParams();

  useEffect(() => {
    // Fetch draggable items and their properties from Firestore
    if (roomID) {
      const unsubscribe = onSnapshot(
        collection(db, "rooms", roomID, "positions"),
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const unsubProps = onSnapshot(
            collection(db, "rooms", roomID, "properties"),
            (snapshot) => {
              const properties = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              const combinedItems = items.map((item) => ({
                ...item,
                ...properties.find((prop) => prop.id === item.id),
              }));
              setDraggables(combinedItems);
            }
          );

          return () => {
            unsubProps();
            unsubscribe();
          };
        }
      );

      return () => unsubscribe(); // Cleanup on unmount
    }
  }, [roomID]);

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

    setDoc(newPosRef, { x: 100, y: 100 }); // Example starting position
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
          <button onClick={addNewDraggable}>Add new draggable</button>
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
            /> // Render each draggable component
          ))}
          {divText}
        </div>
        <div className="div2"></div>
        <div className="div3"></div>
        <div className="div4"></div>
        <div className="div5"></div>
      </div>
    </>
  );
}
