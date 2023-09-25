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
  return (
    <div className={styles.container}>
      <Card
        cssStyles={{
          justifyContent: "space-evenly",
          width: "100%",
          maxWidth: "70rem",
          flexWrap: "wrap",
        }}
      >
        {friends && (
          <TitleDescription
            title={"Friends"}
            description={friends.length.toString()}
          />
        )}
        {vacBans && (
          <TitleDescription
            title={"Vac Bans"}
            description={vacBans.NumberOfVACBans.toString()}
          />
        )}
        <SteamUserPreview {...props} />
        {steamLevel && (
          <TitleDescription
            title={"Level"}
            description={steamLevel.toString()}
          />
        )}
        {timecreated && (
          <TitleDescription
            title={"Years"}
            description={moment().diff(moment(timecreated), "years").toString()}
          />
        )}
      </Card>
      {games && (
        <TitleDescription
          title="Games"
          description={games.length.toString()}
          cssStyles={{ justifySelf: "start", gap: "1rem", display: "flex" }}
        />
      )}
      <Card
        cssStyles={{
          width: "100%",
          maxWidth: "70rem",
        }}
      >
        {games && <SteamGames games={games} />}
      </Card>
      {friends && (
        <TitleDescription
          title="Friends"
          description={friends.length.toString()}
          cssStyles={{ justifySelf: "start", gap: "1rem", display: "flex" }}
        />
      )}
      <Card
        cssStyles={{
          width: "100%",
          maxWidth: "70rem",
        }}
      >
        {friends && <SteamFriends friends={friends} />}
      </Card>
    </div>
  );
};

export default SteamUser;
