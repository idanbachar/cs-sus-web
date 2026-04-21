import { createServerSupabaseClient } from "@/lib/supabase/server";
import { TrackingStore, TrackingTarget } from "@/lib/tracking/types";

export class SupabaseTrackingStore implements TrackingStore {
  async getTrackingList(ownerSteamId: string): Promise<TrackingTarget[]> {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from("tracking_list")
      .select("target_steam_id, target_profile_url, created_at")
      .eq("owner_steam_id", ownerSteamId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((row) => ({
      steamId: row.target_steam_id,
      profileUrl: row.target_profile_url,
      createdAt: row.created_at,
    }));
  }

  async addTarget(
    ownerSteamId: string,
    target: TrackingTarget
  ): Promise<TrackingTarget[]> {
    const supabase = createServerSupabaseClient();

    const { error } = await supabase.from("tracking_list").upsert(
      {
        owner_steam_id: ownerSteamId,
        target_steam_id: target.steamId,
        target_profile_url: target.profileUrl,
      },
      { onConflict: "owner_steam_id,target_steam_id" }
    );

    if (error) {
      throw new Error(error.message);
    }

    return this.getTrackingList(ownerSteamId);
  }

  async removeTarget(
    ownerSteamId: string,
    targetSteamId: string
  ): Promise<TrackingTarget[]> {
    const supabase = createServerSupabaseClient();

    const { error } = await supabase
      .from("tracking_list")
      .delete()
      .eq("owner_steam_id", ownerSteamId)
      .eq("target_steam_id", targetSteamId);

    if (error) {
      throw new Error(error.message);
    }

    return this.getTrackingList(ownerSteamId);
  }
}
