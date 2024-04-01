import { useParams } from "react-router-dom";

export default function RoomPage() {
  const params = useParams();

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