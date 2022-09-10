import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/action/usersAction";
import Swal from "sweetalert2";

export default function LoginPage() {
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleOnChangeForm = (e) => {
    const { value, name } = e.target;

    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleOnSubmitForm = (e) => {
    e.preventDefault();

    dispacth(
      loginUser(loginData, (error, success) => {
        if (error) {
          return Swal.fire("Failed to login", error.response.data.message, "error");
        };
        localStorage.setItem("access_token", success.access_token);
        navigate("/")
      })
    )
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#FFDBA4" }}>

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
              <div className="text-center">
                <img src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png" alt="" style={{ height: '90px', width: '350px' }} />
              </div>
              <form onSubmit={handleOnSubmitForm}>
                <div className="card-body text-center" style={{ paddingLeft: '5', paddingRight: '5' }}>
                  <h3 className="mb-5">Login</h3>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeEmailX-2">Email / Username</label>
                    <input
                      type="text"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      placeholder="Input your email / username"
                      name="username"
                      value={loginData.username}
                      onChange={handleOnChangeForm}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      placeholder="Input your password"
                      name="password"
                      value={loginData.password}
                      onChange={handleOnChangeForm}
                    />
                  </div>

                  <button className="btn btn-primary btn-lg btn-block" style={{ width: '420px', backgroundColor: '#FF7F3F' }} type="submit">Login</button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}