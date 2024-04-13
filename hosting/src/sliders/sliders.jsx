import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function SliderSizes({ value, onChange }) {
  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        value={value}
        onChange={handleSliderChange}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </Box>
  );
}