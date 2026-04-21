"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onSteamLogin = async () => {
    setIsPending(true);
    setError(null);

    const result = await signIn("steam", {
      callbackUrl: "/",
      redirect: true,
    });

    setIsPending(false);

    if (result?.error) {
      setError("Failed to start Steam login flow.");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={onSteamLogin}
        disabled={isPending}
        style={{
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "10px",
          padding: "0.7rem 1rem",
          background: "linear-gradient(180deg,#2f7eff,#1854b8)",
          color: "white",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {isPending ? "Redirecting..." : "Login With Steam"}
      </button>

      {error ? (
        <p style={{ color: "#ff7b7b", marginTop: "0.6rem" }}>{error}</p>
      ) : null}
    </div>
  );
}
