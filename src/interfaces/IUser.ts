import {
  ISteamGame,
  ISteamPlayer,
  ISteamPlayerBans,
  ISteamStatsDictionary,
} from "./ISteamWorks";

export interface IUser {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarfull: string;
  avatarmedium: string;
  realname: string;
  timecreated: Date;
  loccountrycode: string | null;
  country_image: string | null;
  friends: ISteamPlayer[] | null;
  vacBans: ISteamPlayerBans | null;
  games: ISteamGame[] | null;
  inventory: any | null;
  totalBadges: number;
  steamLevel: number;
  csgoStats: ISteamStatsDictionary | null;
}

export interface ISteamUserAvatar {
  avatars: {
    avatar: string;
    avatarfull: string;
    avatarmedium: string;
  };
  size: "avatar" | "avatarfull" | "avatarmedium";
  personaname?: string;
  borderColor?: "darkred" | "green";
  cssStyles?: React.CSSProperties;
}
