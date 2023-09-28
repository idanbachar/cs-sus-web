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
        <ul className={styles.settings}>
          <li>Profile</li>
          <li>My Reports</li>
          <li onClick={onLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
};
export default LoggedInUser;
