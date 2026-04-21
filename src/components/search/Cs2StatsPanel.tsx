import Image from "next/image";
import { StatItem } from "@/components/search/StatItem";
import { ICS2Stats, IUserResult } from "@/lib/types/steam";

interface Cs2StatsPanelProps {
  cs2: NonNullable<IUserResult["cs2"]>;
  cs2Stats: ICS2Stats | null | undefined;
  cs2StatTones: {
    playtime: string;
    wins: string;
    headshots: string;
    kills: string;
  };
  formatNumber: (value: number | undefined) => string;
}

export function Cs2StatsPanel({ cs2, cs2Stats, cs2StatTones, formatNumber }: Cs2StatsPanelProps) {
  return (
    <section className="cs2-panel">
      <div className="cs2-game-cell">
        <Image
          src={cs2.img_icon_url}
          alt={cs2.name}
          width={170}
          height={64}
          className="cs2-game-image"
        />
        <h3>{cs2.name}</h3>
      </div>

      <StatItem
        label="Playtime"
        value={`${formatNumber(cs2.playtime_forever)} hrs`}
        className={`cs2-stat-item ${cs2StatTones.playtime}`}
      />
      <StatItem
        label="Wins"
        value={formatNumber(cs2Stats?.total_wins)}
        className={`cs2-stat-item ${cs2StatTones.wins}`}
      />
      <StatItem
        label="Headshots"
        value={formatNumber(cs2Stats?.total_kills_headshot)}
        className={`cs2-stat-item ${cs2StatTones.headshots}`}
      />
      <StatItem
        label="Kills"
        value={formatNumber(cs2Stats?.total_kills)}
        className={`cs2-stat-item ${cs2StatTones.kills}`}
      />
    </section>
  );
}
