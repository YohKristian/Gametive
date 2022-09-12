import ImageCarousel from "./ImageCarousel";
import VideoCarousel from "./VideoCarousel";
import about from "../assets/image/gametive-aboutus.png"
import about2 from "../assets/image/gametive-aboutus2.png"

export default function HomePage() {
  return (
    <>
      <ImageCarousel />
      <h1 className="trailers">Trailers</h1>
      <VideoCarousel />

      <div className="about-us1">
        <div className="text-us">
          <h1>KOMPETISI</h1>
          <h1>DENGAN TEMAN!</h1>
          <hr className="line-us" />
          <p>Ayo daftarkan diri dengan teman - temanmu untuk meningkatkan dan mengetahui seberapa pro anda dalam liga kompetitif, atau jika anda tidak punya teman main, adakan kompetisi di sekitar daerah anda untuk mendapatkan keseruan kompetitif lokal </p>
        </div>
        <div className="img-us">
          <img src={about} alt=""/>
        </div>
      </div>

      <div className="about-us2">
        <div className="text-us">
          <h1>KAMI TERBUKA UNTUK SEMUA</h1>
          <h1>EVENT ESPORT!</h1>
          <hr className="line-us" />
          <p>Ayo daftarkan event anda, jangan khawatir kami juga menerima event kompetitif yang tidak memungut biaya apapun! Tunggu apa lagi? Segera daftarkan event anda dan temui player player pro yang ada di sekitar anda dan buat tim menuju liga dunia!</p>
        </div>
        <div className="img-us">
          <img src={about2} alt="" />
        </div>
      </div>
    </>
  );
}
