import ImageCarousel from "./ImageCarousel";
import VideoCarousel from "./VideoCarousel";

export default function HomePage() {
  return (
    <>
      <ImageCarousel />
      <h1 className="trailers">Trailers</h1>
      <VideoCarousel />
    </>
  );
}
