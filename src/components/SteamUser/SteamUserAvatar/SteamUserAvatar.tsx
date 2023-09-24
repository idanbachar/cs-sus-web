import { ISteamUserAvatar } from "../../../interfaces/IUser";
import styles from "./steam-user-avatar.module.css";

const SteamUserAvatar: React.FC<ISteamUserAvatar> = (props) => {
  const { avatars, size, personaname, borderColor = "gray", cssStyles } = props;

  return (
    <div className={styles.avatarContainer}>
      <img
        src={avatars[size]}
        className={styles.avatar}
        style={{
          border: `5px solid ${borderColor}`,
          ...cssStyles,
        }}
      />
      {personaname && <span className={styles.personaname}>{personaname}</span>}
    </div>
  );
};

export default SteamUserAvatar;
