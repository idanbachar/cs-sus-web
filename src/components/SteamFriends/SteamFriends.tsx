import { Swiper, SwiperSlide } from "swiper/react";
import { ISteamFriends } from "../../interfaces/ISteamWorks";
import SteamFriend from "./SteamFriend/SteamFriend";
import styles from "./steam-friends.module.css";
import "swiper/css/bundle";
import "swiper/swiper-bundle.css";
import Card from "../Card/Card";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

const SteamFriends: React.FC<ISteamFriends> = (props) => {
  const { friends } = props;
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
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
        >
          {friends.map((friend, index) => (
            <SwiperSlide key={index}>
              <Card
                cssStyles={{
                  background: `#0a0b0f`,
                  paddingTop: "1rem",
                  boxSizing: "border-box",
                  height: "13rem",
                }}
              >
                <SteamFriend {...friend} />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SteamFriends;
