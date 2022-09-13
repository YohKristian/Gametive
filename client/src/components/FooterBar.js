import logo from "../logo.png";

export default function FooterBar() {
  return (
    <footer class="text-center text-lg-start">

      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

        <div class="me-5 d-none d-lg-block">
        </div>

      </section>

      <section class="footer-detail">
        <div class="container text-center text-md-start mt-5">

          <div class="row mt-3">

            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

              <h6 class="text-uppercase fw-bold mb-4">
                <div className="img">
                  <img src={logo} alt="" />
                </div>
              </h6>
              <p>
                Website mengenai event-event game terkait e-sport yang tersebar luas di indonesia
              </p>
            </div>



            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">
                Games
              </h6>
              <p>
                <a href="https://wildrift.leagueoflegends.com/en-gb/" class="text-reset">LoL : Wildrift</a>
              </p>
              <p>
                <a href="https://m.mobilelegends.com/en" class="text-reset">Mobile Legends</a>
              </p>
              <p>
                <a href="https://www.arenaofvalor.com/" class="text-reset">Arena Of Valor</a>
              </p>
              <p>
                <a href="https://playvalorant.com/id-id/" class="text-reset">Valorant</a>
              </p>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">
                &#8205;
              </h6>
              <p>
                <a href="https://blog.counter-strike.net/" class="text-reset">CS : GO</a>
              </p>
              <p>
                <a href="https://ff.garena.com/en/" class="text-reset">Garena Free Fire</a>
              </p>
              <p>
                <a href="https://www.pubgmobile.com/id/home.shtml" class="text-reset">PUBG Mobile</a>
              </p>
            </div>



            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

              <h6 class="text-uppercase fw-bold mb-4">Hubungi Kami</h6>
              <p><i class="fas fa-home me-3"></i> Jakarta, Indonesia</p>
              <p>
                <i class="fas fa-envelope me-3"></i>
                gametive@mail.com
              </p>
              <p><i class="fas fa-phone me-3"></i> +62 0899606060</p>
              <p><i class="fas fa-print me-3"></i> (021) 555 5555</p>
            </div>

          </div>

        </div>
      </section>



      <div class="text-center p-4" style={{ backgroundColor: "rgb(225, 146, 0)" }}>
        Hak Cipta © Hacktiv8, di desain oleh tim Gametive. Semua hak dilindungi oleh undang-undang.
      </div>

    </footer>

  )
}