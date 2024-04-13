import "../comp_styling/dormCSS/MIH_room.css";
import React, { useState } from "react";
import DraggableComponent from "../draggable/DraggableComponent";
import Hook1 from "../draggable/hook1";
import SliderSizes from "../sliders/sliders";
import InputColorPicker from "../color_picker/color_picker";

export default function MIH_room() {
  const [widthValue, setWidthValue] = useState(50);
  const [heightValue, setHeightValue] = useState(50);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleWidthChange = (newValue) => {
    setWidthValue(newValue);
  };

  const handleHeightChange = (newValue) => {
    setHeightValue(newValue);
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
  };
  return (
    <>
    
      <h2>Mignon Style Room</h2>
      
      <div className="parent">
      <div className="left-component">
        <p>Width</p>
        <SliderSizes value={widthValue} onChange={handleWidthChange} />
        <p>Height</p>
        <SliderSizes value={heightValue} onChange={handleHeightChange} />
        <p>Colorpicker</p>
        <InputColorPicker onChange={handleColorChange} />
      </div>
        <div className="div1">
          <DraggableComponent width={widthValue} height={heightValue} color={selectedColor}/>
          <Hook1 />
          
        </div>
        <div className="div2">
        </div>
        <div className="div3">
        
        </div>
        <div className="div4">
        
        </div>
        <div className="div5">
          </div>
      </div>
      
    </>
  );
}
