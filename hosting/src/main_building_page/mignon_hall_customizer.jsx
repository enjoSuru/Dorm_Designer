import React, { useState, useRef } from 'react';
import SliderSizes from '../sliders/sliders.jsx'; // Import the SliderSizes component directly
import '../building_layouts/mignon_complex.css'; // Import CSS directly
import InputColorPicker from '../color_picker/color_picker.jsx';
import '../button/button.jsx';
import ContainedButtons from '../button/button.jsx';
function MignonHallCustom() {
    return (
        <div className="Mignon_Complex">
<div className="div1"> </div>
<div className="div2"> </div>
<div className="div3"> </div>
<div className="div4"> </div>
<div className="div5"> </div>
<div className="div6"> </div>
<div className="div7"> 
<h1>Length</h1>
<SliderSizes/>
<h1>Height</h1>
<SliderSizes/>
<h1>Radius</h1>
<SliderSizes/> 
<h1>Choose Color</h1>
<InputColorPicker/>
<ContainedButtons/>

</div>
</div>
    );
}

export default MignonHallCustom;
