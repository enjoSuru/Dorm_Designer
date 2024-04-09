import "../comp_styling/dormCSS/MIH_room.css";
import React, { useState } from "react";
import DraggableComponent from "../draggable/DraggableComponent";

export default function MIH_room() {
  return (
    <>
      <h2>Mignon Style Room</h2>
      <div className="parent">
        <div className="div1">
          <DraggableComponent />
        </div>
        <div className="div2"></div>
        <div className="div3"></div>
        <div className="div4"></div>
        <div className="div5"></div>
      </div>
    </>
  );
}
