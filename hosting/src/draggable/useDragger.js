import React, { useRef, useEffect } from "react";
import { doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../firebase-config";

// WE NEED TO IMPLEMENT CUSTOM ID GENERATOR SOMEHOW

function useDragger(id) {
  const isClicked = useRef(false);
  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const savePosition = async (x, y) => {
    const docRef = doc(db, "positions", id);
    await setDoc(docRef, { x, y });
  };

  const fetchPosition = async () => {
    const docRef = doc(db, "positions", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    if (docSnap.exists()) {
      const data = docSnap.data();
      const target = document.getElementById(id);
      target.style.top = `${data.y}px`;
      target.style.left = `${data.x}px`;
      coords.current.lastX = data.x;
      coords.current.lastY = data.y;
    }
  };

  useEffect(() => {
    fetchPosition();

    const target = document.getElementById(id);

    if (!target) throw new Error("Element with given id doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("Target element must have a parent");

    const onMouseDown = (e) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = (e) => {
      if (!isClicked.current) return;

      isClicked.current = false;
    
      // Final positions after drag.
      const finalX = parseInt(target.style.left, 10);
      const finalY = parseInt(target.style.top, 10);
      savePosition(finalX, finalY);
      coords.current.lastX = finalX;
      coords.current.lastY = finalY;
    };

    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      // Calculate the movement since the mouse down event.
      const dx = e.clientX - coords.current.startX;
     const dy = e.clientY - coords.current.startY;

      // Apply the movement from the original position.
      const nextX = coords.current.lastX + dx;
      const nextY = coords.current.lastY + dy;

      target.style.left = `${nextX}px`;
      target.style.top = `${nextY}px`;
    };

    target.addEventListener("mousedown", onMouseDown);
    target.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      target.removeEventListener("mousedown", onMouseDown);
      target.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [id]);
}

export default useDragger;
