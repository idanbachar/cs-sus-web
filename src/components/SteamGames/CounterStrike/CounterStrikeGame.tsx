import { ICS2 } from "../../../interfaces/ISteamWorks";
import StatsItem from "../../Stats/StatsItem/StatsItem";
import styles from "./counter-strike-game.module.css";

const CounterStrikeGame: React.FC<ICS2 & { cheater_percentage: number }> = (
  props
) => {
  const {
    appid,
    name,
    playtime_forever,
    img_icon_url,
    stats,
    cheater_percentage,
  } = props;
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: cheater_percentage > 70 ? "#660000" : "green",
      }}
    >
      <div className={styles.cs2}>
        <img src={img_icon_url} />
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.stats}>
        <StatsItem
          title={"Playtime"}
          value={playtime_forever !== null ? playtime_forever : -1}
          textAfterValue="hrs"
          isSus={playtime_forever < 600}
        />
        <StatsItem
          title={"Wins"}
          value={stats !== null ? stats.total_wins : -1}
        />
        <StatsItem
          title={"Headshots"}
          value={stats !== null ? stats.total_kills_headshot : -1}
        />
        <StatsItem
          title={"Kills"}
          value={stats !== null ? stats.total_kills : -1}
        />
      </div>
    </div>
  );
};

export default CounterStrikeGame;
