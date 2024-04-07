import React, { useState, useRef } from 'react';
import SliderSizes from '../sliders/sliders.jsx'; // Import the SliderSizes component directly
import '../building_layouts/mignon_complex.css'; // Import CSS directly

function MignonHallCustom() {
 

    return (
        <div className="mignon_complex">
            <div className="div1">
                <SliderSizes/>
            </div>
            <div className="div2">Yellow</div>
            <div className="div3">Yellow</div>
            <div className="div4">Yellow</div> 
            <div className="div5">Yellow</div> 
        </div>
    );
}

export default MignonHallCustom;
