import { IUser } from "../../../interfaces/IUser";
import Card from "../../Card/Card";
import SteamUserAvatar from "../SteamUserAvatar/SteamUserAvatar";
import styles from "../steam-user.module.css";

const SteamUserPreview: React.FC<IUser> = (props) => {
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
    country_image,
    friends,
    vacBans,
    games,
    inventory,
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.socialContainer}>
        <Card>
          <SteamUserAvatar
            avatars={{ avatar, avatarfull, avatarmedium }}
            size={"avatarfull"}
            borderColor="green"
          />
          <div className={styles.name}>
            <span>{personaname}</span>
          </div>
          {loccountrycode && country_image && (
            <div className={styles.country}>
              <span>{loccountrycode}</span>
              <img src={country_image} width={"48"} height={"36"} />
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SteamUserPreview;
