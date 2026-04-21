import { NextRequest, NextResponse } from "next/server";
import { requireSessionSteamId, toErrorResponse } from "@/lib/api/route-helpers";
import { getTrackingStore } from "@/lib/tracking/repository";

export async function GET(req: NextRequest) {
  try {
    const sessionSteamId = await requireSessionSteamId();

    const ownerSteamId = req.nextUrl.searchParams.get("ownerSteamId") ?? sessionSteamId;

    if (ownerSteamId !== sessionSteamId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const store = getTrackingStore();
    const trackingList = await store.getTrackingList(ownerSteamId);

    return NextResponse.json({ trackingList }, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
