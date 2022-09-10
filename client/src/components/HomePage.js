import ImageCarousel from "./ImageCarousel";
import VideoCarousel from "./VideoCarousel";

export default function HomePage() {
  return (
    <>
      <ImageCarousel />
      <h1 className="trailers" style={{ backgroundColor: "orange", color: "white", textAlign: "center", margin: "0 0 0 0" }}>Trailers</h1>
      <VideoCarousel />
    </>
  );
}
