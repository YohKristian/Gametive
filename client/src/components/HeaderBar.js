import logo from "../logo.png"

export default function HeaderBar() {
  return (
    <header>
      <div className="img">
        <img src={logo} alt="" />
      </div>
      <div>
        <a>Event list</a>
        <a>Event Regestration</a>
        <a>Sign In</a>
      </div>
    </header>
  );
}
