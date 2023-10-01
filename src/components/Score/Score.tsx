import { useSelector } from "react-redux";
import { IScore } from "../../interfaces/IScore";
import styles from "./score.module.css";
import { RootState } from "../../redux/store";

const Score: React.FC<IScore> = (props) => {
  const {
    cheater_percentage,
    steamid,
    profileurl,
    onTrackingClick,
    isTracking,
    vacBans,
  } = props;
  const loggedInUser = useSelector(
    (state: RootState) => state.loggedInUser.user
  );
  return (
    <div>
      {cheater_percentage < 10 ? (
        <h1 style={{ color: "Gold" }}>{100 - cheater_percentage}% Legit</h1>
      ) : cheater_percentage < 40 && cheater_percentage >= 10 ? (
        <h1 style={{ color: "Green" }}>
          {100 - cheater_percentage}% Not Cheater
        </h1>
      ) : cheater_percentage >= 40 && cheater_percentage < 70 ? (
        <h1 style={{ color: "#ff4700" }}>{cheater_percentage}% Suspicious</h1>
      ) : (
        <h1 style={{ color: "Red" }}>{cheater_percentage}% Cheater</h1>
      )}
      {vacBans &&
        !vacBans.VACBanned &&
        (loggedInUser ? (
          loggedInUser.id !== steamid ? (
            <button
              className={styles.report}
              onClick={() => onTrackingClick(steamid, profileurl, isTracking)}
            >
              {!isTracking ? "Add to tracking list" : "Stop tracking"}
            </button>
          ) : null
        ) : (
          <span style={{ color: "white" }}>Login to track</span>
        ))}
    </div>
  );
};

export default Score;
