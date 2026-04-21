import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { parseJsonBody, requireSessionSteamId, toErrorResponse } from "@/lib/api/route-helpers";
import { getTrackingStore } from "@/lib/tracking/repository";

const bodySchema = z.object({
  targetSteamId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const ownerSteamId = await requireSessionSteamId();
    const body = await parseJsonBody(req, bodySchema);

    const store = getTrackingStore();
    const trackingList = await store.removeTarget(ownerSteamId, body.targetSteamId);

    return NextResponse.json({ trackingList }, { status: 200 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
