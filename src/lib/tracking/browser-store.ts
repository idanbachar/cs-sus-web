"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TrackingTarget } from "@/lib/tracking/types";

const STORAGE_PREFIX = "cs-sus:tracking:";

const getStorageKey = (ownerSteamId: string) => `${STORAGE_PREFIX}${ownerSteamId}`;

const isTrackingTarget = (value: unknown): value is TrackingTarget => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<TrackingTarget>;
  return (
    typeof candidate.steamId === "string" &&
    typeof candidate.profileUrl === "string" &&
    typeof candidate.createdAt === "string"
  );
};

const readTrackingList = (ownerSteamId: string): TrackingTarget[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(getStorageKey(ownerSteamId));
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isTrackingTarget);
  } catch {
    return [];
  }
};

const writeTrackingList = (ownerSteamId: string, trackingList: TrackingTarget[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(getStorageKey(ownerSteamId), JSON.stringify(trackingList));
};

export const useLocalTrackingList = (ownerSteamId?: string) => {
  const [trackingList, setTrackingList] = useState<TrackingTarget[]>([]);

  useEffect(() => {
    if (!ownerSteamId) {
      setTrackingList([]);
      return;
    }

    setTrackingList(readTrackingList(ownerSteamId));
  }, [ownerSteamId]);

  useEffect(() => {
    if (!ownerSteamId) {
      return;
    }

    const key = getStorageKey(ownerSteamId);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      setTrackingList(readTrackingList(ownerSteamId));
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [ownerSteamId]);

  const trackedIds = useMemo(() => new Set(trackingList.map((item) => item.steamId)), [trackingList]);

  const addTarget = useCallback(
    (target: TrackingTarget) => {
      if (!ownerSteamId) {
        return false;
      }

      const current = readTrackingList(ownerSteamId);
      if (current.some((item) => item.steamId === target.steamId)) {
        setTrackingList(current);
        return true;
      }

      const next = [...current, target];
      writeTrackingList(ownerSteamId, next);
      setTrackingList(next);
      return true;
    },
    [ownerSteamId]
  );

  const removeTarget = useCallback(
    (targetSteamId: string) => {
      if (!ownerSteamId) {
        return false;
      }

      const current = readTrackingList(ownerSteamId);
      const next = current.filter((item) => item.steamId !== targetSteamId);
      writeTrackingList(ownerSteamId, next);
      setTrackingList(next);
      return true;
    },
    [ownerSteamId]
  );

  return {
    trackingList,
    trackedIds,
    addTarget,
    removeTarget,
  };
};
