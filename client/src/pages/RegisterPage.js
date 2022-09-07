import logo from "../logo.png";

export default function RegisterPage() {
  return (
    <section className="register-page">
      <div>
        <form>
          <div className="img">
            <img src={logo} alt="" />
          </div>
          <h2>Register</h2>
          <label for="">Email</label>
          <input type="email" placeholder="Input your email" />
          <label for="">Password</label>
          <input type="password" placeholder="Input your password" />
          <label for="">Phone Number</label>
          <input type="tel" placeholder="Input your password" />
          <label for="">Address</label>
          <input type="text" placeholder="Input your password" />
          <button>Log in</button>
          <p>
            Dont have an account? click here to <a>Log in</a>
          </p>
        </form>
      </div>
    </section>
  );
}
