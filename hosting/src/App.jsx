import { useState, useEffect } from 'react';
import './App.css';
import { Auth } from './Auth.jsx';
import Rooms from './Rooms.jsx';


function App() {

  return (
    <>
      <div>
        <p>Website</p>
      </div>
      <Auth />
      <Rooms />
    </>
  );
}

export default App
