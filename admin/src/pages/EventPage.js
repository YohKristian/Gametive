import NavBar from "../components/NavBar";

export default function EventPage(){
    return(
        <div>
            <NavBar/>
            <div style={{textAlign:'center'}}>
            <div style={{paddingTop: '50px'}}>
            <i className="fa-solid fa-magnifying-glass" style={{color: '#FF7F3F',position: 'absolute', paddingTop: '6px', paddingLeft: '5px', fontSize: '25px'}} ></i>
                <input style={{ width: '800px', height: '40px', paddingLeft: '40px', paddingBottom: '5px'}} type='text' placeholder="Search Here..."/>
            </div>
            <div style={{paddingTop: '20px'}}>
                <h2>Event</h2>
            </div>
            <div style={{ paddingTop: "30px", paddingLeft: '50px', paddingRight: '50px'}}>
            <table class="table table-striped">
  <thead>
    <tr style={{backgroundColor: '#EAE3D2'}}>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Event Poster</th>
      <th scope="col">Event Type</th>
      <th scope="col">Event Date</th>
      <th scope="col">Location</th>
      <th scope="col">User</th>
      <th scope="col">Game</th>
      <th scope="col">Event Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">wildrift for noobs</th>
      <td>Rp 150.000</td>
      <td><img style={{width: '100px', height: '100px'}} src="https://statics.indozone.news/content/2021/06/24/qEsgoxB/league-of-legends-wild-rift-bakal-hadirkan-fitur-ban-pick-di-patch-barunya98_700.jpg" alt=""/></td>
      <td>online</td>
      <td>2022-03-15</td>
      <td>Jakarta Barat</td>
      <td>123</td>
      <td>league of legend - wild rift</td>
      <td><p style={{backgroundColor: '#59CE8F', borderRadius: '10px'}}>approved</p></td>
      <td >
        <div className="d-flex flex-column">
      <button type="button" class="btn btn-secondary" style={{marginBottom: '10px'}}>Edit</button>
      <button type="button" class="btn btn-danger">Delete</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
            </div>
            </div>
        </div>
    )
}