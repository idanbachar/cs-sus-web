import { IStats } from "../../interfaces/IStats";
import StatsItem from "./StatsItem/StatsItem";
import styles from "./stats.module.css";

const Stats: React.FC<IStats> = (props) => {
  const { friends, vacBans, games, timecreated, steamLevel, csgoStats } = props;

  return (
    <div className={styles.stats}>
      <StatsItem
        title={"Friends"}
        value={friends !== undefined && friends !== null ? friends.length : -1}
        isSus={
          friends !== undefined && friends !== null ? friends.length < 7 : true
        }
      />

      <StatsItem
        title={"Bans"}
        value={
          vacBans !== undefined && vacBans !== null
            ? vacBans.NumberOfVACBans + vacBans.NumberOfGameBans
            : -1
        }
        isSus={
          vacBans !== undefined && vacBans !== null
            ? vacBans.VACBanned ||
              vacBans.NumberOfGameBans > 0 ||
              vacBans.NumberOfVACBans > 0
            : true
        }
      />

      <StatsItem
        title={"Level"}
        value={
          steamLevel !== undefined && steamLevel !== null ? steamLevel : -1
        }
        isSus={
          steamLevel !== undefined && steamLevel !== null
            ? steamLevel < 5
            : true
        }
      />

      <StatsItem
        title={"Years"}
        value={
          timecreated !== undefined && timecreated !== null ? timecreated : -1
        }
        isSus={
          timecreated !== undefined && timecreated !== null
            ? timecreated <= 3
            : true
        }
      />

      <StatsItem
        title={"Games"}
        value={games !== undefined && games !== null ? games.length : -1}
        isSus={games !== undefined && games !== null ? games.length <= 3 : true}
      />

      <>
        <StatsItem
          title={"Kills"}
          value={
            csgoStats !== undefined && csgoStats !== null
              ? csgoStats["total_kills"]
              : -1
          }
          isSus={
            csgoStats !== undefined && csgoStats !== null
              ? Math.round(
                  (csgoStats["total_kills_headshot"] /
                    csgoStats["total_kills"]) *
                    100
                ) > 60 &&
                steamLevel !== undefined &&
                steamLevel !== null &&
                steamLevel <= 4
              : true
          }
        />
        <StatsItem
          title={"Wins"}
          value={
            csgoStats !== undefined && csgoStats !== null
              ? csgoStats["total_wins"]
              : -1
          }
          isSus={csgoStats !== undefined && csgoStats !== null ? false : true}
        />
        <StatsItem
          title={"Headshots"}
          value={
            csgoStats !== undefined && csgoStats !== null
              ? csgoStats["total_kills_headshot"]
              : -1
          }
          isSus={
            csgoStats !== undefined && csgoStats !== null
              ? Math.round(
                  (csgoStats["total_kills_headshot"] /
                    csgoStats["total_kills"]) *
                    100
                ) > 60 &&
                steamLevel !== undefined &&
                steamLevel !== null &&
                steamLevel <= 4
              : true
          }
        />
      </>
    </div>
  );
};

export default Stats;
