import { useParams } from "react-router-dom";
import { collection, getDocs, getDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config.js';

export default function RoomPage() {

  

  const params = useParams();
  const roomID = params.roomID;

  const roomDoc = doc(db,"rooms",roomID);

  return(
    <>
    <div>
      <p>
        hello, this is a room page.
      </p>
    </div>
    </>
  );
}