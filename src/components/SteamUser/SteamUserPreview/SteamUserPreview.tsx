import { ISteamPlayer } from "../../../interfaces/ISteamWorks";
import { IUser } from "../../../interfaces/IUser";
import SteamUserAvatar from "../SteamUserAvatar/SteamUserAvatar";
import styles from "../steam-user.module.css";

const SteamUserPreview: React.FC<ISteamPlayer | IUser> = (props) => {
  const {
    steamid,
    personaname,
    profileurl,
    avatar,
    avatarfull,
    avatarmedium,
    loccountrycode,
    country_image,
  } = props;
  return (
    <div>
      <SteamUserAvatar
        avatars={{ avatar, avatarfull, avatarmedium }}
        size={"avatarfull"}
      />
      <div className={styles.name}>
        <span>
          <a href={profileurl} target={"_blank"}>
            {personaname}
          </a>
        </span>
      </div>
      {loccountrycode && country_image && (
        <div className={styles.country}>
          <span>{loccountrycode}</span>
          <img src={country_image} width={"48"} height={"36"} />
        </div>
      )}
    </div>
  );
};

export default SteamUserPreview;
