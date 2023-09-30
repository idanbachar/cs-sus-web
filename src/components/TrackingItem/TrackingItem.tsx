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
          style={{
            color: "white",
            border: vacBans.VACBanned ? `1px solid red` : "",
            backgroundColor: vacBans.VACBanned ? `darkred` : "",
            borderRadius: ".2rem",
            padding: "1rem",
            boxSizing: "border-box",
          }}
        >
          {vacBans.VACBanned ? "VAC" : "No VAC"}
        </span>
        <button
          className={styles.report}
          onClick={() => onStopTracking(steamid)}
        >
          Stop tracking
        </button>
      </div>
    </div>
  );
};
export default TrackingItem;
