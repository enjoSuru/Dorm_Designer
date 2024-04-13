import "../comp_styling/dormCSS/MIH_room.css";
import React, { useState } from "react";
import DraggableComponent from "../draggable/DraggableComponent";
import Hook1 from "../draggable/hook1";
import SliderSizes from "../sliders/sliders";
import InputColorPicker from "../color_picker/color_picker";

export default function MIH_room() {
  return (
    <>
    
      <h2>Mignon Style Room</h2>
      
      <div className="parent">
      <div className="left-component">
        <p>Width</p>
        <SliderSizes/>
        <p>Height</p>
        <SliderSizes/>
        <p>Colorpicker</p>
        <InputColorPicker/>
      </div>
        <div className="div1">
          <DraggableComponent />
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
