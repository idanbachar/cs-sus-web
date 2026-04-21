"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Cs2InventoryPanel } from "@/components/search/Cs2InventoryPanel";
import { Cs2StatsPanel } from "@/components/search/Cs2StatsPanel";
import { FriendsSidebar } from "@/components/search/FriendsSidebar";
import { ProfileHeader } from "@/components/search/ProfileHeader";
import { ScoreBreakdown } from "@/components/search/ScoreBreakdown";
import { ScoreWeightLegend } from "@/components/search/ScoreWeightLegend";
import { SteamUserResponse, TrackingListResponse } from "@/lib/api/types";
import { CHEATER_SCORE_CONFIG } from "@/lib/scoring/cheater-score-config";
import { getImprovementTips, getReasonBuckets } from "@/lib/scoring/score-reasons";
import { IUserResult } from "@/lib/types/steam";

interface SearchResultsProps {
  steamUrl: string;
  invalid: boolean;
}

const fetchProfile = async (url: string) => {
  const res = await fetch(url, { method: "GET", cache: "no-store" });
  const payload = (await res.json()) as SteamUserResponse;

  if (!res.ok || !payload.user) {
    throw new Error(payload.error ?? "Failed to fetch profile");
  }

  return payload;
};

const fetchTrackingList = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to load tracking list");
  }

  return (await res.json()) as TrackingListResponse;
};

const postTrackingToggle = async (payload: { targetSteamId?: string; targetSteamUrl?: string }, tracked: boolean) => {
  const endpoint = tracked ? "/api/tracking/remove" : "/api/tracking/add";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.ok;
};

const formatNumber = (value: number | undefined) =>
  typeof value === "number" ? value.toLocaleString("en-US") : "N/A";

const isInRiskTier = (value: number, tiers: Array<{ maxExclusive: number }>) =>
  tiers.some((tier) => value < tier.maxExclusive);

const getScoreTone = (legitPercentage: number) => {
  if (legitPercentage >= 70) return "safe";
  if (legitPercentage >= 40) return "warn";
  return "critical";
};

const getStatTones = (data: IUserResult, accountAgeYears: number, friendsCount: number) => {
  return {
    bans:
      (data.vacBans?.NumberOfVACBans ?? 0) > 0 || (data.vacBans?.NumberOfGameBans ?? 0) > 0
        ? "stat-tone-risk"
        : "stat-tone-trust",
    friends:
      friendsCount < 10
        ? "stat-tone-risk"
        : friendsCount < 30
          ? "stat-tone-warn"
          : "stat-tone-trust",
    level:
      data.steamLevel === null ||
      isInRiskTier(data.steamLevel, CHEATER_SCORE_CONFIG.steamLevel.tiers)
        ? "stat-tone-risk"
        : "stat-tone-trust",
    years: isInRiskTier(accountAgeYears, CHEATER_SCORE_CONFIG.accountAge)
      ? "stat-tone-risk"
      : "stat-tone-trust",
    games: isInRiskTier(data.total_games ?? 0, CHEATER_SCORE_CONFIG.games)
      ? "stat-tone-risk"
      : "stat-tone-trust",
    badges:
      data.totalBadges === null ||
      isInRiskTier(data.totalBadges, CHEATER_SCORE_CONFIG.badges.tiers)
        ? "stat-tone-risk"
        : "stat-tone-trust",
  };
};

