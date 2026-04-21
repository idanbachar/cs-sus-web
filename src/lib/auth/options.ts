import type { NextAuthOptions } from "next-auth";
import type { NextRequest } from "next/server";
import Steam from "next-auth-steam";
import { getServerEnv } from "@/lib/config/env";

const asNonEmpty = (value: string | undefined) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.steamId = user.id;
      }

      if (account?.provider === "steam" && typeof token.sub === "string") {
        token.steamId = token.sub;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.steamId = (token.steamId as string | undefined) ?? "";
        session.user.profileUrl =
          (token.profileUrl as string | undefined) ?? undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  // Keep auth session endpoints stable in local dev even if NEXTAUTH_SECRET is not configured yet.
  secret:
    asNonEmpty(process.env.NEXTAUTH_SECRET) ??
    "dev-insecure-nextauth-secret-change-me",
};

export const buildSteamProvider = (req: NextRequest) => {
  const env = getServerEnv();
  const steamSecret = asNonEmpty(env.STEAM_SECRET) ?? asNonEmpty(env.STEAM_API_KEY);

  if (!steamSecret) {
    throw new Error("Missing STEAM_SECRET (or STEAM_API_KEY) for Steam auth");
  }

  return Steam(req, {
    clientSecret: steamSecret,
  });
};

export const getAuthProviders = (req: NextRequest) => {
  try {
    return [buildSteamProvider(req)];
  } catch {
    // Do not break /api/auth/session when Steam provider env is incomplete.
    return [];
  }
};
