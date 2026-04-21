import { calculateCheaterScore } from "@/lib/scoring/cheater-score";
import {
  ICS2InventorySignal,
  ICS2Game,
  ISteamGame,
  ISteamPlayer,
  ISteamPlayerBans,
  ISteamUserStatsForGame,
  IUserResult,
} from "@/lib/types/steam";

const getPlaytimeInHours = (playtimeInMinutes: number) =>
  Math.round(playtimeInMinutes / 60);

const getCounterStrikeStats = (stats: ISteamUserStatsForGame | null) => {
  if (!stats?.stats) return null;

  const statMap = stats.stats.reduce<Record<string, number>>((acc, stat) => {
    acc[stat.name] = stat.value;
    return acc;
  }, {});

  const totalKills = statMap["total_kills"] ?? 0;
  const totalKillsHeadshot = statMap["total_kills_headshot"] ?? 0;

  return {
    total_wins: statMap["total_wins"] ?? 0,
    total_kills_headshot: totalKillsHeadshot,
    headshot_percentage:
      totalKills > 0 ? Math.round((totalKillsHeadshot / totalKills) * 100) : 0,
    total_kills: totalKills,
  };
};

const getCounterStrikeGame = (
  ownedGames: ISteamGame[] | null,
  cs2Stats: ISteamUserStatsForGame | null,
  cs2Inventory: ICS2InventorySignal | null
): ICS2Game | null => {
  const cs2 = ownedGames?.find((game) => game.appid === 730) ?? null;

  if (!cs2) {
    if (!cs2Inventory) return null;

    return {
      appid: 730,
      name: "Counter-Strike 2",
      playtime_forever: 0,
      img_icon_url: "https://steamcdn-a.akamaihd.net/steam/apps/730/capsule_231x87.jpg",
      stats: getCounterStrikeStats(cs2Stats),
      inventory: cs2Inventory,
    };
  }

  return {
    appid: cs2.appid,
    name: cs2.name,
    playtime_forever: getPlaytimeInHours(cs2.playtime_forever),
    img_icon_url: `https://steamcdn-a.akamaihd.net/steam/apps/${cs2.appid}/capsule_231x87.jpg`,
    stats: getCounterStrikeStats(cs2Stats),
    inventory: cs2Inventory,
  };
};

interface BuildUserResultParams {
  playerData: ISteamPlayer;
  friendsList: ISteamPlayer[] | null;
  playerBans: ISteamPlayerBans | null;
  ownedGames: ISteamGame[] | null;
  steamLevel: number | null;
  totalBadges: number | null;
  cs2Stats: ISteamUserStatsForGame | null;
  cs2Inventory: ICS2InventorySignal | null;
}

export const buildUserResult = ({
  playerData,
  friendsList,
  playerBans,
  ownedGames,
  steamLevel,
  totalBadges,
  cs2Stats,
  cs2Inventory,
}: BuildUserResultParams): IUserResult => {
  const cs2 = getCounterStrikeGame(ownedGames, cs2Stats, cs2Inventory);

  const baseUser: Omit<IUserResult, "cheater_percentage" | "score_reasons"> = {
    steamid: playerData.steamid,
    personaname: playerData.personaname,
    profileurl: playerData.profileurl,
    avatar: playerData.avatar,
    avatarfull: playerData.avatarfull,
    avatarmedium: playerData.avatarmedium,
    realname: playerData.realname ?? null,
    profile_visibility_state: playerData.communityvisibilitystate ?? 1,
    is_profile_private: (playerData.communityvisibilitystate ?? 1) < 3,
    loccountrycode: playerData.loccountrycode ?? null,
    country_image: playerData.loccountrycode
      ? `https://flagcdn.com/48x36/${playerData.loccountrycode.toLowerCase()}.png`
      : null,
    timecreated: new Date((playerData.timecreated ?? 0) * 1000).toISOString(),
    friends: friendsList,
    vacBans: playerBans,
    games: ownedGames ? [...ownedGames].sort((a, b) => b.playtime_forever - a.playtime_forever) : null,
    cs2,
    totalBadges,
    steamLevel,
    total_games: ownedGames ? ownedGames.length : null,
  };

  const scoreResult = calculateCheaterScore(baseUser);

  return {
    ...baseUser,
    cheater_percentage: scoreResult.score,
    score_reasons: scoreResult.reasons,
  };
};
