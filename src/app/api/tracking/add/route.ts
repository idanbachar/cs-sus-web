import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { parseJsonBody, requireSessionSteamId, toErrorResponse } from "@/lib/api/route-helpers";
import { getTrackingStore } from "@/lib/tracking/repository";
import { getSteamEnvOrThrow } from "@/lib/config/env";
import { getSteamIdFromUrl, steamUrlSchema } from "@/lib/steam/validation";
import { getPlayerData } from "@/lib/steam/client";

const bodySchema = z.object({
  targetSteamUrl: steamUrlSchema,
});

export async function POST(req: NextRequest) {
  try {
    const ownerSteamId = await requireSessionSteamId();
    const body = await parseJsonBody(req, bodySchema);
    const steam = getSteamEnvOrThrow();

    const targetSteamId = await getSteamIdFromUrl(
      body.targetSteamUrl,
      steam.steamBaseUrl,
      steam.steamApiKey
    );

    if (!targetSteamId) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (targetSteamId === ownerSteamId) {
      return NextResponse.json({ error: "Cannot track your own profile" }, { status: 400 });
    }

    const player = await getPlayerData(targetSteamId, steam.steamBaseUrl, steam.steamApiKey);
    if (!player) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const store = getTrackingStore();
    const trackingList = await store.addTarget(ownerSteamId, {
      steamId: targetSteamId,
      profileUrl: player.profileurl,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ trackingList }, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
