import logo from "../logo.png"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function HeaderBar() {
  const navigate = useNavigate()

  function clickImg() {
    navigate('/')
  }

  return (
    <header>
      <div className="img">
        <img src={logo} alt="" onClick={() => clickImg()} />
      </div>
      <div>
        <Link to='/search'>Event list</Link>
        <Link to='/'>Event Registration</Link>
        <Link to='/login'>Sign In</Link>
      </div>
    </header>
  );
}
