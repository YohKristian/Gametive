import NavBar from "../components/NavBar";
export default function UserPage() {
    return (
        <div>
            <NavBar />
            <div style={{ textAlign: 'center' }}>
                <div style={{ paddingTop: '50px' }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ color: '#FF7F3F', position: 'absolute', paddingTop: '6px', paddingLeft: '5px', fontSize: '25px' }} ></i>
                    <input style={{ width: '800px', height: '40px', paddingLeft: '40px', paddingBottom: '5px' }} type='text' placeholder="Search Here..." />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <h2>User</h2>
                </div>
                <div style={{ paddingTop: "30px", paddingLeft: '50px', paddingRight: '50px' }}>
                    <table className="table table-striped">
                        <thead>
                            <tr style={{ backgroundColor: '#EAE3D2' }}>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>admin123</td>
                                <td>admin123@gmail.com</td>
                                <td>Admin</td>
                                <td>
                                    <button type="button" className="btn btn-secondary" style={{ marginRight: '10px' }}>Edit</button>
                                    <button type="button" className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}