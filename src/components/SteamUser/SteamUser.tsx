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
import CounterStrikeGame from "../SteamGames/CounterStrike/CounterStrikeGame";

const SteamUser: React.FC<IUser> = (props) => {
  const {
    steamid,
    timecreated,
    friends,
    vacBans,
    games,
    inventory,
    steamLevel,
    total_games,
    totalBadges,
    cs2,
    cheater_percentage,
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
          padding: "1rem",
        }}
      >
        <SteamUserPreview {...props} />
        <Stats
          total_games={total_games}
          friends={friends}
          vacBans={vacBans}
          timecreated={years_of_service}
          steamLevel={steamLevel}
          totalBadges={totalBadges}
        />
      </Card>
      {inventory && (
        <>
          <StatsItem
            title={"Inventory"}
            value={inventory.length}
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
      <>
        <Card
          cssStyles={{
            width: "100%",
            maxWidth: "70rem",
            justifyContent: "space-evenly",
          }}
        >
          <>
            {cs2 && (
              <CounterStrikeGame
                {...cs2}
                cheater_percentage={cheater_percentage}
              />
            )}
            <div>
              {cheater_percentage < 10 ? (
                <h1 style={{ color: "Gold" }}>
                  {100 - cheater_percentage}% Legit
                </h1>
              ) : cheater_percentage < 40 && cheater_percentage >= 10 ? (
                <h1 style={{ color: "Green" }}>
                  {100 - cheater_percentage}% Not Cheater
                </h1>
              ) : cheater_percentage >= 40 && cheater_percentage < 70 ? (
                <h1 style={{ color: "#ff4700" }}>
                  {cheater_percentage}% Suspicius
                </h1>
              ) : (
                <h1 style={{ color: "Red" }}>{cheater_percentage}% Cheater</h1>
              )}

              <span>Report</span>
            </div>
          </>
        </Card>
      </>
      {friends && (
        <>
          <StatsItem
            title={"Friends"}
            value={friends.length}
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
