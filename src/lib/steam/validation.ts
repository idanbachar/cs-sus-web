import axios from "axios";
import { z } from "zod";

export const steamUrlRegex =
  /^https:\/\/steamcommunity\.com\/(id\/[a-zA-Z0-9_-]+|profiles\/[0-9]{17})\/?$/;

export const steamUrlSchema = z
  .string()
  .url()
  .refine((value) => steamUrlRegex.test(value), {
    message:
      "Steam URL must match https://steamcommunity.com/id/<name> or /profiles/<steamid64>",
  });

const extractRegex =
  /^https:\/\/steamcommunity\.com\/(id\/([a-zA-Z0-9_-]+)|profiles\/([0-9]{17}))\/?$/;

const resolveVanityUrl = async (
  vanityName: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const endpoint = `${steamBaseUrl}/ISteamUser/ResolveVanityURL/v0001/?key=${steamApiKey}&vanityurl=${vanityName}`;
  const response = await axios.get(endpoint, { timeout: 12000 });
  return response.data?.response?.success === 1
    ? (response.data.response.steamid as string)
    : null;
};

export const getSteamIdFromUrl = async (
  steamUrl: string,
  steamBaseUrl: string,
  steamApiKey: string
) => {
  const match = steamUrl.match(extractRegex);
  if (!match) return null;

  const vanityName = match[2] ?? null;
  const directSteamId = match[3] ?? null;

  if (directSteamId) return directSteamId;
  if (!vanityName) return null;

  return resolveVanityUrl(vanityName, steamBaseUrl, steamApiKey);
};
