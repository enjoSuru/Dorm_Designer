import "../comp_styling/App.css";
import HomeRooms from "../Components/HomeRooms";

//This route will basically just be the landing page. Should have a description of the site along with images of the dorms or dorm
//layouts and descriptions of them. Could also display the <Auth /> component somewhere on this page if we don't want users to
//have to use the NavBar button.
function App() {
  return (
    <>
      <br></br>
      <h1 className="title">MSU Dorm Designer</h1>
      <div className="d-flex flex-column p-2 align-items-center intro-div">
        <div className="">
          <h2 className="what-are-we">
            <strong>
              <big>&nbsp;&nbsp;&nbsp;&nbsp;What are we?</big>
            </strong>
          </h2>
        </div>
        <div>
          <div className="intro-paragraph">
            <p className="text-primary">
              <strong>
                &nbsp;&nbsp;&nbsp;&nbsp; Dorm Designer is a free to use,
                intuitive software for creating your dream dorm room. Say
                goodbye to the headaches of trying to coordinate with your
                roommates over dorm room layouts. Our platform empowers you and
                your roommates to work together effortlessly, bringing your
                shared living space to life in stunning 2D detail.
              </strong>
            </p>
          </div>
          <br />
          <div className="intro-paragraph">
            <p className="text-primary">
              <strong>
                &nbsp;&nbsp;&nbsp;&nbsp;With our software, designing your dorm
                room is intuitive and stress-free. Our user-friendly interface
                lets you drag and drop furniture, decor, and other elements onto
                a 2D floor plan, allowing for seamless arrangement and
                experimentation until you achieve the perfect layout. Once
                you've perfected your design, save it for future reference or
                share it with your roommates for feedback and help.
                Collaboration has never been easier!
              </strong>
            </p>
            <br />
          </div>
          <div className="intro-paragraph">
            <p className="text-primary">
              <strong>
                &nbsp;&nbsp;&nbsp;&nbsp;Whether you're a design novice or an
                expert decorator, Dorm Designer provides the tools and
                inspiration you need to create a dorm room that's as unique as
                you are. Join us today and start designing the dorm room of your
                dreams!
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
