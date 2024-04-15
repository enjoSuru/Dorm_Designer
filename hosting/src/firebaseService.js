import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase-config";

export async function getDraggableItems(roomID) {
  const draggablesRef = collection(db, "rooms", roomID, "positions");
  const q = query(draggablesRef);
  const querySnapshot = await getDocs(q);
  const draggableItems = [];
  querySnapshot.forEach((doc) => {
    draggableItems.push({ id: doc.id, ...doc.data() });
  });
  return draggableItems;
}
