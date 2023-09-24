import { ISteamGame } from "../../../interfaces/ISteamWorks";

const SteamGame: React.FC<ISteamGame> = (props) => {
  const { img_icon_url, playtime_forever } = props;

  return (
    <div>
      <img src={img_icon_url} />
      <h4>{playtime_forever} hrs</h4>
    </div>
  );
};

export default SteamGame;
