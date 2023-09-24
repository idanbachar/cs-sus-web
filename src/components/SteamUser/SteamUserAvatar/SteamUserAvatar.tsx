import { ISteamUserAvatar } from "../../../interfaces/IUser";
import styles from "./steam-user-avatar.module.css";

const SteamUserAvatar: React.FC<ISteamUserAvatar> = (props) => {
  const { avatarfull, personaname, borderColor } = props;

  return (
    <div className={styles.avatarContainer}>
      <img
        src={avatarfull}
        className={styles.avatar}
        style={{
          border: `5px solid ${borderColor}`,
        }}
      />
      {personaname && <span className={styles.personaname}>{personaname}</span>}
    </div>
  );
};

export default SteamUserAvatar;
