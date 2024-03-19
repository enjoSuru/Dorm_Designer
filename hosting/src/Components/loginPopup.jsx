import { Auth } from "./Auth.jsx";
import React, { useState } from "react";
import '../comp_styling/loginPopup.css';


export default function LoginPopup(){
  const [modal,setModal]=useState(false);

  const toggleModal = () => {
    setModal(!modal);
    console.log("Inside toggleModal function.");
  }
  console.log(`Registered Click. Modal Value: ${modal}`);
  return(
    <>
      <button className="open-popup-btn" onClick={toggleModal}>Log in</button>
      {modal &&
        (
        <div className="model">
        <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <button type="button" className="btn-close" onClick={toggleModal}></button>
            <div className="login">
            <Auth />
            </div>
        </div>
      </div>)}
    </>
  );
}