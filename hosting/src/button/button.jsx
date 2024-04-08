import * as React from 'react';
import Button from '@mui/material/Button';

export default function ContainedButtons() {
  return (
    <Button
  onClick={() => {
    alert('clicked');
  }}
>
  Creation
</Button>

  );
}