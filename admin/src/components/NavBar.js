import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <nav style={{ backgroundColor: '#9E9E9E', width: 'screen', height: '50px' }}>
            <div className="d-flex justify-content-between" style={{}}>
                <ul>
                    <img src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png" alt="" style={{ height: '40px', width: '150px' }} />
                </ul>
                <ul className="d-flex" style={{ paddingTop: '10px', color: 'white', fontWeight: '600', textDecoration: 'none' }}>
                    <NavLink to='/event' style={{ paddingRight: '50px', textDecoration: 'none', color: 'white' }}>Event Table</NavLink>
                    <NavLink to='/user' style={{ paddingRight: '50px', textDecoration: 'none', color: 'white' }}>User Table</NavLink>
                    <NavLink to='/game' style={{ paddingRight: '50px', textDecoration: 'none', color: 'white' }}>Game Table</NavLink>
                    <button
                        type="button"
                        className="btn btn-danger"
                        style={{ fontSize: '8pt', marginRight: '5px', userSelect: "none" }}
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </ul>
            </div>
        </nav>
    )
}