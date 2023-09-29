import { Swiper, SwiperSlide } from "swiper/react";
import { ISteamGames } from "../../interfaces/ISteamWorks";
import SteamGame from "./SteamGame/SteamGame";
import styles from "./steam-games.module.css";
import "swiper/css/bundle";
import "swiper/swiper-bundle.css";
import Card from "../Card/Card";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

const SteamGames: React.FC<ISteamGames> = (props) => {
  const { games } = props;
  const games_filtered = games.filter((game) => game.playtime_forever > 50);

  SwiperCore.use([Navigation]);
  return (
    <>
      <div className={styles.container}>
        <Swiper
          className="mySwiper"
          modules={[Navigation]}
          initialSlide={0}
          spaceBetween={20}
          navigation={true}
          slidesPerView={2}
        >
          {games_filtered.map((game, index) => (
            <SwiperSlide key={index}>
              <Card
                cssStyles={{
                  background: `#0a0b0f`,
                  paddingTop: "3rem",
                  boxSizing: "border-box",
                }}
              >
                {/* <SteamGame {...game} /> */}
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SteamGames;
