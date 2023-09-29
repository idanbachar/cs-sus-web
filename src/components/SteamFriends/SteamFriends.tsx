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
          navigation={true}
          slidesPerView={3}
        >
          {friends.map((friend, index) => (
            <SwiperSlide key={index}>
              <Card
                cssStyles={{
                  background: `#0a0b0f`,
                  paddingTop: "1rem",
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
