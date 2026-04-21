export type ReasonTone = "pro" | "con";

export const REASON_META: Record<string, { label: string; tone: ReasonTone }> = {
  VAC_OR_GAME_BAN_PRESENT: { label: "VAC/Game ban is present (critical signal).", tone: "con" },
  PROFILE_PRIVATE_OR_HEAVILY_HIDDEN: { label: "Most profile data is hidden.", tone: "con" },
  PROFILE_PRIVATE_HIGH_RISK: { label: "Profile visibility is private.", tone: "con" },
  ACCOUNT_AGE_LT_1Y_HIGH_RISK: { label: "Account is very new (under 1 year).", tone: "con" },
  ACCOUNT_AGE_LT_2Y_HIGH_RISK: { label: "Account is relatively new (under 2 years).", tone: "con" },
  ACCOUNT_AGE_LT_4Y_MEDIUM_RISK: { label: "Account age is still low (under 4 years).", tone: "con" },
  ACCOUNT_AGE_LT_7Y_LOW_RISK: { label: "Account is not old enough for strong trust signals.", tone: "con" },
  FRIENDS_LT_10_HIGH_RISK: { label: "Very low friends count (under 10).", tone: "con" },
  FRIENDS_LT_30_MEDIUM_RISK: { label: "Low friends count (under 30).", tone: "con" },
  FRIENDS_LT_75_LOW_RISK: { label: "Friends count is moderate.", tone: "con" },
  GAMES_LT_5_HIGH_RISK: { label: "Very small game library (under 5 games).", tone: "con" },
  GAMES_LT_20_MEDIUM_RISK: { label: "Small game library (under 20 games).", tone: "con" },
  GAMES_LT_60_LOW_RISK: { label: "Library size is still modest.", tone: "con" },
  BADGES_HIDDEN_MEDIUM_RISK: { label: "Badges are hidden.", tone: "con" },
  BADGES_LT_3_HIGH_RISK: { label: "Very low badges count (under 3).", tone: "con" },
  BADGES_LT_10_LOW_RISK: { label: "Badges count is still low.", tone: "con" },
  STEAM_LEVEL_HIDDEN_MEDIUM_RISK: { label: "Steam level is hidden.", tone: "con" },
  STEAM_LEVEL_LT_5_HIGH_RISK: { label: "Very low Steam level (under 5).", tone: "con" },
  STEAM_LEVEL_LT_10_MEDIUM_RISK: { label: "Low Steam level (under 10).", tone: "con" },
  STEAM_LEVEL_LT_20_LOW_RISK: { label: "Steam level is still moderate.", tone: "con" },
  CS2_NOT_OWNED_OR_HIDDEN: { label: "CS2 ownership/playtime is missing or hidden.", tone: "con" },
  CS2_HOURS_LT_100_HIGH_RISK: { label: "CS2 playtime is very low (under 100h).", tone: "con" },
  CS2_HOURS_LT_300_MEDIUM_RISK: { label: "CS2 playtime is low (under 300h).", tone: "con" },
  CS2_HOURS_LT_800_LOW_RISK: { label: "CS2 playtime is moderate.", tone: "con" },
  CS2_STATS_HIDDEN: { label: "CS2 stats are hidden.", tone: "con" },
  CS2_HEADSHOT_VERY_HIGH_ANOMALY: { label: "Headshot ratio is extremely high for this kills volume.", tone: "con" },
  CS2_HEADSHOT_HIGH_ANOMALY: { label: "Headshot ratio is unusually high.", tone: "con" },
  CS2_WINS_PER_HOUR_EXTREME: { label: "Wins-per-hour looks extreme.", tone: "con" },
  CS2_WINS_PER_HOUR_HIGH: { label: "Wins-per-hour is unusually high.", tone: "con" },
  CS2_INVENTORY_PRIVATE_MEDIUM_RISK: { label: "CS2 inventory is private.", tone: "con" },
  CS2_HAS_RARE_ITEMS_LOWERS_RISK: { label: "Rare inventory items reduce suspicion.", tone: "pro" },
  CS2_HAS_MULTIPLE_RARE_ITEMS_LOWER_RISK: { label: "Multiple rare items reduce suspicion further.", tone: "pro" },
  CS2_HAS_PREMIUM_ITEM_LOWER_RISK: { label: "Premium inventory items reduce suspicion.", tone: "pro" },
  CS2_HAS_MULTIPLE_PREMIUM_ITEMS_LOWER_RISK: { label: "Multiple premium items reduce suspicion further.", tone: "pro" },
  CS2_INVENTORY_RICHNESS_LOWER_RISK: { label: "Rich CS2 inventory adds account trust.", tone: "pro" },
};

