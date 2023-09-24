import {
  ISteamFriend,
  ISteamGame,
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
  friends: ISteamFriend[] | null;
  vacBans: ISteamPlayerBans | null;
  games: ISteamGame[] | null;
  inventory: any | null;
}

export interface ISteamUserAvatar {
  avatarfull: string;
  personaname?: string;
  borderColor: "red" | "green";
}
