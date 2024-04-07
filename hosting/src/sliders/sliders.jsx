import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function SliderSizes() {
  const [defaultSliderValue, setDefaultSliderValue] = useState(50);



  const handleDefaultSliderChange = (event, newValue) => {
    setDefaultSliderValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
    
      <Slider
        value={defaultSliderValue}
        onChange={handleDefaultSliderChange}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
      {/* You can access the values using smallSliderValue and defaultSliderValue */}
      {/* For example, you can store them in variables */}
      {/* const smallValue = smallSliderValue; */}
      {/* const defaultValue = defaultSliderValue; */}
    </Box>
  );
}
