import React, { useRef, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

function useDragger(roomId, elementId) {
  const targetRef = useRef(null);

  useEffect(() => {
    const target = document.getElementById(elementId);
    targetRef.current = target;
    if (!target) {
      console.error(`Element with id ${elementId} not found.`);
      return;
    }

    const coords = {
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      isClicked: false
    };

    const fetchPosition = async () => {
      const docRef = doc(db, `rooms/${roomId}/positions/${elementId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        target.style.left = `${data.x}px`;
        target.style.top = `${data.y}px`;
        coords.lastX = data.x;
        coords.lastY = data.y;
      }
    };

    fetchPosition();

    const onMouseDown = (e) => {
      coords.isClicked = true;
      coords.startX = e.clientX - target.offsetLeft;
      coords.startY = e.clientY - target.offsetTop;
      console.log("ShapeID: ", elementId, "StartX: ", coords.startX, "StartY: ", coords.startY);
    };

    const onMouseMove = (e) => {
      if (!coords.isClicked) return;

      const newX = e.clientX - coords.startX;
      const newY = e.clientY - coords.startY;

      target.style.left = `${newX}px`;
      target.style.top = `${newY}px`;
    };

    const onMouseUp = () => {
      if (!coords.isClicked) return;
      coords.isClicked = false;
      const finalX = parseFloat(target.style.left);
      const finalY = parseFloat(target.style.top);
      savePosition(finalX, finalY);
    };

    // Add event listeners
    target.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      // Remove event listeners
      target.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    

  }, [roomId, elementId]);

  const savePosition = async (x, y) => {
    try {
      console.log(`Room ID: ${roomId}, Element ID: ${elementId}`);
      const docRef = doc(db, `rooms/${roomId}/positions/${elementId}`);
      await setDoc(docRef, { x, y });
      console.log(`Saving position for ${elementId} at x: ${x}, y: ${y}`);
    } catch (error) {
      console.error("Failed to save position:", error);
    }
  };
}

export default useDragger;