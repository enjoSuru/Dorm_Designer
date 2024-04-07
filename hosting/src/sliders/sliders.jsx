import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function SliderSizes() {
  const [smallSliderValue, setSmallSliderValue] = useState(70);
  const [defaultSliderValue, setDefaultSliderValue] = useState(50);

  const handleSmallSliderChange = (event, newValue) => {
    setSmallSliderValue(newValue);
  };

  const handleDefaultSliderChange = (event, newValue) => {
    setDefaultSliderValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        size="small"
        value={smallSliderValue}
        onChange={handleSmallSliderChange}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
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
