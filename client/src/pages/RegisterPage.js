import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../logo.png";
import { register } from "../store/actions";
import { errorPopup, successPopup } from "../helpers";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    // phoneNumber: "",
    // address: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register(registerData, (error) => {
        if (error) return errorPopup(error);
        successPopup("Register success");
        navigate("/login");
      })
    );
  };

  return (
    <section className="register-page">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="img">
            <img src={logo} alt="" />
          </div>
          <h2>Register</h2>
          <label>Username</label>
          <input
            onChange={handleInput}
            name="username"
            type="username"
            placeholder="Input your username"
          />
          <label>Email</label>
          <input
            onChange={handleInput}
            name="email"
            type="email"
            placeholder="Input your email"
          />
          <label>Password</label>
          <input
            onChange={handleInput}
            name="password"
            type="password"
            placeholder="Input your password"
          />
          {/* <label>Phone number</label>
          <input
            onChange={handleInput}
            name="phoneNumber"
            type="tel"
            placeholder="Input your Phone number"
          />
          <label>Address</label>
          <input
            onChange={handleInput}
            name="address"
            type="text"
            placeholder="Input your address"
          /> */}
          <br></br>
          <button>Register</button>
          <p>
            Already have an account? click here to{" "}
            <Link to={"/login"}>Log in</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
