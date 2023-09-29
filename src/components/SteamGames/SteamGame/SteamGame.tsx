import { ISteamGame } from "../../../interfaces/ISteamWorks";
import StatsItem from "../../Stats/StatsItem/StatsItem";

const SteamGame: React.FC<ISteamGame> = (props) => {
  const { appid, img_icon_url, playtime_forever, name } = props;

  return (
    <>
      <span>{name}</span>
      <img src={img_icon_url} />
      {/* <StatsItem
        info={[
          {
            title: "",
            value: playtime_forever,
          },
        ]}
        textAfterValue={"hrs"}
        cssStyles={{
          background: "none",
          color: "#7281c5",
        }}
        isSus={
          appid === 730 ? (playtime_forever < 600 ? true : false) : undefined
        }
      /> */}
    </>
  );
};

export default SteamGame;
