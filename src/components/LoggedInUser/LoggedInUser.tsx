import { ILoggedInUser } from "../../interfaces/IUser";
import styles from "./logged-in-user.module.css";

const LoggedInUser: React.FC<ILoggedInUser & { onLogout: () => void }> = (
  props
) => {
  const { username, avatar, onLogout } = props;

  return (
    <div className={styles.container}>
      <div className={styles.loggedInUser}>
        <img src={avatar} width={30} className={styles.avatar} />
        <span>{username}</span>
        <button className={styles.logout} onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default LoggedInUser;
