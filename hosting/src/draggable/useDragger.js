import React, { useRef, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

// Custom hook for draggable elements
function useDragger(roomId, elementId, properties) {
  const targetRef = useRef(null);

  useEffect(() => {
    // Reference to the target element
    const target = document.getElementById(elementId);
    targetRef.current = target;

    // Ensure target element exists
    if (!target) {
      console.error(`Element with id ${elementId} not found.`);
      return;
    }

    // Fetch initial position from Firestore
    const fetchPosition = async () => {
      const docRef = doc(db, `rooms/${roomId}/positions/${elementId}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        target.style.left = `${data.x}px`;
        target.style.top = `${data.y}px`;
      }
    };

    fetchPosition();

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    // Mouse event handlers
    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX - target.offsetLeft;
      startY = e.clientY - target.offsetTop;
      e.preventDefault(); // Prevent default event handling to ensure smooth dragging
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const newX = e.clientX - startX;
      const newY = e.clientY - startY;
      target.style.left = `${newX}px`;
      target.style.top = `${newY}px`;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      const finalX = parseFloat(target.style.left);
      const finalY = parseFloat(target.style.top);
      savePosition(finalX, finalY, properties);
    };

    // Attach event listeners directly to the target
    target.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, { once: true });

    return () => {
      // Remove event listeners on cleanup
      target.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [roomId, elementId, properties]);

  // Save the position and properties to Firestore
  const savePosition = async (x, y, props) => {
    const positionRef = doc(db, `rooms/${roomId}/positions/${elementId}`);
    const propertiesRef = doc(db, `rooms/${roomId}/properties/${elementId}`);

    try {
      await setDoc(positionRef, { x, y }, { merge: true });
      await setDoc(propertiesRef, props, { merge: true });
      console.log(`Saved position and properties for ${elementId} at x: ${x}, y: ${y}`);
    } catch (error) {
      console.error("Failed to save element:", error);
    }
  };
}

export default useDragger;
