import { ISteamFriend, ISteamPlayer } from "../../../interfaces/ISteamWorks";
import SteamUserAvatar from "../../SteamUser/SteamUserAvatar/SteamUserAvatar";
import styles from "./steam-friend.module.css";

const SteamFriend: React.FC<ISteamPlayer> = (props) => {
  const {
    steamid,
    personaname,
    profileurl,
    avatar,
    avatarfull,
    avatarmedium,
    realname,
    timecreated,
    loccountrycode,
  } = props;

  return (
    <div>
      <SteamUserAvatar
        avatars={{ avatar, avatarfull, avatarmedium }}
        size={"avatarfull"}
        cssStyles={{
          width: "5rem",
        }}
      />
      <span className={styles.personaname}>{personaname}</span>
    </div>
  );
};

export default SteamFriend;