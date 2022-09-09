import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

export default function HomePage() {
  return (
    <Carousel {...getConfigurableProps()} width={"100%"}>
      <div className="img-slide">
        <img src="https://www.pockettactics.com/wp-content/uploads/2021/01/mobile-legends-wallpaper-6.jpg" />
        <div>
          <h1>Mobile legends</h1>
        </div>
      </div>
      <div className="img-slide">
        <img src="https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt949920a2daca917e/5fad835646f622769b5edc16/LoL_WR_KV_Wallpaper_1920x1080.jpg " />
        <div>
          <h1>Wild Rift</h1>
        </div>
      </div>
      <div className="img-slide">
        <img src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3fffb73d23d87d08/5efb8b0540426d0f56b44fe8/SUB_KV.jpg" />
        <div>
          <h1>Valorant</h1>
        </div>
      </div>
    </Carousel>
  );
}
