import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { TrackingStore, TrackingTarget } from "@/lib/tracking/types";

interface LocalDbModel {
  trackingByOwner: Record<string, TrackingTarget[]>;
}

const DATA_DIR = join(process.cwd(), ".data");
const DATA_FILE = join(DATA_DIR, "tracking.json");

const ensureDb = async () => {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    const initial: LocalDbModel = { trackingByOwner: {} };
    await writeFile(DATA_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
};

const readDb = async (): Promise<LocalDbModel> => {
  await ensureDb();
  const raw = await readFile(DATA_FILE, "utf8");
  return JSON.parse(raw) as LocalDbModel;
};

const saveDb = async (db: LocalDbModel) => {
  await writeFile(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
};

export class LocalTrackingStore implements TrackingStore {
  async getTrackingList(ownerSteamId: string): Promise<TrackingTarget[]> {
    const db = await readDb();
    return db.trackingByOwner[ownerSteamId] ?? [];
  }

  async addTarget(
    ownerSteamId: string,
    target: TrackingTarget
  ): Promise<TrackingTarget[]> {
    const db = await readDb();
    const list = db.trackingByOwner[ownerSteamId] ?? [];

    if (!list.some((item) => item.steamId === target.steamId)) {
      list.push(target);
    }

    db.trackingByOwner[ownerSteamId] = list;
    await saveDb(db);

    return list;
  }

  async removeTarget(
    ownerSteamId: string,
    targetSteamId: string
  ): Promise<TrackingTarget[]> {
    const db = await readDb();
    const list = db.trackingByOwner[ownerSteamId] ?? [];
    const nextList = list.filter((item) => item.steamId !== targetSteamId);

    db.trackingByOwner[ownerSteamId] = nextList;
    await saveDb(db);

    return nextList;
  }
}