export const getReasonBuckets = (reasons: string[]) => {
  return reasons.reduce(
    (acc, reason) => {
      const meta = REASON_META[reason] ?? { label: reason, tone: "con" as const };
      if (meta.tone === "pro") {
        acc.pros.push(meta.label);
      } else {
        acc.cons.push(meta.label);
      }
      return acc;
    },
    { pros: [] as string[], cons: [] as string[] }
  );
};

export const getImprovementTips = (reasons: string[]) => {
  const tips = new Set<string>();

  if (reasons.includes("VAC_OR_GAME_BAN_PRESENT")) {
    tips.add("Avoid bans completely. Any VAC/Game ban blocks a perfect 100% Legit score.");
  }

  if (
    reasons.includes("PROFILE_PRIVATE_OR_HEAVILY_HIDDEN") ||
    reasons.includes("PROFILE_PRIVATE_HIGH_RISK") ||
    reasons.includes("BADGES_HIDDEN_MEDIUM_RISK") ||
    reasons.includes("STEAM_LEVEL_HIDDEN_MEDIUM_RISK")
  ) {
    tips.add("Make profile, game details, badges, level, and relevant stats public.");
  }

  if (reasons.some((reason) => reason.startsWith("FRIENDS_LT_"))) {
    tips.add("Grow trusted social footprint: add real friends and keep activity natural.");
  }

  if (reasons.some((reason) => reason.startsWith("GAMES_LT_"))) {
    tips.add("Build a broader game library over time.");
  }

  if (reasons.some((reason) => reason.startsWith("BADGES_LT_"))) {
    tips.add("Increase badge count gradually through normal account activity.");
  }

  if (reasons.some((reason) => reason.startsWith("STEAM_LEVEL_LT_"))) {
    tips.add("Raise Steam level over time (organic progression improves trust signals).");
  }

  if (
    reasons.includes("CS2_NOT_OWNED_OR_HIDDEN") ||
    reasons.some((reason) => reason.startsWith("CS2_HOURS_LT_")) ||
    reasons.includes("CS2_STATS_HIDDEN")
  ) {
    tips.add("Increase verifiable CS2 playtime and keep CS2 stats visible.");
  }

  if (
    reasons.includes("CS2_INVENTORY_PRIVATE_MEDIUM_RISK") ||
    reasons.includes("CS2_HAS_RARE_ITEMS_LOWERS_RISK") ||
    reasons.includes("CS2_HAS_MULTIPLE_RARE_ITEMS_LOWER_RISK") ||
    reasons.includes("CS2_HAS_PREMIUM_ITEM_LOWER_RISK") ||
    reasons.includes("CS2_HAS_MULTIPLE_PREMIUM_ITEMS_LOWER_RISK")
  ) {
    tips.add("Keep CS2 inventory public and stable to strengthen trust signals.");
  }

  if (
    reasons.includes("CS2_HEADSHOT_VERY_HIGH_ANOMALY") ||
    reasons.includes("CS2_HEADSHOT_HIGH_ANOMALY") ||
    reasons.includes("CS2_WINS_PER_HOUR_EXTREME") ||
    reasons.includes("CS2_WINS_PER_HOUR_HIGH")
  ) {
    tips.add("Sustain consistent long-term gameplay metrics to reduce statistical anomalies.");
  }

  if (tips.size === 0) {
    tips.add("No major risk signals found. Keep current behavior and account transparency.");
  }

  return [...tips];
};
