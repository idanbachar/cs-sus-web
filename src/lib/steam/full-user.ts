import {
  getCS2InventorySignal,
  getFriendsList,
  getOwnedGames,
  getPlayerBans,
  getPlayerData,
  getStatsForCS2,
  getSteamLevel,
  getTotalBadges,
} from "@/lib/steam/client";
import { buildUserResult } from "@/lib/steam/mapper";

export const getFullUserData = async (
  steamId: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const [
    playerData,
    friendsList,
    playerBans,
    ownedGames,
    steamLevel,
    totalBadges,
    cs2Stats,
    cs2Inventory,
  ] = await Promise.all([
    getPlayerData(steamId, steamBaseUrl, steamApiKey),
    getFriendsList(steamId, steamBaseUrl, steamApiKey),
    getPlayerBans(steamId, steamBaseUrl, steamApiKey),
    getOwnedGames(steamId, steamBaseUrl, steamApiKey),
    getSteamLevel(steamId, steamBaseUrl, steamApiKey),
    getTotalBadges(steamId, steamBaseUrl, steamApiKey),
    getStatsForCS2(steamId, steamBaseUrl, steamApiKey),
    getCS2InventorySignal(steamId),
  ]);

  if (!playerData) {
    return null;
  }

  return buildUserResult({
    playerData,
    friendsList,
    playerBans,
    ownedGames,
    steamLevel,
    totalBadges,
    cs2Stats,
    cs2Inventory,
  });
};
