import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/action/usersAction";
import { errorPopup } from "../helpers";
import LoadingHorizontal from "../components/LoadingHorizontal";

export default function LoginPage() {
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChangeForm = (e) => {
    const { value, name } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleOnSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    dispacth(
      loginUser(loginData, (error, success) => {
        setLoading(false);
        if (error) {
          return errorPopup(error);
        }
        localStorage.setItem("access_token", success.access_token);
        navigate("/");
      })
    );
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#ffcc6e" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem", backgroundColor: "#F5F5F5" }}
            >
              <div className="text-center">
                <img
                  src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png"
                  alt=""
                  style={{ height: "90px", width: "350px", marginTop: "50px" }}
                />
              </div>
              <form onSubmit={handleOnSubmitForm}>
                <div
                  className="card-body text-center"
                  style={{ paddingLeft: "5", paddingRight: "5" }}
                >
                  <h3 className="mb-5">Login</h3>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeEmailX-2">
                      Username
                    </label>
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
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Password
                    </label>
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

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    style={{
                      width: "420px",
                      backgroundColor: "orange",
                      marginTop: "40px",
                      marginBottom: "50px",
                      border: "none",
                    }}
                    type="submit"
                  >
                    {loading ? <LoadingHorizontal /> : <span>Login</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
