export interface ISteamPlayer {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarfull: string;
  avatarmedium: string;
  lastlogoff: number;
  realname: string;
  timecreated: number | Date;
  personastateflags: number;
  loccountrycode: string;
}

export interface ISteamFriend {
  steamid: string;
  relationship: string;
  friend_since: number | Date;
}

export interface ISteamFriends {
  friends: ISteamPlayer[];
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
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  rtime_last_played: number | Date;
  content_descriptorids: number[];
  playtime_disconnected: number;
}

export interface ISteamGames {
  games: ISteamGame[];
}

export interface ISteamUserStatsForGame {
  steamID: string;
  gameName: string;
  stats: [
    {
      name: string;
      value: number;
    }
  ];
}

export interface ISteamUserInventory {
  total_inventory_count: number;
  descriptions: {
    appid: number;
    classid: string;
    instanceid: string;
    currency: number;
    background_color: string;
    icon_url: string;
    icon_url_large: string;
    descriptions: {
      type: string;
      value: string;
    }[];
    tradable: number;
    actions: {
      link: string;
      name: string;
    }[];
    name: string;
    name_color: string;
    type: string;
    market_name: string;
    market_hash_name: string;
    market_actions: {
      link: string;
      name: string;
    }[];
    commodity: number;
    market_tradable_restriction: number;
    marketable: number;
    tags: {
      category: string;
      internal_name: string;
      localized_category_name: string;
      localized_tag_name: string;
    }[];
  }[];
}
