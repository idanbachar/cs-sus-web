import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSteamEnvOrThrow } from "@/lib/config/env";
import { getSteamIdFromUrl, steamUrlSchema } from "@/lib/steam/validation";
import { getFullUserData } from "@/lib/steam/full-user";

const bodySchema = z.object({
  steamUrls: z.array(steamUrlSchema).max(50),
});

export async function POST(req: NextRequest) {
  try {
    const steam = getSteamEnvOrThrow();

    const body = await req.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    const ids = await Promise.all(
      parsed.data.steamUrls.map((steamUrl) =>
        getSteamIdFromUrl(steamUrl, steam.steamBaseUrl, steam.steamApiKey)
      )
    );

    const uniqueIds = [...new Set(ids.filter(Boolean) as string[])];

    const users = (
      await Promise.all(
        uniqueIds.map((id) =>
          getFullUserData(id, steam.steamBaseUrl, steam.steamApiKey)
        )
      )
    ).filter(Boolean);

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
