import { Carousel } from "react-responsive-carousel";

const getConfigurableProps = () => ({
  showArrows: true,
  showStatus: false,
  showIndicators: true,
  infiniteLoop: true,
  showThumbs: true,
  useKeyboardArrows: true,
  autoPlay: true,
  stopOnHover: true,
  swipeable: true,
  dynamicHeight: true,
  emulateTouch: true,
  autoFocus: false,
  thumbWidth: 100,
  selectedItem: 0,
  interval: 3000,
  transitionTime: 500,
  swipeScrollTolerance: 5,
});

const slideImage = [
  {
    img: "https://www.pockettactics.com/wp-content/uploads/2021/01/mobile-legends-wallpaper-6.jpg",
    legend: "Mobile legends",
  },
  {
    img: "https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt949920a2daca917e/5fad835646f622769b5edc16/LoL_WR_KV_Wallpaper_1920x1080.jpg",
    legend: "Wild rift",
  },
  {
    img: "https://images6.alphacoders.com/110/1103575.jpg",
    legend: "Arena Of Valor",
  },
  {
    img: "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3fffb73d23d87d08/5efb8b0540426d0f56b44fe8/SUB_KV.jpg",
    legend: "Valorantr",
  },
  {
    img: "https://wallpaperboat.com/wp-content/uploads/2021/04/26/77161/csgo-15.jpg",
    legend: "CS:GO",
  },
  {
    img: "https://images7.alphacoders.com/107/1079489.jpg",
    legend: "Free Fire",
  },
  {
    img: "https://esportsku.com/wp-content/uploads/2021/02/pubg-uhdpaper.com-4K-5.2324-wallpaper-hd-scaled.jpg",
    legend: "PUBG Mobile",
  },
];

export default function ImageCarousel() {
  return (
    <div className="image-carousel">
      <Carousel {...getConfigurableProps()} width={"100%"}>
        {slideImage.map((el, idx) => (
          <div className="img-slide" key={idx}>
            <img src={el.img} alt="" />
            <div>
              <h1>{el.legend}</h1>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
