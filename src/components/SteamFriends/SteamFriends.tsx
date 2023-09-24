import { ISteamFriends } from "../../interfaces/ISteamWorks";
import SteamFriend from "./SteamFriend/SteamFriend";
import styles from "./steam-friends.module.css";

const SteamFriends: React.FC<ISteamFriends> = (props) => {
  const { friends } = props;

  return (
    <div className={styles.friends}>
      {friends.map((friend, index) => (
        <SteamFriend {...friend} key={index} />
      ))}
    </div>
  );
};

export default SteamFriends;
