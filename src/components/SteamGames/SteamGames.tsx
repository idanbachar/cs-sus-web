import { Swiper, SwiperSlide } from "swiper/react";
import { ISteamGames } from "../../interfaces/ISteamWorks";
import SteamGame from "./SteamGame/SteamGame";
import styles from "./steam-games.module.css";
import "swiper/css/bundle";
import "swiper/swiper-bundle.css";
import Card from "../Card/Card";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import SwiperCore from "swiper";

const SteamGames: React.FC<ISteamGames> = (props) => {
  const { games } = props;
  SwiperCore.use([Navigation]);
  return (
    <div className={styles.container}>
      <Swiper
        className="mySwiper"
        modules={[Navigation, Scrollbar, A11y]}
        initialSlide={0}
        spaceBetween={10}
        freeMode={true}
        navigation={true}
        enabled={true}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        breakpoints={{
          880: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1220: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {games.map((game, index) => (
          <SwiperSlide key={index}>
            <Card backgroundColor={"#0a0b0f"}>
              <SteamGame {...game} />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SteamGames;
