import { IUserResult } from "@/lib/types/steam";
import { TrackingListResponse } from "@/lib/tracking/types";

export interface SteamUserResponse {
  user?: IUserResult;
  error?: string;
}

export interface SteamUsersResponse {
  users: IUserResult[];
}

export type { TrackingListResponse };
