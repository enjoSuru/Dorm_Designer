import { Auth } from "./Auth.jsx";
import React, { useState } from "react";
import '../comp_styling/loginPopup.css';


export default function LoginPopup(){
  const [modal,setModal]=useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  // If the modal is open, add the class active-modal, which will prevent scrolling
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  //Modal popup window for logging in.
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