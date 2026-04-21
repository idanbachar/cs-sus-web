interface RiskTier {
  maxExclusive: number;
  weight: number;
  reason: string;
}

interface HeadshotAnomalyTier {
  minKills: number;
  minHeadshotPercentage: number;
  weight: number;
  reason: string;
}

interface WinsPerHourAnomalyTier {
  minWins: number;
  minWinsPerHour: number;
  weight: number;
  reason: string;
}

interface InventorySignalTier {
  minInclusive: number;
  weight: number;
  reason: string;
}

export const CHEATER_SCORE_CONFIG = {
  hardStops: {
    vacOrGameBan: {
      score: 100,
      reason: "VAC_OR_GAME_BAN_PRESENT",
    },
    heavilyHiddenProfile: {
      score: 95,
      reason: "PROFILE_PRIVATE_OR_HEAVILY_HIDDEN",
    },
  },
  profilePrivacy: {
    private: {
      weight: 22,
      reason: "PROFILE_PRIVATE_HIGH_RISK",
    },
  },
  accountAge: [
    { maxExclusive: 1, weight: 24, reason: "ACCOUNT_AGE_LT_1Y_HIGH_RISK" },
    { maxExclusive: 2, weight: 18, reason: "ACCOUNT_AGE_LT_2Y_HIGH_RISK" },
    { maxExclusive: 4, weight: 10, reason: "ACCOUNT_AGE_LT_4Y_MEDIUM_RISK" },
    { maxExclusive: 7, weight: 4, reason: "ACCOUNT_AGE_LT_7Y_LOW_RISK" },
  ] as RiskTier[],
  friends: [
    { maxExclusive: 10, weight: 16, reason: "FRIENDS_LT_10_HIGH_RISK" },
    { maxExclusive: 30, weight: 8, reason: "FRIENDS_LT_30_MEDIUM_RISK" },
    { maxExclusive: 75, weight: 3, reason: "FRIENDS_LT_75_LOW_RISK" },
  ] as RiskTier[],
  games: [
    { maxExclusive: 5, weight: 18, reason: "GAMES_LT_5_HIGH_RISK" },
    { maxExclusive: 20, weight: 10, reason: "GAMES_LT_20_MEDIUM_RISK" },
    { maxExclusive: 60, weight: 4, reason: "GAMES_LT_60_LOW_RISK" },
  ] as RiskTier[],
  badges: {
    hidden: {
      weight: 12,
      reason: "BADGES_HIDDEN_MEDIUM_RISK",
    },
    tiers: [
      { maxExclusive: 3, weight: 10, reason: "BADGES_LT_3_HIGH_RISK" },
      { maxExclusive: 10, weight: 4, reason: "BADGES_LT_10_LOW_RISK" },
    ] as RiskTier[],
  },
  steamLevel: {
    hidden: {
      weight: 12,
      reason: "STEAM_LEVEL_HIDDEN_MEDIUM_RISK",
    },
    tiers: [
      { maxExclusive: 5, weight: 12, reason: "STEAM_LEVEL_LT_5_HIGH_RISK" },
      { maxExclusive: 10, weight: 7, reason: "STEAM_LEVEL_LT_10_MEDIUM_RISK" },
      { maxExclusive: 20, weight: 3, reason: "STEAM_LEVEL_LT_20_LOW_RISK" },
    ] as RiskTier[],
  },
  cs2: {
    missing: {
      weight: 8,
      reason: "CS2_NOT_OWNED_OR_HIDDEN",
    },
    hours: [
      { maxExclusive: 100, weight: 20, reason: "CS2_HOURS_LT_100_HIGH_RISK" },
      { maxExclusive: 300, weight: 12, reason: "CS2_HOURS_LT_300_MEDIUM_RISK" },
      { maxExclusive: 800, weight: 6, reason: "CS2_HOURS_LT_800_LOW_RISK" },
    ] as RiskTier[],
    statsHidden: {
      weight: 8,
      reason: "CS2_STATS_HIDDEN",
    },
    headshotAnomalies: [
      {
        minKills: 3000,
        minHeadshotPercentage: 75,
        weight: 14,
        reason: "CS2_HEADSHOT_VERY_HIGH_ANOMALY",
      },
      {
        minKills: 3000,
        minHeadshotPercentage: 65,
        weight: 8,
        reason: "CS2_HEADSHOT_HIGH_ANOMALY",
      },
    ] as HeadshotAnomalyTier[],
    winsPerHourAnomalies: [
      {
        minWins: 1000,
        minWinsPerHour: 1.8,
        weight: 12,
        reason: "CS2_WINS_PER_HOUR_EXTREME",
      },
      {
        minWins: 600,
        minWinsPerHour: 1.2,
        weight: 6,
        reason: "CS2_WINS_PER_HOUR_HIGH",
      },
    ] as WinsPerHourAnomalyTier[],
    inventory: {
      private: {
        weight: 10,
        reason: "CS2_INVENTORY_PRIVATE_MEDIUM_RISK",
      },
      rareItems: [
        { minInclusive: 1, weight: -4, reason: "CS2_HAS_RARE_ITEMS_LOWERS_RISK" },
        { minInclusive: 3, weight: -7, reason: "CS2_HAS_MULTIPLE_RARE_ITEMS_LOWER_RISK" },
      ] as InventorySignalTier[],
      premiumItems: [
        { minInclusive: 1, weight: -5, reason: "CS2_HAS_PREMIUM_ITEM_LOWER_RISK" },
        { minInclusive: 2, weight: -8, reason: "CS2_HAS_MULTIPLE_PREMIUM_ITEMS_LOWER_RISK" },
      ] as InventorySignalTier[],
      totalItems: [
        { minInclusive: 40, weight: -3, reason: "CS2_INVENTORY_RICHNESS_LOWER_RISK" },
      ] as InventorySignalTier[],
    },
  },
  limits: {
    minScore: 0,
    maxScore: 98,
  },
};
