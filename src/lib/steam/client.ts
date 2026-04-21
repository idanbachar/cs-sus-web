import axios from "axios";
import {
  ICS2InventorySignal,
  ISteamFriend,
  ISteamGame,
  ISteamPlayer,
  ISteamPlayerBans,
  ISteamUserStatsForGame,
} from "@/lib/types/steam";

const requester = axios.create({
  timeout: 14000,
});

export const getPlayerData = async (
  steamId: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const endpoint = `${steamBaseUrl}/ISteamUser/GetPlayerSummaries/v2/?key=${steamApiKey}&steamids=${steamId}`;
  const response = await requester.get(endpoint);
  const players = (response.data?.response?.players ?? []) as ISteamPlayer[];
  return players[0] ?? null;
};

export const getPlayersData = async (
  steamIds: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const endpoint = `${steamBaseUrl}/ISteamUser/GetPlayerSummaries/v2/?key=${steamApiKey}&steamids=${steamIds}`;
  const response = await requester.get(endpoint);
  return (response.data?.response?.players ?? []) as ISteamPlayer[];
};

export const getFriendsList = async (
  steamId: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const endpoint = `${steamBaseUrl}/ISteamUser/GetFriendList/v0001/?key=${steamApiKey}&steamid=${steamId}&relationship=friend`;

  try {
    const response = await requester.get(endpoint);
    const friends = (response.data?.friendslist?.friends ?? []) as ISteamFriend[];

    if (!friends.length) return [];

    const friendIds = friends.map((friend) => friend.steamid).join(",");
    return await getPlayersData(friendIds, steamBaseUrl, steamApiKey);
  } catch {
    return null;
  }
};

export const getPlayerBans = async (
  steamId: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const endpoint = `${steamBaseUrl}/ISteamUser/GetPlayerBans/v1/?key=${steamApiKey}&steamids=${steamId}`;

  try {
    const response = await requester.get(endpoint);
    return (response.data?.players?.[0] ?? null) as ISteamPlayerBans | null;
  } catch {
    return null;
  }
};

export const getOwnedGames = async (
  steamId: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const endpoint = `${steamBaseUrl}/IPlayerService/GetOwnedGames/v0001/?key=${steamApiKey}&steamid=${steamId}&include_appinfo=1`;

  try {
    const response = await requester.get(endpoint);
    return (response.data?.response?.games ?? null) as ISteamGame[] | null;
  } catch {
    return null;
  }
};

export const getStatsForCS2 = async (
  steamId: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const endpoint = `${steamBaseUrl}/ISteamUserStats/GetUserStatsForGame/v0002/?key=${steamApiKey}&appid=730&steamid=${steamId}`;

  try {
    const response = await requester.get(endpoint);
    return (response.data?.playerstats ?? null) as ISteamUserStatsForGame | null;
  } catch {
    return null;
  }
};

export const getSteamLevel = async (
  steamId: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const endpoint = `${steamBaseUrl}/IPlayerService/GetSteamLevel/v1/`;

  try {
    const response = await requester.get(endpoint, {
      params: {
        key: steamApiKey,
        steamid: steamId,
      },
    });

    return (response.data?.response?.player_level ?? null) as number | null;
  } catch {
    return null;
  }
};

export const getTotalBadges = async (
  steamId: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const endpoint = `${steamBaseUrl}/IPlayerService/GetBadges/v1/`;

  try {
    const response = await requester.get(endpoint, {
      params: {
        key: steamApiKey,
        steamid: steamId,
      },
    });

    const badges = response.data?.response?.badges;
    return Array.isArray(badges) ? badges.length : null;
  } catch {
    return null;
  }
};

const INVENTORY_RARE_KEYWORDS = [
  "knife",
  "karambit",
  "bayonet",
  "butterfly",
  "gloves",
  "m9",
  "skeleton",
  "talon",
  "dragon lore",
  "howl",
  "medusa",
  "doppler",
  "fade",
  "emerald",
  "ruby",
  "sapphire",
  "★",
];

const INVENTORY_PREMIUM_KEYWORDS = [
  "factory new",
  "stattrak",
  "souvenir",
  "crimson web",
  "case hardened",
  "gamma doppler",
  "marble fade",
];

const includesKeyword = (value: string, keywords: string[]) => {
  const normalized = value.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword));
};

interface SteamInventoryDescription {
  market_hash_name?: string;
  name?: string;
}

interface SteamInventoryResponse {
  success?: number | boolean;
  total_inventory_count?: number;
  assets?: unknown[];
  descriptions?: SteamInventoryDescription[];
}

export const getCS2InventorySignal = async (
  steamId: string
): Promise<ICS2InventorySignal | null> => {
  const endpoints = [
    `https://steamcommunity.com/inventory/${steamId}/730/2?l=english&count=2000`,
    `https://steamcommunity.com/inventory/${steamId}/730/2?l=english&count=1000`,
    `https://steamcommunity.com/inventory/${steamId}/730/2?l=english`,
  ];

  try {
    let inventory: SteamInventoryResponse | null = null;

    for (const endpoint of endpoints) {
      const response = await requester.get(endpoint, {
        validateStatus: () => true,
      });

      if (response.status === 401 || response.status === 403) {
        return {
          isPublic: false,
          totalItems: 0,
          rareItems: 0,
          premiumItems: 0,
        };
      }

      if (response.status >= 200 && response.status < 300) {
        if (typeof response.data !== "object" || response.data === null) {
          continue;
        }

        inventory = response.data as SteamInventoryResponse;
        break;
      }
    }

    if (!inventory) {
      return {
        isPublic: null,
        totalItems: 0,
        rareItems: 0,
        premiumItems: 0,
      };
    }

    const hasExplicitFailure = inventory.success === 0 || inventory.success === false;
    const hasInventoryPayload =
      Array.isArray(inventory.assets) ||
      Array.isArray(inventory.descriptions) ||
      typeof inventory.total_inventory_count === "number";

    if (hasExplicitFailure || !hasInventoryPayload) {
      return {
        isPublic: null,
        totalItems: 0,
        rareItems: 0,
        premiumItems: 0,
      };
    }

    const descriptions = inventory.descriptions ?? [];
    let rareItems = 0;
    let premiumItems = 0;

    for (const item of descriptions) {
      const label = `${item.market_hash_name ?? ""} ${item.name ?? ""}`.trim();
      if (!label) continue;

      if (includesKeyword(label, INVENTORY_RARE_KEYWORDS)) {
        rareItems += 1;
      }

      if (includesKeyword(label, INVENTORY_PREMIUM_KEYWORDS)) {
        premiumItems += 1;
      }
    }

    return {
      isPublic: true,
      totalItems: inventory.total_inventory_count ?? descriptions.length,
      rareItems,
      premiumItems,
    };
  } catch {
    return {
      isPublic: null,
      totalItems: 0,
      rareItems: 0,
      premiumItems: 0,
    };
  }
};
