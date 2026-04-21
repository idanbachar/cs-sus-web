import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth/options";

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const requireSessionSteamId = async () => {
  const session = await getServerSession(authOptions);
  const steamId = session?.user?.steamId;

  if (!steamId) {
    throw new HttpError(401, "Unauthorized");
  }

  return steamId;
};

export const parseJsonBody = async <T>(req: NextRequest, schema: z.ZodSchema<T>) => {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    throw new HttpError(400, parsed.error.issues[0]?.message ?? "Invalid request");
  }

  return parsed.data;
};

export const toErrorResponse = (error: unknown) => {
  if (error instanceof HttpError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  const message = error instanceof Error ? error.message : "Unknown error";
  return NextResponse.json({ error: message }, { status: 500 });
};
