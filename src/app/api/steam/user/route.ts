import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSteamEnvOrThrow } from "@/lib/config/env";
import { getFullUserData } from "@/lib/steam/full-user";
import { getSteamIdFromUrl, steamUrlSchema } from "@/lib/steam/validation";

const querySchema = z.object({
  steamUrl: steamUrlSchema,
});

export async function GET(req: NextRequest) {
  try {
    const steam = getSteamEnvOrThrow();

    const parsed = querySchema.safeParse({
      steamUrl: req.nextUrl.searchParams.get("steamUrl"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid Steam URL" },
        { status: 400 }
      );
    }

    const steamId = await getSteamIdFromUrl(
      parsed.data.steamUrl,
      steam.steamBaseUrl,
      steam.steamApiKey
    );

    if (!steamId) {
      return NextResponse.json(
        { error: "Could not resolve Steam profile ID" },
        { status: 404 }
      );
    }

    const user = await getFullUserData(
      steamId,
      steam.steamBaseUrl,
      steam.steamApiKey
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
