import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config.js";
import MIH_room from "../Components/MIH_room";

export default function RoomPage() {
  const params = useParams();
  const roomID = params.roomID;

  const [roomDorm, setRoomDorm] = useState("");
  const roomRef = doc(db, "rooms", roomID);

  //Function to set roomDorm to the dorm of the roomRef doc
  const readDocDorm = async () => {
    const doc = await getDoc(roomRef);
    const roomData = { ...doc.data() };
    setRoomDorm(roomData.dorm);
  };

  //useEffect so the dorm is read into roomDorm whenever you first load the page. Will likely need a useEffect
  //with something other than the empty array in order to constantly refresh the items in the room.
  useEffect(() => {
    readDocDorm();
  }, []);

  //Simply a function with a switch statement that will return the dorm layout with the same name
  //as roomDorm
  const renderDormLayout = () => {
    switch (roomDorm) {
      case "MIH":
        return <MIH_room />;
      case "CMH":
        console.log(`${roomDorm} layout not implemented yet.`);
        break;
      case "ELA":
        console.log(`${roomDorm} layout not implemented yet.`);
        break;
      case "ANH":
        console.log(`${roomDorm} layout not implemented yet.`);
        break;
      case "NUH":
        console.log(`${roomDorm} layout not implemented yet.`);
        break;
      case "MIT":
        console.log(`${roomDorm} layout not implemented yet.`);
        break;
      default:
        console.log("Invalid or no dorm retreived.");
        break;
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        {renderDormLayout()}
      </div>
    </>
  );
}
