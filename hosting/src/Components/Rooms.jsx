import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, getDoc, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config.js";
import "../comp_styling/Rooms.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Rooms() {
  const roomCollectionRef = collection(db, "rooms");
  const userCollectionRef = collection(db, "users");
  const navigate = useNavigate();
  
  //Defined an auth variable and current user variable outside the onCreateRoom function to
  //use to only render the rooms the current user is a part of. We can put this in a try if needed.
  const outsideAuth = getAuth();
  const outUser = outsideAuth.currentUser;


  // State for our list of rooms when it's pulled from the database and filtered
  const [roomList, setRoomList] = useState([]);

  // States used for creating a new room/s
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDorm, setNewRoomDorm] = useState("");

  // State for the room code used to join a room
  const [roomCode, setRoomCode] = useState("");

  const getRoomList = async () => {
    // READ THE DATA
    // AND SETMOVIELIST = THE DATA
    try {
      const data = await getDocs(roomCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
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
          numEditors:0,
          editor1:"",
          editor2:"",
          editor3:"",
        });
        getRoomList();
      } else {
        console.log("User not signed in");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Function to execute when the user clicks the "Join" button after putting in a room code.
  // This function has to make sure the user isn't already part of the room, store them as an editor
  // and increment the numEditors variable to know which editor variable to edit + if the room is full.
  const joinRoom = async () => {
      const roomRef = doc(db, "rooms", roomCode);
      const rDoc = await getDoc(roomRef);
      const roomData = { ...rDoc.data() };
      const numEdit = roomData.numEditors;
      if(outUser.uid==roomData.owner || outUser.uid==roomData.editor1 || 
        outUser.uid==roomData.editor2 || outUser.uid==roomData.editor3){
          console.log("User is already an editor or owner of this room.");
          return;
        }
      if(numEdit < 3){
        switch(numEdit){
          case 0:{
            await setDoc(doc(db, "rooms", roomCode),
            {
              numEditors:numEdit+1,
              editor1: outUser.uid,
            }, {merge: true});
            break;
          }
          case 1:{
            await setDoc(doc(db, "rooms", roomCode),
            {
              numEditors:numEdit+1,
              editor2: outUser.uid,
            }, {merge: true});
            break;
          }
          case 2:{
            await setDoc(doc(db, "rooms", roomCode),
            {
              numEditors:numEdit+1,
              editor3: outUser.uid,
            }, {merge: true});
            break;
          }
        }
        getRoomList();
      }
      else{
        alert("This room already has the maximum number of editors.");
      }
  }

  // Function for someone to remove themselves as an editor of the room when the "remove" button is clicked
  const removeRoom = async (roomId) => {
    const roomRef = doc(db, "rooms", roomId);
    const rDoc = await getDoc(roomRef);
    const roomData = { ...rDoc.data() };
    const numEdit = roomData.numEditors;
    
      switch(numEdit-1){
        case 0:{
          await setDoc(doc(db, "rooms", roomCode),
          {
            numEditors:numEdit-1,
            editor1: "",
          },{merge: true});
          break;
        }
        case 1:{
          await setDoc(doc(db, "rooms", roomCode),
          {
            numEditors:numEdit-1,
            editor2: "",
          },{merge: true});
          break;
        }
        case 2:{
          await setDoc(doc(db, "rooms", roomCode),
          {
            numEditors:numEdit-1,
            editor3: "",
          },{merge: true});
          break;
        }
      }
      getRoomList();
  }

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

  return (
    <>
      <br></br>
      <div className="d-flex justify-content-center">

        <div className="">
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
          <button className="create-room-btn" onClick={onCreateRoom}>Create Room</button>
        </div>

        <div className="join-room-div">
          <h1 style={{fontSize:"2rem"}}>Join a Room</h1>
          <input placeholder="Room Code..." onChange={(e)=>setRoomCode(e.target.value)}/>
          <button className="join-room-btn" onClick={joinRoom}>Join</button>
        </div>
      </div>

      <div className="roomListDiv d-flex flex-column p-4 align-items-center">
        <header style={{ fontSize: "large", padding: "30px" }}>
          Current Rooms:
        </header>
        {roomList.map((room=> (room.owner == outUser.uid || room.editor1 == outUser.uid || room.editor2 == outUser.uid 
        || room.editor3 == outUser.uid) ? <div
            className="roomDivs"
            key={room.id}
            onClick={() => onRoomClick(room.id)}
            >
            <p style={{ fontSize: "medium" }}>
              {room.dorm} Dorm Room: '{room.name}' <br></br>Room Owner:{" "}
              {room.owner}
            </p>
            {room.owner == outUser.uid ?             
              <button
                onClick={(e) => {
                  stopProp(e);
                  deleteRoom(room.id);} }
              >
                Delete X
              </button>
            :
              <button onClick={(e) => {{
                stopProp(e);
                removeRoom(room.id);}}}
                >Remove</button>
            }
    
          </div>:
          null
        ))}
      </div>
    </>
  );
}

export default Rooms;
