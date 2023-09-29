import { IStats } from "../../interfaces/IStats";
import StatsItem from "./StatsItem/StatsItem";
import styles from "./stats.module.css";

const Stats: React.FC<IStats> = (props) => {
  const {
    friends,
    vacBans,
    total_games,
    timecreated,
    steamLevel,
    totalBadges,
  } = props;

  return (
    <div className={styles.stats}>
      <StatsItem
        info={[
          {
            title: "Bans",
            value:
              vacBans !== undefined && vacBans !== null
                ? vacBans.NumberOfVACBans + vacBans.NumberOfGameBans
                : -1,
          },
        ]}
        isSus={
          vacBans !== undefined && vacBans !== null
            ? vacBans.VACBanned ||
              vacBans.NumberOfGameBans > 0 ||
              vacBans.NumberOfVACBans > 0
            : true
        }
      />
      <StatsItem
        info={[
          {
            title: "Friends",
            value:
              friends !== undefined && friends !== null ? friends.length : -1,
          },
        ]}
        isSus={
          friends !== undefined && friends !== null ? friends.length < 7 : true
        }
      />
      <StatsItem
        info={[
          {
            title: "Level",
            value:
              steamLevel !== undefined && steamLevel !== null ? steamLevel : -1,
          },
        ]}
        isSus={
          steamLevel !== undefined && steamLevel !== null
            ? steamLevel < 5
            : true
        }
      />

      <StatsItem
        info={[
          {
            title: "Years",
            value:
              timecreated !== undefined && timecreated !== null
                ? timecreated
                : -1,
          },
        ]}
        isSus={
          timecreated !== undefined && timecreated !== null
            ? timecreated <= 3
            : true
        }
      />

      <StatsItem
        info={[
          {
            title: "Games",
            value:
              total_games !== undefined && total_games !== null
                ? total_games
                : -1,
          },
        ]}
        isSus={
          total_games !== undefined && total_games !== null
            ? total_games <= 3
            : true
        }
      />

      <StatsItem
        info={[
          {
            title: "Badges",
            value:
              totalBadges !== undefined && totalBadges !== null
                ? totalBadges
                : -1,
          },
        ]}
        isSus={
          totalBadges !== undefined && totalBadges !== null
            ? totalBadges <= 3
            : true
        }
      />
    </div>
  );
};

export default Stats;
