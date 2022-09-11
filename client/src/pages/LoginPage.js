import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../logo.png";
import { login } from "../store/actions";
import { errorPopup } from "../helpers";
import LoadingHorizontal from "../components/LoadingHorizontal";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login(loginData))
      .then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", data.username)
        navigate("/");
      })
      .catch((error) => errorPopup(error))
      .finally(() => setLoading(false));
  };

  return (
    <section className="login-page">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="img">
            <img src={logo} alt="" />
          </div>
          <h2>Log in</h2>
          <label>Username</label>
          <input
            onChange={handleInput}
            name="username"
            type="username"
            placeholder="Input your username"
          />
          <label>Password</label>
          <input
            onChange={handleInput}
            name="password"
            type="password"
            placeholder="Input your password"
          />
          <br></br>
          <button>
            {loading ? <LoadingHorizontal /> : <span>Login</span>}
          </button>
          <div className="g-sign-in"></div>
          <p>
            Dont have an account? click here to{" "}
            <Link to={"/register"}>Create</Link>
            <br></br>
            or back to <Link to={"/"}>Home</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
