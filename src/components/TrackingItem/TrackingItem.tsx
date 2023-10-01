import { Link } from "react-router-dom";
import { ISteamPlayer } from "../../interfaces/ISteamWorks";
import styles from "./tracking-item.module.css";

const TrackingItem: React.FC<
  ISteamPlayer & { onStopTracking: (steamid: string) => void }
> = (props) => {
  const {
    avatarfull,
    personaname,
    profileurl,
    vacBans,
    steamid,
    onStopTracking,
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.player}>
        <img src={avatarfull} width={"100"} />
        <Link to={`/search?steamUrl=${profileurl}`}>
          <span>{personaname}</span>
        </Link>
      </div>
      <div>
        <span
          className={styles.vacStatus}
          style={{
            border: vacBans.VACBanned ? `1px solid red` : "",
            backgroundColor: vacBans.VACBanned ? `darkred` : "",
          }}
        >
          {vacBans.VACBanned && "Vac Banned"}
        </span>
        <button
          disabled={vacBans.VACBanned}
          className={styles.report}
          style={{
            cursor: !vacBans.VACBanned ? "pointer" : "default",
            backgroundColor: !vacBans.VACBanned ? "" : "#581919b5",
          }}
          onClick={() => onStopTracking(steamid)}
        >
          Stop tracking
        </button>
      </div>
    </div>
  );
};
export default TrackingItem;
