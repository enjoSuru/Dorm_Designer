import React, { useState } from "react";
import '../color_picker/color_picker_css.css';

function InputColorPicker({ onChange }) {
  const [color, setColor] = useState('#000000');

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="color_selector">
      <input type="color" value={color} onChange={handleColorChange} />
    </div>
  );
}

export default InputColorPicker;
