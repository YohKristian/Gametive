import { Carousel } from "react-responsive-carousel";

const getConfigurableProps = () => ({
  showArrows: true,
  showStatus: false,
  showIndicators: true,
  infiniteLoop: true,
  showThumbs: true,
  useKeyboardArrows: true,
  autoPlay: true,
  stopOnHover: false,
  swipeable: true,
  dynamicHeight: true,
  emulateTouch: true,
  autoFocus: false,
  thumbWidth: 100,
  selectedItem: 0,
  interval: 5000,
  transitionTime: 500,
  swipeScrollTolerance: 5,
});

const slideImage = [
  {
    img: "https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt949920a2daca917e/5fad835646f622769b5edc16/LoL_WR_KV_Wallpaper_1920x1080.jpg",
    legend: "Wild rift",
  },
  {
    img: "https://www.pockettactics.com/wp-content/uploads/2021/01/mobile-legends-wallpaper-6.jpg",
    legend: "Mobile legends",
  },
  {
    img: "https://images6.alphacoders.com/110/1103575.jpg",
    legend: "Arena Of Valor",
  },
  {
    img: "https://pt.moyens.net/wp-content/uploads/2022/02/1644959338_O-Valorant-esta-sendo-desenvolvido-pela-Riot-para-as-plataformas.jpg",
    legend: "Valorant",
  },
  {
    img: "https://wallpaperboat.com/wp-content/uploads/2021/04/26/77161/csgo-15.jpg",
    legend: "CS:GO",
  },
  {
    img: "https://www.xtrafondos.com/en/descargar.php?id=6224&resolucion=1920x1080",
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
