export interface TrackingTarget {
  steamId: string;
  profileUrl: string;
  createdAt: string;
}

export interface TrackingStore {
  getTrackingList(ownerSteamId: string): Promise<TrackingTarget[]>;
  addTarget(ownerSteamId: string, target: TrackingTarget): Promise<TrackingTarget[]>;
  removeTarget(ownerSteamId: string, targetSteamId: string): Promise<TrackingTarget[]>;
}

export interface TrackingListResponse {
  trackingList: TrackingTarget[];
}
