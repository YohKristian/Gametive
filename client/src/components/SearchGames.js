import { useNavigate } from 'react-router-dom';

export default function SearchGames() {
  const navigate = useNavigate()

  function clickImg() {
    navigate('/detail')
  }

  return (
    <div className="search-page">
      <div className="search-bar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search here..." />
      </div>
      <div>
        <div>
          <div className="img">
            <img
              src="https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt949920a2daca917e/5fad835646f622769b5edc16/LoL_WR_KV_Wallpaper_1920x1080.jpg"
              alt=""
              onClick={() => clickImg()}
            />
          </div>
          <div>
            <h1>Wildrift Competition for Noobs</h1>
            <span className="status">OFFLINE</span>
            <div>
              <p>Lokasi: Jakarta Selatan</p>
              <p>Mulai: Jumat, 15 September 2050</p>
              <p>Regestration Fee: Rp. 150.000,00</p>
            </div>
          </div>
        </div>
        <div>
          <div className="img">
            <img
              src="https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt949920a2daca917e/5fad835646f622769b5edc16/LoL_WR_KV_Wallpaper_1920x1080.jpg"
              alt=""
            />
          </div>
          <div>
            <h1>Wildrift Competition for Noobs</h1>
            <span className="status">OFFLINE</span>
            <div>
              <p>Lokasi: Jakarta Selatan</p>
              <p>Mulai: Jumat, 15 September 2050</p>
              <p>Regestration Fee: Rp. 150.000,00</p>
            </div>
          </div>
        </div>
        <div>
          <div className="img">
            <img
              src="https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt949920a2daca917e/5fad835646f622769b5edc16/LoL_WR_KV_Wallpaper_1920x1080.jpg"
              alt=""
            />
          </div>
          <div>
            <h1>Wildrift Competition for Noobs</h1>
            <span className="status">OFFLINE</span>
            <div>
              <p>Lokasi: Jakarta Selatan</p>
              <p>Mulai: Jumat, 15 September 2050</p>
              <p>Regestration Fee: Rp. 150.000,00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
