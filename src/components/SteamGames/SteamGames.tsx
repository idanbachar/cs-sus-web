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
          breakpoints={{
            675: {
              slidesPerView: games.length < 4 ? games.length : 2,
            },
            768: {
              slidesPerView: games.length < 4 ? games.length : 3,
            },
            1400: {
              slidesPerView: games.length < 4 ? games.length : 3,
            },
          }}
        >
          {games.map((game, index) => (
            <SwiperSlide key={index}>
              <Card
                cssStyles={{
                  background: `#0a0b0f`,
                  paddingTop: "3rem",
                  boxSizing: "border-box",
                }}
              >
                <SteamGame {...game} />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SteamGames;
