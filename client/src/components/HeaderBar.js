import logo from "../logo.png";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VerticalModalEditPasswordUser from "./VerticalModalEditPasswordUser";

export default function HeaderBar() {
  const navigate = useNavigate();
  const { access_token, username } = localStorage;
  const [modalShow, setModalShow] = useState(false);
  const [showBlurBg, setShowBlurBg] = useState(false);

  function toggleBlurBg() {
    if (showBlurBg) setShowBlurBg(false);
    else setShowBlurBg(true);
  }

  function handleLogout() {
    localStorage.clear();
  }

  return (
    <header>
      <div className="hamburger">
        <div onClick={toggleBlurBg}>☰</div>
        <div className="side-bar">
          <NavLink to="/search">Event list</NavLink>
          {access_token && <NavLink to="/event">Your Events</NavLink>}
          <NavLink to="/event-registration">Event Registration</NavLink>
          <NavLink to="/team-list">My Teams</NavLink>
          {access_token && <NavLink to="/history-list">History Event</NavLink>}
          {access_token ? (
            <>
              <hr></hr>
              <span
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Change Password
              </span>
              <Link onClick={handleLogout} to="/login">
                Logout
              </Link>
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
      </div>
      <div className="img" onClick={() => navigate("/home")}>
        <img src={logo} alt="" onClick={() => navigate("/")} />
      </div>
      <div>
        <NavLink to="/search">Event list</NavLink>
        {access_token && <NavLink to="/event">Your Events</NavLink>}
        <NavLink to="/event-registration">Event Registration</NavLink>
        <NavLink to="/team-list">My Teams</NavLink>
        {access_token && <NavLink to="/history-list">History Event</NavLink>}
        {access_token ? (
          <>
            <div className="dropdown">
              <i className="fa-solid fa-user"></i>
              <div className="submenu">
                <span
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  Change Password
                </span>
                <Link onClick={handleLogout} to="/login">
                  Logout
                </Link>
              </div>
            </div>
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
      <div
        className={showBlurBg ? "blur-bg active" : "blur-bg"}
        onClick={toggleBlurBg}
      ></div>
    </header>
  );
}
