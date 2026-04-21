import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      steamId: string;
      profileUrl?: string;
    } & DefaultSession["user"];
  }

  interface User {
    steamId?: string;
    profileUrl?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    steamId?: string;
    profileUrl?: string;
  }
}

export {};
