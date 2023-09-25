import { ISteamGame } from "../../../interfaces/ISteamWorks";
import StatsItem from "../../Stats/StatsItem/StatsItem";

const SteamGame: React.FC<ISteamGame> = (props) => {
  const { appid, img_icon_url, playtime_forever } = props;

  return (
    <div>
      <img src={img_icon_url} />
      <StatsItem
        title={""}
        value={playtime_forever}
        textAfterValue={"hrs"}
        cssStyles={{
          background: "none",
          color: "#7281c5",
        }}
        isSus={
          appid === 730 ? (playtime_forever < 600 ? true : false) : undefined
        }
      />
    </div>
  );
};

export default SteamGame;
