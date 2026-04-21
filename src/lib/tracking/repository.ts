import { getServerEnv } from "@/lib/config/env";
import { LocalTrackingStore } from "@/lib/tracking/local-store";
import { SupabaseTrackingStore } from "@/lib/tracking/supabase-store";
import { TrackingStore } from "@/lib/tracking/types";

let cachedStore: TrackingStore | null = null;

export const getTrackingStore = (): TrackingStore => {
  if (cachedStore) {
    return cachedStore;
  }

  const env = getServerEnv();

  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    cachedStore = new SupabaseTrackingStore();
  } else {
    cachedStore = new LocalTrackingStore();
  }

  return cachedStore;
};
