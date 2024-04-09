import React, {useState} from "react";
import '../color_picker/color_picker_css.css';
function InputColorPicker()
{
    const [color,setColor]=useState('')
    return(
    <div className = "color_selector">
        <input type="color" onChange={(e)=>setColor(e.target.value)}/>
        <h1>{color}</h1>
        </div>
     )
}
export default InputColorPicker;