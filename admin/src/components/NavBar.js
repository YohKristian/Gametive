import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav style={{ backgroundColor: '#CFD2CF', width: 'screen', height: '50px' }}>
            <div className="d-flex justify-content-between" style={{}}>
                <ul>
                    <img src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png" alt="" style={{ height: '40px', width: '150px' }} />
                </ul>
                <ul className="d-flex" style={{ paddingTop: '10px', color: 'white', fontWeight: '600', textDecoration: 'none' }}>
                    <Link to='/user' style={{ paddingRight: '50px', textDecoration: 'none', color: 'white' }}>User Table</Link>
                    <Link to='/game' style={{ paddingRight: '50px', textDecoration: 'none', color: 'white' }}>Game Table</Link>
                    <Link to='/event' style={{ paddingRight: '50px', textDecoration: 'none', color: 'white' }}>Event Table</Link>
                    <Link to='/user' style={{ paddingRight: '50px', textDecoration: 'none', color: 'white' }}>User Page</Link>
                    <button type="button" className="btn btn-danger" style={{ fontSize: '8pt', marginRight: '5px' }}>Log Out</button>
                </ul>
            </div>
        </nav>
    )
}