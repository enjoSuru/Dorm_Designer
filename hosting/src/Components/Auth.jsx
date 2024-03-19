import {auth, googleProvider} from '../firebase-config.js';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import React, { useState } from 'react';
import '../comp_styling/Auth.css';

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  }

  const signInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  const logOut = async () =>{
    try{
      await signOut(auth);
    } catch (err){
      console.error(err);
    }
  }
  
  return(
    <div className="d-flex flex-column p-4 align-items-center">
      <input type="text" className="auth-input form-control" placeholder="Email..." onChange = {(e)=>setEmail(e.target.value)}/>
      <input className="auth-input form-control" placeholder="Password..." type = "password" onChange = {(e)=>setPassword(e.target.value)}/>
      <br></br>
      <div className="log-buttons">
        <button type="button" className="btn btn-outline-success signIn" onClick = {signIn}>Sign In</button>
        <button type="button" className="btn btn-outline-primary signInGoogle" onClick = {signInWithGoogle}>Sign in with Google</button>
      </div>
      <br></br>
      <button onClick = {logOut}>Log Out</button>
    </div>
  );
}
