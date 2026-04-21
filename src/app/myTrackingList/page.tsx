"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SearchResults } from "@/components/search/SearchResults";
import { TrackedUserAccordionItem } from "@/components/tracking/TrackedUserAccordionItem";
import { SteamUsersResponse } from "@/lib/api/types";
import { useLocalTrackingList } from "@/lib/tracking/browser-store";

export default function TrackingListPage() {
  const { data: session, status } = useSession();
  const [expandedSteamId, setExpandedSteamId] = useState<string | null>(null);
  const { trackingList, removeTarget } = useLocalTrackingList(session?.user?.steamId);

  const steamUrls = useMemo(
    () => trackingList.map((item) => item.profileUrl),
    [trackingList]
  );

  const trackingUsersKey =
    steamUrls.length > 0 ? (["tracking-users", steamUrls.join("|")] as const) : null;

  const { data: usersData } = useSWR<SteamUsersResponse>(
    trackingUsersKey,
    async () => {
      const res = await fetch("/api/steam/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ steamUrls }),
      });

      if (!res.ok) throw new Error("Failed to load tracked users");
      return (await res.json()) as SteamUsersResponse;
    }
  );

  const sortedUsers = useMemo(
    () =>
      [...(usersData?.users ?? [])].sort(
        (a, b) => 100 - b.cheater_percentage - (100 - a.cheater_percentage)
      ),
    [usersData?.users]
  );

  const onRemove = (steamId: string) => {
    removeTarget(steamId);
  };

  return (
    <div className="app-shell">
      <Header />

      <main className="page-wrap">
        <section className="tracking-placeholder">
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", margin: 0 }}>
            My Tracking list
          </h1>

          {status === "loading" ? <p style={{ color: "#a7b6ce" }}>Loading session...</p> : null}

          {status === "unauthenticated" ? (
            <p style={{ color: "#a7b6ce", marginTop: "0.5rem", fontSize: "1.1rem" }}>
              Please login to access your tracking list.
            </p>
          ) : null}

          {status === "authenticated" && !trackingList.length ? (
            <p style={{ color: "#a7b6ce", marginTop: "0.5rem", fontSize: "1.1rem" }}>
              No profiles tracked yet. Search a profile and click Track.
            </p>
          ) : null}

          {sortedUsers.length ? (
            <div style={{ display: "grid", gap: "0.8rem", marginTop: "1rem" }}>
              {sortedUsers.map((user) => {
                const isExpanded = expandedSteamId === user.steamid;

                return (
                  <TrackedUserAccordionItem
                    key={user.steamid}
                    user={user}
                    expanded={isExpanded}
                    onToggle={() =>
                      setExpandedSteamId((prev) =>
                        prev === user.steamid ? null : user.steamid
                      )
                    }
                    onRemove={() => onRemove(user.steamid)}
                  >
                    <div style={{ marginTop: "0.7rem" }}>
                      {isExpanded ? (
                        <SearchResults steamUrl={user.profileurl} invalid={false} />
                      ) : null}
                    </div>
                  </TrackedUserAccordionItem>
                );
              })}
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  );
}
