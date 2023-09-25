import { ISteamGame } from "../../../interfaces/ISteamWorks";
import TitleDescription from "../../TitleDescription/TitleDescription";

const SteamGame: React.FC<ISteamGame> = (props) => {
  const { appid, img_icon_url, playtime_forever } = props;

  return (
    <div>
      <img src={img_icon_url} />
      <TitleDescription
        title={""}
        description={`${playtime_forever} hrs`}
        cssStyles={{
          background: "none",
          color: "#7281c5",
        }}
        isSus={playtime_forever < 600 && appid === 730 ? true : undefined}
      />
    </div>
  );
};

export default SteamGame;
