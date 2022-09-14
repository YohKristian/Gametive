import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../logo.png";
import { googleLogin, login } from "../store/actions";
import { errorPopup } from "../helpers";
import LoadingHorizontal from "../components/LoadingHorizontal";
import VerticalModalTnC from "../components/VerticalModalTnC";

export default function LoginPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const [modalShow, setModalShow] = useState(false);

	const handleInput = (e) => {
		const { value, name } = e.target;
		setLoginData({ ...loginData, [name]: value });
	};

	const handleCredentialResponse = (response) => {
		setLoading(true);
		dispatch(googleLogin(response))
			.then(({ data }) => {
				localStorage.setItem("access_token", data.access_token);
				localStorage.setItem("username", data.username);
				navigate("/");
			})
			.catch((error) => errorPopup(error))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		const callback = handleCredentialResponse;
		const google = window.google;

		google.accounts.id.initialize({
			client_id: "859738134038-o13q0rhpmhqjemomlmjjevkc2tuh6qc2.apps.googleusercontent.com",
			callback,
		});

		google.accounts.id.renderButton(document.getElementById("google-button-login"), { theme: "outline", size: "large" });
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		dispatch(login(loginData))
			.then(({ data }) => {
				localStorage.setItem("access_token", data.access_token);
				localStorage.setItem("username", data.username);
				navigate("/");
			})
			.catch((error) => errorPopup(error))
			.finally(() => setLoading(false));
	};

	return (
		<section className="login-page font-link">
			<div>
				<form onSubmit={handleSubmit}>
					<div className="img">
						<img src={logo} alt="" />
					</div>
					<h2>Log in</h2>
					<label>Username</label>
					<input onChange={handleInput} name="username" type="username" placeholder="Input your username" />
					<label>Password</label>
					<input onChange={handleInput} name="password" type="password" placeholder="Input your password" />
					<br></br>
					<button>{loading ? <LoadingHorizontal /> : <span>Login</span>}</button>
					<div className="d-flex justify-content-center align-items-center" id="google-button-login"></div>
					<p>
						Dont have an account? click here to <Link to={"/register"}>Create</Link>
						<br></br>
						or back to <Link to={"/"}>Home</Link>
					</p>
					<p
						className="bi bi-exclamation-triangle-fill"
						onClick={() => {
							setModalShow(true);
						}}
					>
						{" "}
						Terms & Condition
					</p>
					<VerticalModalTnC show={modalShow} onHide={() => setModalShow(false)} />
				</form>
			</div>
		</section>
	);
}
