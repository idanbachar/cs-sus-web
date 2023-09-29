import { ICounterStrikeStats } from "../../../interfaces/IStats";
import StatsItem from "../StatsItem/StatsItem";

const CounterStrikeStats: React.FC<ICounterStrikeStats> = (props) => {
  const { csgoStats, steamLevel } = props;
  return (
    <>
      <StatsItem
        info={[
          {
            title: "Kills",
            value:
              csgoStats !== undefined && csgoStats !== null
                ? csgoStats["total_kills"]
                : -1,
          },
        ]}
        isSus={
          csgoStats !== undefined && csgoStats !== null
            ? Math.round(
                (csgoStats["total_kills_headshot"] / csgoStats["total_kills"]) *
                  100
              ) > 60 &&
              steamLevel !== undefined &&
              steamLevel !== null &&
              steamLevel <= 4
            : true
        }
      />
      <StatsItem
        info={[
          {
            title: "Wins",
            value:
              csgoStats !== undefined && csgoStats !== null
                ? csgoStats["total_wins"]
                : -1,
          },
        ]}
        isSus={csgoStats !== undefined && csgoStats !== null ? false : true}
      />
      <StatsItem
        info={[
          {
            title: "Headshots",
            value:
              csgoStats !== undefined && csgoStats !== null
                ? csgoStats["total_kills_headshot"]
                : -1,
          },
        ]}
        isSus={
          csgoStats !== undefined && csgoStats !== null
            ? Math.round(
                (csgoStats["total_kills_headshot"] / csgoStats["total_kills"]) *
                  100
              ) > 60 &&
              steamLevel !== undefined &&
              steamLevel !== null &&
              steamLevel <= 4
            : true
        }
      />
    </>
  );
};

export default CounterStrikeStats;
