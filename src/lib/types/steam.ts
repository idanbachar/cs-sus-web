export interface ISteamPlayer {
  steamid: string;
  communityvisibilitystate?: number;
  profilestate?: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarfull: string;
  avatarmedium: string;
  lastlogoff?: number;
  realname?: string;
  timecreated?: number;
  personastateflags?: number;
  loccountrycode?: string;
}

export interface ISteamFriend {
  steamid: string;
  relationship: string;
  friend_since: number;
}

export interface ISteamPlayerBans {
  SteamId: string;
  CommunityBanned: boolean;
  VACBanned: boolean;
  NumberOfVACBans: number;
  DaysSinceLastBan: number;
  NumberOfGameBans: number;
  EconomyBan: string;
}

export interface ISteamGame {
  appid: number;
  name: string;
  playtime_2weeks?: number;
  playtime_forever: number;
  img_icon_url?: string;
}

export interface ISteamUserStatsForGame {
  steamID?: string;
  gameName?: string;
  stats?: Array<{
    name: string;
    value: number;
  }>;
}

export interface ICS2Stats {
  total_wins: number;
  total_kills_headshot: number;
  headshot_percentage: number;
  total_kills: number;
}

export interface ICS2Game {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  stats: ICS2Stats | null;
  inventory: ICS2InventorySignal | null;
}

export interface ICS2InventorySignal {
  isPublic: boolean | null;
  totalItems: number;
  rareItems: number;
  premiumItems: number;
}

export interface IUserResult {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarfull: string;
  avatarmedium: string;
  realname: string | null;
  timecreated: string;
  profile_visibility_state: number;
  is_profile_private: boolean;
  loccountrycode: string | null;
  country_image: string | null;
  friends: ISteamPlayer[] | null;
  vacBans: ISteamPlayerBans | null;
  games: ISteamGame[] | null;
  cs2: ICS2Game | null;
  totalBadges: number | null;
  steamLevel: number | null;
  total_games: number | null;
  cheater_percentage: number;
  score_reasons: string[];
}
