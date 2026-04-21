import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

const normalizeSteamBaseUrl = (value: string | undefined) => {
  if (!value) return value;

  if (value.includes("partner.steam-api.com")) {
    return "https://api.steampowered.com";
  }

  return value;
};

const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());
const optionalString = z.preprocess(emptyToUndefined, z.string().optional());

const serverEnvSchema = z.object({
  STEAM_SECRET: optionalString,
  STEAM_API_KEY: optionalString,
  STEAM_BASE_URL: optionalUrl,
  NEXTAUTH_SECRET: optionalString,
  NEXTAUTH_URL: optionalUrl,
  SUPABASE_URL: optionalUrl,
  SUPABASE_SERVICE_ROLE_KEY: optionalString,
  NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: optionalString,
});

export const getServerEnv = () => {
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid server env: ${parsed.error.issues
        .map((issue) => issue.message)
        .join(", ")}`
    );
  }

  return parsed.data;
};

export const getSteamEnvOrThrow = () => {
  const env = getServerEnv();
  if (!env.STEAM_API_KEY) {
    throw new Error("STEAM_API_KEY is required for Steam API routes");
  }

  return {
    steamApiKey: env.STEAM_API_KEY,
    steamBaseUrl: normalizeSteamBaseUrl(env.STEAM_BASE_URL) ?? "https://api.steampowered.com",
  };
};
