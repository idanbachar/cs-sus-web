import {
  ISteamGame,
  ISteamPlayer,
  ISteamPlayerBans,
  ISteamStatsDictionary,
} from "./ISteamWorks";

export interface IStats {
  friends: ISteamPlayer[] | null;
  total_games: number | null;
  timecreated: number | null;
  vacBans: ISteamPlayerBans | null;
  steamLevel: number | null;
}

export interface ICounterStrikeStats {
  vacBans: ISteamPlayerBans | null;
  steamLevel: number | null;
  csgoStats: ISteamStatsDictionary | null;
}
