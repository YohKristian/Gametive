import logo from "../logo.png";

export default function LoginPage() {
  return (
    <section className="login-page">
      <div>
        <form>
          <div className="img">
            <img src={logo} alt="" />
          </div>
          <h2>Log in</h2>
          <label for="">Email</label>
          <input type="email" placeholder="Input your email" />
          <label for="">Password</label>
          <input type="password" placeholder="Input your password" />
          <button>Log in</button>
          <div className="g-sign-in"></div>
          <p>
            Dont have an account? click here to <a>Create</a>
          </p>
        </form>
      </div>
    </section>
  );
}
