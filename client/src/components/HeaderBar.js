import logo from "../logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VerticalModalEditPasswordUser from "./VerticalModalEditPasswordUser";

export default function HeaderBar() {
  const navigate = useNavigate();
  const { access_token, username } = localStorage;
  const [modalShow, setModalShow] = useState(false);

  function clickImg() {
    navigate("/");
  }

  function handleLogout() {
    localStorage.clear();
  }

  return (
    <header>
      <div className="img">
        <img src={logo} alt="" onClick={() => clickImg()} />
      </div>
      <div>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/search">Event list</NavLink>
        <NavLink to="/event">Your Events</NavLink>
        <NavLink to="/event-registration">Event Registration</NavLink>
        <NavLink to="/team-list">Team List</NavLink>
        {access_token ? (
          <>
            <NavLink onClick={handleLogout} to="/login">
              Logout
            </NavLink>
            <a style={{ color: "orange" }} onClick={() => { setModalShow(true); }}>Change Password</a>
            <VerticalModalEditPasswordUser
              show={modalShow}
              onHide={() => setModalShow(false)}
              username={username}
            />
          </>
        ) : (
          <NavLink to="/login">Sign In</NavLink>
        )}
      </div>
    </header>
  );
}
