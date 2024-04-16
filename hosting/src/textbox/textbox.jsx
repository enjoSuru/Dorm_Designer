import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ value, onChange }) {
  const handleChange = (event) => {
    // Call the onChange callback with the new text value
    onChange(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '& input': {
            color: 'white',
          },
        },
        '& .MuiInputLabel-root': {
          color: 'white', // Set the label text color to white
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Item Name"
        variant="outlined"
        value={value}
        onChange={handleChange}
        InputLabelProps={{ // Set the label props to customize label styles
          style: { color: 'white' }, // Set the label text color to white
        }}
      />
    </Box>
  );
}
