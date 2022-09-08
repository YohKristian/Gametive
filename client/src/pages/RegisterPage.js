import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="register-page">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="img">
            <img src={logo} alt="" />
          </div>
          <h2>Register</h2>
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
          <label>Phone number</label>
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
          />
          <button>Log in</button>
          <p>
            Dont have an account? click here to{" "}
            <Link to={"/login"}>Log in</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
