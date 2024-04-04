import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config.js";
import "../comp_styling/Rooms.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Rooms() {
  const roomCollectionRef = collection(db, "rooms");
  const navigate = useNavigate();

  // State for our list of rooms when it's pulled from the database and filtered
  const [roomList, setRoomList] = useState([]);

  // States used for creating a new room/s
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDorm, setNewRoomDorm] = useState("");

  const getRoomList = async () => {
    // READ THE DATA
    // AND SETMOVIELIST = THE DATA
    try {
      const data = await getDocs(roomCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setRoomList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRoomList();
  }, []);

  const onCreateRoom = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        await addDoc(roomCollectionRef, {
          name: newRoomName,
          dorm: newRoomDorm,
          owner: user.uid,
        });
        getRoomList();
      } else {
        console.log("User not signed in");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRoom = async (roomId) => {
    const roomDoc = doc(db, "rooms", roomId);
    await deleteDoc(roomDoc);
    getRoomList();
  };

  //stops the onRoomClick function from executing when the button to delete the room is clicked.
  const stopProp = (e) => {
    e.stopPropagation();
  };

  const onRoomClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  //This component currently returns the whole Room creation/viewing page. Some small things need to be fixed, such as
  //the select element displaying what you selected, clearing the selections when you create the room, and
  //not executing the onClick function of the entire roomDivs div when clicking the delete button.
  //I (Aiden) can fix these things later.
  return (
    <>
      <br></br>
      <div>
        <h1 style={{ fontSize: "2rem" }}>Create a Room</h1>
        <input
          placeholder="Room Name..."
          onChange={(e) => setNewRoomName(e.target.value)}
        />
        <select
          value={newRoomDorm}
          onChange={(e) => setNewRoomDorm(e.target.value)}
        >
          <option value="" disabled selected>
            Select a Residence Hall
          </option>
          <option value="MIT">Mignon Tower</option>
          <option value="MIH">West, East, Mignon</option>
          <option value="NUH">Nunn Hall</option>
          <option value="ANH">Andrew's Hall</option>
          <option value="CMH">Cartmell/Alumni</option>
          <option value="ELA">Eagle Lake Apartments</option>
        </select>
        <button onClick={onCreateRoom}>Create Room</button>
      </div>

      <div className="roomListDiv d-flex flex-column p-4 align-items-center">
        <header style={{ fontSize: "large", padding: "30px" }}>
          Current Rooms:
        </header>
        {roomList.map((room) => (
          <div
            className="roomDivs"
            key={room.id}
            onClick={() => onRoomClick(room.id)}
          >
            <p style={{ fontSize: "medium" }}>
              {room.dorm} Dorm Room: '{room.name}' <br></br>Room Owner:{" "}
              {room.owner}
            </p>
            <button
              onClick={(e) => {
                stopProp(e);
                deleteRoom(room.id);
              }}
            >
              Delete X
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Rooms;
