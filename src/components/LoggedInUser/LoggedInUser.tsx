import { Link } from "react-router-dom";
import { ILoggedInUser } from "../../interfaces/IUser";
import styles from "./logged-in-user.module.css";

const LoggedInUser: React.FC<ILoggedInUser & { onLogout: () => void }> = (
  props
) => {
  const { username, avatar, profileurl, onLogout, trackingList } = props;

  const links = [
    { text: "Profile", route: `/search?steamUrl=${profileurl}` },
    {
      text: `Tracking list (${trackingList ? trackingList.length : 0})`,
      route: "/myTrackingList",
    },
    { text: "Logout", route: "", function: onLogout },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.loggedInUser}>
        <img src={avatar} width={30} className={styles.avatar} />
        <span>{username}</span>
        <ul className={styles.settings}>
          {links.map((link, key) => (
            <li
              key={key}
              onClick={() => !link.route && link.function && link.function()}
            >
              {link.route ? (
                <Link to={link.route}>{link.text}</Link>
              ) : (
                link.text
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default LoggedInUser;
