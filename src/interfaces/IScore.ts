export interface IScore {
  cheater_percentage: number;
  steamid: string;
  profileurl: string;
  isTracking: boolean;
  onTrackingClick: (
    steamid: string,
    profileurl: string,
    isTracking: boolean
  ) => void;
}
