import logo from "../logo.png";

export default function FooterBar() {
  return (
    <footer className="text-center text-lg-start">

      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

        <div className="me-5 d-none d-lg-block">
        </div>

      </section>

      <section className="footer-detail">
        <div className="container text-center text-md-start mt-5">

          <div className="row mt-3">

            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

              <h6 className="text-uppercase fw-bold mb-4">
                <div className="img">
                  <img src={logo} alt="" />
                  <div style={{ border: "1px solid white", opacity: 0.8 }}></div>
                </div>
              </h6>
              <p>
                Website mengenai event-event game terkait e-sport yang tersebar luas di indonesia.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                MOBA Games
                <hr style={{ border: "1px solid white", marginTop: "20px", opacity: 0.8 }}></hr>
              </h6>
              <p>
                <a href="https://wildrift.leagueoflegends.com/en-gb/" className="text-reset">LoL : Wild Rift</a>
              </p>
              <p>
                <a href="https://m.mobilelegends.com/en" className="text-reset">Mobile Legends</a>
              </p>
              <p>
                <a href="https://www.arenaofvalor.com/" className="text-reset">Arena Of Valor</a>
              </p>
              <p>
                <a href="https://www.dota2.com/home" className="text-reset">DOTA 2</a>
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                FPS & BR Games
                <hr style={{ border: "1px solid white", marginTop: "20px", opacity: 0.8 }}></hr>
              </h6>
              <p>
                <a href="https://playvalorant.com/id-id/" className="text-reset">Valorant</a>
              </p>
              <p>
                <a href="https://blog.counter-strike.net/" className="text-reset">CS : GO</a>
              </p>
              <p>
                <a href="https://ff.garena.com/en/" className="text-reset">Free Fire</a>
              </p>
              <p>
                <a href="https://www.pubgmobile.com/id/home.shtml" className="text-reset">PUBG Mobile</a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

              <h6 className="text-uppercase fw-bold mb-4">
                Hubungi Kami
                <hr style={{ border: "1px solid white", marginTop: "20px", opacity: 0.8 }}></hr>
              </h6>
              <p><i className="fas fa-home me-3"></i> Jakarta, Indonesia</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                gametiveid@gmail.com
              </p>
              <p><i className="fas fa-phone me-3"></i> +62 8138589730</p>
              <p><i className="fas fa-print me-3"></i> (021) 555 538540</p>
            </div>

          </div>

        </div>
      </section>



      <div className="text-center p-4" style={{ backgroundColor: "rgb(225, 146, 0)" }}>
        Hak Cipta © Hacktiv8, di desain oleh tim Gametive. Semua hak dilindungi oleh undang-undang.
      </div>

    </footer>

  )
}