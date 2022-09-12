import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../logo.png";
import { register } from "../store/actions";
import { errorPopup, successPopup } from "../helpers";
import LoadingHorizontal from "../components/LoadingHorizontal";
import VerticalModalTnC from "../components/VerticalModalTnC";

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
  const [loading, setLoading] = useState(false);

  const [modalShow, setModalShow] = useState(true);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(register(registerData))
      .then(() => {
        successPopup("Register success");
        navigate("/login");
      })
      .catch((error) => errorPopup(error))
      .finally(() => setLoading(false));
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
          <button>
            {loading ? <LoadingHorizontal /> : <span>Register</span>}
          </button>
          <p>
            Already have an account? click here to{" "}
            <Link to={"/login"}>Log in</Link>
          </p>
          <p className="bi bi-exclamation-triangle-fill" onClick={() => { setModalShow(true); }}> Terms & Condition</p>
          <VerticalModalTnC
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </form>
      </div>
    </section>
  );
}