export function SearchResults({ steamUrl, invalid }: SearchResultsProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const query = !steamUrl || invalid ? null : `/api/steam/user?steamUrl=${encodeURIComponent(steamUrl)}`;

  const { data: response, error, isLoading } = useSWR<SteamUserResponse>(query, fetchProfile);

  const { data: trackingResponse, mutate: mutateTracking } = useSWR<TrackingListResponse>(
    session?.user?.steamId ? `/api/tracking/list?ownerSteamId=${session.user.steamId}` : null,
    fetchTrackingList
  );

  const data = response?.user ?? null;
  const errorMessage = error instanceof Error ? error.message : null;

  if (invalid) {
    return (
      <article className="error-card">
        Steam URL is invalid. Use this format: https://steamcommunity.com/id/name or
        https://steamcommunity.com/profiles/12345678901234567.
      </article>
    );
  }

  if (!steamUrl) return null;
  if (isLoading) return <article className="loading-card">Loading profile data...</article>;
  if (errorMessage) return <article className="error-card">{errorMessage}</article>;
  if (!data) return null;

  const legitPercentage = Math.max(0, 100 - data.cheater_percentage);
  const scoreTone = getScoreTone(legitPercentage);
  const trackedIds = new Set(trackingResponse?.trackingList.map((item) => item.steamId) ?? []);
  const isTracked = trackedIds.has(data.steamid);

  const canTrack =
    !!session?.user?.steamId &&
    session.user.steamId !== data.steamid &&
    !data.vacBans?.VACBanned;

  const onTrackToggle = async () => {
    if (!canTrack) return;

    const ok = await postTrackingToggle(
      isTracked ? { targetSteamId: data.steamid } : { targetSteamUrl: data.profileurl },
      isTracked
    );

    if (ok) {
      await mutateTracking();
    }
  };

  const onFriendTrackToggle = async (friendSteamId: string, friendProfileUrl: string) => {
    if (!session?.user?.steamId || session.user.steamId === friendSteamId) return;

    const friendTracked = trackedIds.has(friendSteamId);
    const ok = await postTrackingToggle(
      friendTracked ? { targetSteamId: friendSteamId } : { targetSteamUrl: friendProfileUrl },
      friendTracked
    );

    if (ok) {
      await mutateTracking();
    }
  };

  const openFriendProfile = (profileUrl: string) => {
    router.push(`/search?steamUrl=${encodeURIComponent(profileUrl)}`);
  };

  const cs2Stats = data.cs2?.stats;
  const cs2Inventory = data.cs2?.inventory;
  const accountAgeYears = Math.max(0, new Date().getFullYear() - new Date(data.timecreated).getFullYear());
  const friendsCount = data.friends?.length ?? 0;
  const statTones = getStatTones(data, accountAgeYears, friendsCount);

  const cs2Hours = data.cs2?.playtime_forever ?? 0;
  const cs2StatsHidden = !cs2Stats;

  const cs2HeadshotRisk =
    !!cs2Stats &&
    CHEATER_SCORE_CONFIG.cs2.headshotAnomalies.some(
      (tier) =>
        cs2Stats.total_kills >= tier.minKills &&
        cs2Stats.headshot_percentage >= tier.minHeadshotPercentage
    );

  const cs2WinsPerHour = cs2Stats && cs2Hours > 0 ? cs2Stats.total_wins / cs2Hours : 0;

  const cs2WinsRisk =
    !!cs2Stats &&
    CHEATER_SCORE_CONFIG.cs2.winsPerHourAnomalies.some(
      (tier) => cs2Stats.total_wins >= tier.minWins && cs2WinsPerHour > tier.minWinsPerHour
    );

  const cs2StatTones = {
    playtime: isInRiskTier(cs2Hours, CHEATER_SCORE_CONFIG.cs2.hours)
      ? "cs2-stat-tone-risk"
      : "cs2-stat-tone-trust",
    wins: cs2StatsHidden || cs2WinsRisk ? "cs2-stat-tone-risk" : "cs2-stat-tone-trust",
    headshots: cs2StatsHidden || cs2HeadshotRisk ? "cs2-stat-tone-risk" : "cs2-stat-tone-trust",
    kills: cs2StatsHidden || cs2HeadshotRisk ? "cs2-stat-tone-risk" : "cs2-stat-tone-trust",
  };

  const reasonBuckets = getReasonBuckets(data.score_reasons);
  const improvementTips = getImprovementTips(data.score_reasons);

  return (
    <div className="profile-card-shell">
      <ScoreWeightLegend />

      <div className="profile-content-grid">
        <article className="profile-card">
          <ProfileHeader
            data={data}
            friendsCount={friendsCount}
            accountAgeYears={accountAgeYears}
            statTones={statTones}
          />

          <ScoreBreakdown
            legitPercentage={legitPercentage}
            scoreTone={scoreTone}
            reasonBuckets={reasonBuckets}
            improvementTips={improvementTips}
            canTrack={canTrack}
            isTracked={isTracked}
            onTrackToggle={onTrackToggle}
          />

          {data.cs2 ? (
            <Cs2StatsPanel
              cs2={data.cs2}
              cs2Stats={cs2Stats}
              cs2StatTones={cs2StatTones}
              formatNumber={formatNumber}
            />
          ) : null}

          {cs2Inventory ? (
            <Cs2InventoryPanel cs2Inventory={cs2Inventory} formatNumber={formatNumber} />
          ) : null}
        </article>

        <FriendsSidebar
          friends={data.friends ?? []}
          trackedIds={trackedIds}
          viewerSteamId={session?.user?.steamId}
          onOpenFriendProfile={openFriendProfile}
          onToggleFriendTrack={onFriendTrackToggle}
        />
      </div>
    </div>
  );
}
