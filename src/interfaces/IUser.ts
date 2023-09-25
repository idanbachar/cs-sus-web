import {
  ISteamFriend,
  ISteamGame,
  ISteamPlayer,
  ISteamPlayerBans,
  ISteamUserInventory,
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
}

export interface ISteamUserAvatar {
  avatars: {
    avatar: string;
    avatarfull: string;
    avatarmedium: string;
  };
  size: "avatar" | "avatarfull" | "avatarmedium";
  personaname?: string;
  borderColor?: "red" | "green";
  cssStyles?: React.CSSProperties;
}
