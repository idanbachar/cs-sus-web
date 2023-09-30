import { IInventory, IInventoryItem } from "./IInventory";
import {
  ICS2,
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
  cs2: ICS2 | null;
  inventory: IInventoryItem[] | null;
  totalBadges: number;
  steamLevel: number;
  csgoStats: ISteamStatsDictionary | null;
  total_games: number;
  cheater_percentage: number;
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

export interface ITrackingListItem {
  id: string;
  profileurl: string;
}

export interface ILoggedInUser {
  username: string;
  id: string;
  avatar: string;
  profileurl: string;
  trackingList?: ITrackingListItem[];
}
