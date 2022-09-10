export default function LoginPage(){
    return(
        <section className="vh-100" style={{backgroundColor: "#FFDBA4"}}>
            
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius: '1rem'}}>
        <div className="text-center">
          <img src="https://i.ibb.co/NN0tH4t/GAMETIVE-LOGO-BAR.png" alt="" style={{height: '90px', width: '350px'}}/>
          </div>
          <div className="card-body text-center" style={{paddingLeft: '5', paddingRight: '5'}}>
            <h3 className="mb-5">Login</h3>

            <div className="form-outline mb-4">
              <label className="form-label" for="typeEmailX-2">Email</label>
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg"  placeholder="Input your email" />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="typePasswordX-2">Password</label>
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" placeholder="Input your password" />
            </div>


            <button className="btn btn-primary btn-lg btn-block" style={{width: '420px' , backgroundColor: '#FF7F3F'}} type="submit">Login</button>


          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}