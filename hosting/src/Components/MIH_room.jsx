import "../comp_styling/dormCSS/MIH_room.css";
import React, { useState, useEffect } from "react";
import DraggableComponent from "../draggable/DraggableComponent";
import Hook1 from "../draggable/hook1";
import SliderSizes from "../sliders/sliders";
import InputColorPicker from "../color_picker/color_picker";
import { Button } from "bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { getDraggableItems } from "../firebaseService";

export default function MIH_room() {
  const [draggables, setDraggables] = useState([]);
  const [widthValue, setWidthValue] = useState(50);
  const [heightValue, setHeightValue] = useState(50);
  const [radiusValue, setRadiusValue] = useState(50);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const { roomID } = useParams();

  // Function to create and add a new draggable item
  const addNewDraggable = () => {
    const newId = uuidv4(); // Generate a unique ID
    const newDraggable = {
      id: newId,
      width: widthValue,
      height: heightValue,
      color: selectedColor,
      radius: radiusValue,
    };
    setDraggables([...draggables, newDraggable]);
  };

  useEffect(() => {
    if (roomID) {
      getDraggableItems(roomID)
        .then((items) => {
          console.log("Fetched Items:", items);
          setDraggables(items);
        })
        .catch((error) => console.error("Failed to fetch items:", error));
    }
  }, [roomID]);

  // Handlers for the slider changes
  const handleWidthChange = (newValue) => setWidthValue(newValue);
  const handleHeightChange = (newValue) => setHeightValue(newValue);
  const handleRadiusChange = (newValue) => setRadiusValue(newValue);
  const handleColorChange = (newColor) => setSelectedColor(newColor);

  return (
    <>
      <h2>Mignon Style Room</h2>
      <div className="parent">
        <div className="left-component">
          <p>Width</p>
          <SliderSizes value={widthValue} onChange={handleWidthChange} />
          <p>Height</p>
          <SliderSizes value={heightValue} onChange={handleHeightChange} />
          <p>Radius</p>
          <SliderSizes value={radiusValue} onChange={handleRadiusChange} />
          <p>Colorpicker</p>
          <InputColorPicker value={selectedColor} onChange={handleColorChange} />
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
              initialRadius={draggable.radius}
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
