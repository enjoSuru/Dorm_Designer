import React from 'react';
import '../color_picker/color_picker_css.css';

function InputColorPicker({ value, onChange }) {
  const handleColorChange = (e) => {
    const newColor = e.target.value;
    onChange(newColor); 
  };

  return (
    <div className="color_picker"> {/* Update class name here */}
      <input type="color" value={value} onChange={handleColorChange} />
    </div>
  );
}


export default InputColorPicker;