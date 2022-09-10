import NavBar from "../components/NavBar";
export default function GamePage() {
  return (
    <div>
      <NavBar />
      <div style={{ textAlign: 'center' }}>
        <div style={{ paddingTop: '50px' }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#FF7F3F', position: 'absolute', paddingTop: '6px', paddingLeft: '5px', fontSize: '25px' }} ></i>
          <input style={{ width: '800px', height: '40px', paddingLeft: '40px', paddingBottom: '5px' }} type='text' placeholder="Search Here..." />
        </div>
        <div style={{ paddingTop: '20px' }}>
          <h2>Game</h2>
        </div>
        <div style={{ paddingTop: "30px", paddingLeft: '50px', paddingRight: '50px' }}>
          <table className="table table-striped">
            <thead>
              <tr style={{ backgroundColor: '#EAE3D2' }}>
                <th scope="col">Name</th>
                <th scope="col">Game Poster</th>
                <th scope="col">Release Date</th>
                <th scope="col">Developer</th>
                <th scope="col">Genre</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">League of Legends wildrift</th>
                <td><img style={{ width: '100px', height: '100px' }} src="https://statics.indozone.news/content/2021/06/24/qEsgoxB/league-of-legends-wild-rift-bakal-hadirkan-fitur-ban-pick-di-patch-barunya98_700.jpg" alt="" /></td>
                <td>2022-10-27</td>
                <td>RIOT GAMES</td>
                <td>MOBA</td>
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