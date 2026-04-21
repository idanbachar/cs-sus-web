"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();
  const ownSteamProfileUrl = session?.user?.steamId
    ? `https://steamcommunity.com/profiles/${session.user.steamId}`
    : null;

  return (
    <header className="header-root">
      <div className="header-inner">
        <Link href="/" className="brand-logo" aria-label="CS-SUS home">
          CS:<span>SUS</span>
        </Link>

        <nav className="menu-links" aria-label="Main menu">
          <Link href="/">Home</Link>
          <Link href="/myTrackingList">Tracking list</Link>

          {session?.user ? (
            <>
              {ownSteamProfileUrl ? (
                <Link
                  href={`/search?steamUrl=${encodeURIComponent(ownSteamProfileUrl)}`}
                  style={{ color: "#dce6fb", textDecoration: "underline" }}
                >
                  {session.user.name ?? "My profile"}
                </Link>
              ) : (
                <span style={{ color: "#dce6fb" }}>{session.user.name ?? "My profile"}</span>
              )}
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "0.35rem 0.65rem",
                  borderRadius: "8px",
                  background: "rgba(199,0,0,0.25)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" style={{ color: "#80b1ff" }}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
