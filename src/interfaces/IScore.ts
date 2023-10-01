import { ISteamPlayerBans } from "./ISteamWorks";

export interface IScore {
  cheater_percentage: number;
  steamid: string;
  profileurl: string;
  isTracking: boolean;
  vacBans: ISteamPlayerBans | null;
  onTrackingClick: (
    steamid: string,
    profileurl: string,
    isTracking: boolean
  ) => void;
}
