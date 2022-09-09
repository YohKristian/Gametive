import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player/youtube";

const getConfigurableProps = () => ({
  showArrows: false,
  showStatus: false,
  showIndicators: true,
  showThumbs: true,
  useKeyboardArrows: true,
  stopOnHover: true,
  dynamicHeight: true,
  emulateTouch: true,
  autoFocus: false,
  thumbWidth: 100,
  selectedItem: 0,
  transitionTime: 500,
  infiniteLoop: true,
  swipeScrollTolerance: 5,
});

const YoutubeSlide = ({ url, isSelected, legend }) => (
  <div className="vid-slide">
    <ReactPlayer
      width="100%"
      url={url}
      playing={isSelected}
      loop={true}
      muted={true}
      height={"80vh"}
    />
    <div>
      <h1>{legend}</h1>
    </div>
  </div>
);

const slideVideo = [
  {
    url: "https://www.youtube.com/embed/zbtEZz0KnI0",
    legend: "Mobile Legends",
  },
  {
    url: "https://www.youtube.com/embed/TFzkbos0oeo",
    legend: "Wild Rift",
  },
  {
    url: "https://www.youtube.com/embed/e_E9W2vsRbQ",
    legend: "Valorant",
  },
  {
    url: "https://www.youtube.com/embed/edYCtaNueQY",
    legend: "CSGO",
  },
];

export default function VideoCarousel() {
  const customRenderItem = (item, props) => (
    <item.type {...item.props} {...props} />
  );

  const getVideoThumb = (videoId) =>
    `https://img.youtube.com/vi/${videoId}/default.jpg`;

  const getVideoId = (url) =>
    url.substr("https://www.youtube.com/embed/".length, url.length);

  const customRenderThumb = (children) =>
    children.map((item) => {
      const videoId = getVideoId(item.props.url);
      return <img src={getVideoThumb(videoId)} alt="" />;
    });
  return (
    <div className="video-carousel">
      <Carousel
        renderItem={customRenderItem}
        renderThumbs={customRenderThumb}
        {...getConfigurableProps()}
      >
        {slideVideo.map((el, idx) => (
          <YoutubeSlide key={idx} url={el.url} legend={el.legend} />
        ))}
      </Carousel>
    </div>
  );
}
