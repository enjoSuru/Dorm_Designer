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
import { doc, deleteDoc } from "firebase/firestore";
import BasicTextFields from "../textbox/textbox";

export default function MIH_room() {
  const [draggables, setDraggables] = useState([]); // State for storing draggable elements
  const [widthValue, setWidthValue] = useState(50); // State for draggable element width
  const [heightValue, setHeightValue] = useState(50); // State for draggable element height
  const [radiusValue, setRadiusValue] = useState(50); // State for draggable element border radius
  const [selectedColor, setSelectedColor] = useState("#000000"); // State for draggable element color
  const [divText, setDivText] = useState("Item"); // State for draggable element text
  const { roomID } = useParams(); // Extracting roomID from the URL parameters

  // Function to add a new draggable item to the room
  const addNewDraggable = () => {
    const newId = uuidv4(); // Generate a unique ID for the new draggable
    const newDraggable = {
      // Define new draggable item
      id: newId,
      width: widthValue,
      height: heightValue,
      color: selectedColor,
      radius: radiusValue,
      text: divText,
    };
    setDraggables([...draggables, newDraggable]); // Add new draggable to state array
  };

  // Function to update draggable text content
  const handleTextChange = (newText) => {
    setDivText(newText); // Update the divText state with the new text
  };

  // Effect hook to fetch draggable items when roomID is available
  useEffect(() => {
    if (roomID) {
      getDraggableItems(roomID)
        .then((items) => {
          console.log("Fetched Items:", items); // Log fetched items
          setDraggables(items); // Set draggable items to state
        })
        .catch((error) => console.error("Failed to fetch items:", error)); // Log error if fetching fails
    }
  }, [roomID]);

  // Function to handle the deletion of a draggable element
  const handleDelete = async (elementId) => {
    try {
      await deleteDoc(doc(db, `rooms/${roomID}/positions/${elementId}`)); // Delete the position data from Firestore
      await deleteDoc(doc(db, `rooms/${roomID}/properties/${elementId}`)); // Delete the properties data from Firestore
      console.log(`Deleted element ${elementId}`); // Log deletion success
      setDraggables(draggables.filter((item) => item.id !== elementId)); // Remove the element from local state
    } catch (error) {
      console.error("Failed to delete element:", error); // Log deletion failure
    }
  };

  // Handlers for updating state on slider changes
  const handleWidthChange = (newValue) => setWidthValue(newValue); // Update width state
  const handleHeightChange = (newValue) => setHeightValue(newValue); // Update height state
  const handleRadiusChange = (newValue) => setRadiusValue(newValue); // Update radius state
  const handleColorChange = (newColor) => setSelectedColor(newColor); // Update color state

  return (
    <>
      <h2>Mignon Style Room</h2>
      <div className="parent">
        {" "}
        <div className="left-component">
          {" "}
          <p>Width</p>
          <SliderSizes value={widthValue} onChange={handleWidthChange} />
          <p>Height</p>
          <SliderSizes value={heightValue} onChange={handleHeightChange} />
          <p>Radius</p>
          <SliderSizes value={radiusValue} onChange={handleRadiusChange} />
          <p>Colorpicker</p>
          <InputColorPicker
            value={selectedColor}
            onChange={handleColorChange}
          />{" "}
          <BasicTextFields value={divText} onChange={handleTextChange} />
          <button onClick={addNewDraggable}>Add new draggable</button>
          <div
            style={{
              width: widthValue,
              height: heightValue,
              borderRadius: `${radiusValue}%`,
              backgroundColor: selectedColor,
              position: "absolute",
              border: "2px solid black", // Adds a visible border
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
