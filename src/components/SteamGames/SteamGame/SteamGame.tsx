import { ICS2, ISteamGame } from "../../../interfaces/ISteamWorks";
import StatsItem from "../../Stats/StatsItem/StatsItem";

const SteamGame: React.FC<ICS2> = (props) => {
  const { appid, img_icon_url, playtime_forever, name } = props;

  return (
    <>
      <span>{name}</span>
      <img src={img_icon_url} />
    </>
  );
};

export default SteamGame;
