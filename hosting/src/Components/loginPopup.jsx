import { Auth } from "./Auth.jsx";
import React, { useState } from "react";
import '../comp_styling/loginPopup.css';


export default function LoginPopup(){
  const [modal,setModal]=useState(false);

  const toggleModal = () => {
    setModal(!modal);
  }

  //Modal popup window for logging in. Probably could use some different styling and I'm going to make it to where
  //you can't scroll when the popup is open.
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