import {
  ISteamGame,
  ISteamPlayer,
  ISteamPlayerBans,
  ISteamStatsDictionary,
} from "./ISteamWorks";

export interface IStats {
  friends: ISteamPlayer[] | null;
  vacBans: ISteamPlayerBans | null;
  total_games: number | null;
  timecreated: number | null;
  steamLevel: number | null;
  csgoStats: ISteamStatsDictionary | null;
}
