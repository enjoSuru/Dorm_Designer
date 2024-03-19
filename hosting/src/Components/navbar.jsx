import {Link,Outlet} from 'react-router-dom';
import LoginPopup from './loginPopup';


export default function NavBar(){
return(
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{background:"rgb(23,23,21)"}}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Home</Link>
          <Link to="/rooms" className="nav-item me-auto" style={{paddingLeft:"1rem",paddingRight:"1rem"}}>View Rooms</Link>
          <Link to="/account" className="nav-item" style={{paddingLeft:"1rem",paddingRight:"1rem"}}>Account</Link>
          <LoginPopup />
        </div>
      </nav>
      <Outlet/>
    </>
);
}