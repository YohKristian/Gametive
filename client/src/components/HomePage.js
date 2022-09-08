import Carousel from "nuka-carousel";

export default function HomePage() {
  return (
    <Carousel autoplay={true} autoplayInterval={1000} animation={"zoom"}>
      <img src="https://www.pockettactics.com/wp-content/uploads/2021/01/mobile-legends-wallpaper-6.jpg" />
      <img src="https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt949920a2daca917e/5fad835646f622769b5edc16/LoL_WR_KV_Wallpaper_1920x1080.jpg " />
    </Carousel>
  );
}
