import { IUser } from "../../interfaces/IUser";
import Card from "../Card/Card";
import SteamFriends from "../SteamFriends/SteamFriends";
import SteamGames from "../SteamGames/SteamGames";
import TitleDescription from "../TitleDescription/TitleDescription";
import SteamUserPreview from "./SteamUserPreview/SteamUserPreview";
import styles from "./steam-user.module.css";
import moment from "moment";

const SteamUser: React.FC<IUser> = (props) => {
  const {
    steamid,
    personaname,
    profileurl,
    avatar,
    avatarfull,
    avatarmedium,
    realname,
    timecreated,
    loccountrycode,
    country_image,
    friends,
    vacBans,
    games,
    inventory,
    steamLevel,
  } = props;

  const years_of_service = moment().diff(moment(timecreated), "years");
  return (
    <div className={styles.container}>
      <Card
        cssStyles={{
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "70rem",
        }}
      >
        <SteamUserPreview {...props} />
        <div className={styles.stats}>
          {friends && (
            <TitleDescription
              title={"Friends"}
              description={friends.length.toString()}
              isSus={friends.length < 7}
            />
          )}
          {vacBans && (
            <TitleDescription
              title={"Bans"}
              description={(
                vacBans.NumberOfVACBans + vacBans.NumberOfGameBans
              ).toString()}
              isSus={
                vacBans.VACBanned ||
                vacBans.NumberOfGameBans > 0 ||
                vacBans.NumberOfVACBans > 0
              }
            />
          )}
          {steamLevel && (
            <TitleDescription
              title={"Level"}
              description={steamLevel.toString()}
              isSus={steamLevel < 5}
            />
          )}
          {timecreated && (
            <TitleDescription
              title={"Years"}
              description={years_of_service.toString()}
              isSus={years_of_service <= 3}
            />
          )}
        </div>
      </Card>
      {games && (
        <>
          <TitleDescription
            title="Games"
            description={games.length.toString()}
            cssStyles={{ justifySelf: "start", gap: "1rem", display: "flex" }}
          />
          <Card
            cssStyles={{
              width: "100%",
              maxWidth: "70rem",
            }}
          >
            {games && <SteamGames games={games} />}
          </Card>
        </>
      )}
      {friends && (
        <>
          <TitleDescription
            title="Friends"
            description={friends.length.toString()}
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
