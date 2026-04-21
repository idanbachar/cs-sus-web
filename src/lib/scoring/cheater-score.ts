import { IUserResult } from "@/lib/types/steam";
import { CHEATER_SCORE_CONFIG } from "@/lib/scoring/cheater-score-config";

interface ScoreResult {
  score: number;
  reasons: string[];
}

export const calculateCheaterScore = (user: Omit<IUserResult, "cheater_percentage" | "score_reasons">): ScoreResult => {
  const reasons: string[] = [];

  const findRiskTier = (value: number, tiers: Array<{ maxExclusive: number; weight: number; reason: string }>) =>
    tiers.find((tier) => value < tier.maxExclusive);

  const applyWeight = (weight: number, reason: string) => {
    if (weight === 0) return 0;
    reasons.push(reason);
    return weight;
  };

  if (user.vacBans && (user.vacBans.NumberOfVACBans > 0 || user.vacBans.NumberOfGameBans > 0)) {
    return {
      score: CHEATER_SCORE_CONFIG.hardStops.vacOrGameBan.score,
      reasons: [CHEATER_SCORE_CONFIG.hardStops.vacOrGameBan.reason],
    };
  }

  if (user.games === null && user.friends === null && user.totalBadges === null) {
    return {
      score: CHEATER_SCORE_CONFIG.hardStops.heavilyHiddenProfile.score,
      reasons: [CHEATER_SCORE_CONFIG.hardStops.heavilyHiddenProfile.reason],
    };
  }

  let score = 0;

  if (user.is_profile_private) {
    score += applyWeight(
      CHEATER_SCORE_CONFIG.profilePrivacy.private.weight,
      CHEATER_SCORE_CONFIG.profilePrivacy.private.reason
    );
  }

  const now = new Date();
  const createdAt = new Date(user.timecreated);
  const accountAgeYears = Math.max(
    0,
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );

  const accountAgeTier = findRiskTier(accountAgeYears, CHEATER_SCORE_CONFIG.accountAge);
  if (accountAgeTier) {
    score += applyWeight(accountAgeTier.weight, accountAgeTier.reason);
  }

  const totalFriends = user.friends?.length ?? 0;
  const friendsTier = findRiskTier(totalFriends, CHEATER_SCORE_CONFIG.friends);
  if (friendsTier) {
    score += applyWeight(friendsTier.weight, friendsTier.reason);
  }

  const totalGames = user.total_games ?? 0;
  const gamesTier = findRiskTier(totalGames, CHEATER_SCORE_CONFIG.games);
  if (gamesTier) {
    score += applyWeight(gamesTier.weight, gamesTier.reason);
  }

  if (user.totalBadges === null) {
    score += applyWeight(
      CHEATER_SCORE_CONFIG.badges.hidden.weight,
      CHEATER_SCORE_CONFIG.badges.hidden.reason
    );
  } else {
    const badgesTier = findRiskTier(user.totalBadges, CHEATER_SCORE_CONFIG.badges.tiers);
    if (badgesTier) {
      score += applyWeight(badgesTier.weight, badgesTier.reason);
    }
  }

  if (user.steamLevel === null) {
    score += applyWeight(
      CHEATER_SCORE_CONFIG.steamLevel.hidden.weight,
      CHEATER_SCORE_CONFIG.steamLevel.hidden.reason
    );
  } else {
    const steamLevelTier = findRiskTier(user.steamLevel, CHEATER_SCORE_CONFIG.steamLevel.tiers);
    if (steamLevelTier) {
      score += applyWeight(steamLevelTier.weight, steamLevelTier.reason);
    }
  }

  if (!user.cs2) {
    score += applyWeight(CHEATER_SCORE_CONFIG.cs2.missing.weight, CHEATER_SCORE_CONFIG.cs2.missing.reason);
  } else {
    const cs2Hours = user.cs2.playtime_forever;
    const cs2Inventory = user.cs2.inventory;

    const cs2HoursTier = findRiskTier(cs2Hours, CHEATER_SCORE_CONFIG.cs2.hours);
    if (cs2HoursTier) {
      score += applyWeight(cs2HoursTier.weight, cs2HoursTier.reason);
    }

    if (!user.cs2.stats) {
      score += applyWeight(
        CHEATER_SCORE_CONFIG.cs2.statsHidden.weight,
        CHEATER_SCORE_CONFIG.cs2.statsHidden.reason
      );
    } else {
      const { total_wins, total_kills, headshot_percentage } = user.cs2.stats;
      const winsPerHour = cs2Hours > 0 ? total_wins / cs2Hours : 0;

      const headshotAnomaly = CHEATER_SCORE_CONFIG.cs2.headshotAnomalies.find(
        (anomaly) => total_kills >= anomaly.minKills && headshot_percentage >= anomaly.minHeadshotPercentage
      );
      if (headshotAnomaly) {
        score += applyWeight(headshotAnomaly.weight, headshotAnomaly.reason);
      }

      const winsPerHourAnomaly = CHEATER_SCORE_CONFIG.cs2.winsPerHourAnomalies.find(
        (anomaly) => total_wins >= anomaly.minWins && winsPerHour > anomaly.minWinsPerHour
      );
      if (winsPerHourAnomaly) {
        score += applyWeight(winsPerHourAnomaly.weight, winsPerHourAnomaly.reason);
      }
    }

    if (cs2Inventory?.isPublic === false) {
      score += applyWeight(
        CHEATER_SCORE_CONFIG.cs2.inventory.private.weight,
        CHEATER_SCORE_CONFIG.cs2.inventory.private.reason
      );
    }

    if (cs2Inventory?.isPublic) {
      const sortedRareSignals = [...CHEATER_SCORE_CONFIG.cs2.inventory.rareItems].sort(
        (a, b) => b.minInclusive - a.minInclusive
      );
      const rareSignal = sortedRareSignals.find(
        (tier) => cs2Inventory.rareItems >= tier.minInclusive
      );
      if (rareSignal) {
        score += applyWeight(rareSignal.weight, rareSignal.reason);
      }

      const sortedPremiumSignals = [...CHEATER_SCORE_CONFIG.cs2.inventory.premiumItems].sort(
        (a, b) => b.minInclusive - a.minInclusive
      );
      const premiumSignal = sortedPremiumSignals.find(
        (tier) => cs2Inventory.premiumItems >= tier.minInclusive
      );
      if (premiumSignal) {
        score += applyWeight(premiumSignal.weight, premiumSignal.reason);
      }

      const sortedTotalSignals = [...CHEATER_SCORE_CONFIG.cs2.inventory.totalItems].sort(
        (a, b) => b.minInclusive - a.minInclusive
      );
      const totalItemsSignal = sortedTotalSignals.find(
        (tier) => cs2Inventory.totalItems >= tier.minInclusive
      );
      if (totalItemsSignal) {
        score += applyWeight(totalItemsSignal.weight, totalItemsSignal.reason);
      }
    }
  }

  const cappedScore = Math.min(
    CHEATER_SCORE_CONFIG.limits.maxScore,
    Math.max(CHEATER_SCORE_CONFIG.limits.minScore, Math.round(score))
  );

  return {
    score: cappedScore,
    reasons,
  };
};
