"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const steamRegex =
  /^https:\/\/steamcommunity\.com\/(id\/[a-zA-Z0-9_-]+|profiles\/[0-9]{17})\/?$/;

interface SearchBarProps {
  initialValue?: string;
}

export function SearchBar({ initialValue = "" }: SearchBarProps) {
  const router = useRouter();
  const [steamUrl, setSteamUrl] = useState(initialValue);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!steamRegex.test(steamUrl)) {
      router.push(`/search?steamUrl=${encodeURIComponent(steamUrl)}&invalid=1`);
      return;
    }

    router.push(`/search?steamUrl=${encodeURIComponent(steamUrl)}`);
  };

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        type="url"
        value={steamUrl}
        onChange={(event) => setSteamUrl(event.target.value)}
        placeholder="Enter steam profile url"
        aria-label="Steam profile URL"
      />
      <button type="submit">Search</button>
    </form>
  );
}
