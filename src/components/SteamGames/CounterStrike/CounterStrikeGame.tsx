import { ICS2 } from "../../../interfaces/ISteamWorks";
import StatsItem from "../../Stats/StatsItem/StatsItem";
import styles from "./counter-strike-game.module.css";

const CounterStrikeGame: React.FC<ICS2> = (props) => {
  const { appid, name, playtime_forever, img_icon_url, stats } = props;
  return (
    <div className={styles.container}>
      <div className={styles.cs2}>
        <img src={img_icon_url} />
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.stats}>
        <StatsItem
          info={[
            {
              title: "Wins",
              value: stats !== null ? stats.total_wins : -1,
            },
          ]}
        />
        <StatsItem
          info={[
            {
              title: "Headshots",
              value: stats !== null ? stats.total_kills_headshot : -1,
            },
          ]}
        />
        <StatsItem
          info={[
            {
              title: "Kills",
              value: stats !== null ? stats.total_kills : -1,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CounterStrikeGame;
