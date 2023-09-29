import { IUser } from "../../interfaces/IUser";
import Card from "../Card/Card";
import Stats from "../Stats/Stats";
import SteamFriends from "../SteamFriends/SteamFriends";
import SteamGames from "../SteamGames/SteamGames";
import StatsItem from "../Stats/StatsItem/StatsItem";
import SteamUserPreview from "./SteamUserPreview/SteamUserPreview";
import styles from "./steam-user.module.css";
import moment from "moment";
import Inventory from "../Inventory/Inventory";
import SteamGame from "../SteamGames/SteamGame/SteamGame";
import CounterStrikeStats from "../Stats/CounterStrikeStats/CounterStrikeStats";

const SteamUser: React.FC<IUser> = (props) => {
  const {
    steamid,
    timecreated,
    friends,
    vacBans,
    games,
    inventory,
    steamLevel,
    csgoStats,
    total_games,
    cs2,
  } = props;

  const years_of_service =
    timecreated !== null && timecreated !== undefined
      ? moment().diff(moment(timecreated), "years")
      : -1;
  return (
    <div className={styles.container} id={steamid}>
      <Card
        cssStyles={{
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "70rem",
        }}
      >
        <SteamUserPreview {...props} />
        <Stats
          total_games={total_games}
          friends={friends}
          vacBans={vacBans}
          timecreated={years_of_service}
          steamLevel={steamLevel}
        />
      </Card>
      {inventory && (
        <>
          <StatsItem
            info={[
              {
                title: "Inventory",
                value: inventory.length,
              },
            ]}
            cssStyles={{ justifySelf: "start", gap: "1rem", display: "flex" }}
          />
          <Card
            cssStyles={{
              width: "100%",
              maxWidth: "70rem",
            }}
          >
            <Inventory items={inventory} />
          </Card>
        </>
      )}
      {games && cs2 && (
        <>
          <StatsItem
            info={[
              {
                title: "Play time",
                value: cs2.playtime_forever || 0,
              },
              {
                title: "Kills",
                value:
                  csgoStats !== undefined && csgoStats !== null
                    ? csgoStats["total_kills"]
                    : -1,
              },
              {
                title: "Wins",
                value:
                  csgoStats !== undefined && csgoStats !== null
                    ? csgoStats["total_wins"]
                    : -1,
              },
              {
                title: "Headshots",
                value:
                  csgoStats !== undefined && csgoStats !== null
                    ? csgoStats["total_kills_headshot"]
                    : -1,
              },
            ]}
            cssStyles={{
              gap: "1rem",
              display: "flex",
            }}
          />
          <Card
            cssStyles={{
              width: "100%",
              maxWidth: "70rem",
              justifyContent: "space-evenly",
            }}
          >
            <SteamGame {...cs2} />
            <CounterStrikeStats {...{ csgoStats, steamLevel, vacBans }} />
          </Card>
        </>
      )}
      {friends && (
        <>
          <StatsItem
            info={[
              {
                title: "Friends",
                value: friends.length,
              },
            ]}
            cssStyles={{ justifySelf: "start", gap: "1rem", display: "flex" }}
          />
          <Card
            cssStyles={{
              width: "100%",
              maxWidth: "70rem",
            }}
          >
            <SteamFriends friends={friends} />
          </Card>
        </>
      )}
    </div>
  );
};

export default SteamUser;
