import Image from "next/image";
import { StatItem } from "@/components/search/StatItem";
import { IUserResult } from "@/lib/types/steam";

interface ProfileHeaderProps {
  data: IUserResult;
  friendsCount: number;
  accountAgeYears: number;
  statTones: {
    bans: string;
    friends: string;
    level: string;
    years: string;
    games: string;
    badges: string;
  };
}

export function ProfileHeader({ data, friendsCount, accountAgeYears, statTones }: ProfileHeaderProps) {
  return (
    <section className="profile-main">
      <div>
        <Image
          src={data.avatarfull}
          alt={data.personaname}
          width={120}
          height={120}
          className="profile-avatar"
        />
        <h2 style={{ margin: "0.6rem 0 0", fontSize: "1.8rem", lineHeight: 1 }}>
          {data.personaname}
        </h2>
        <div
          style={{
            margin: "0.14rem 0 0",
            color: "#86a1c6",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          {data.country_image ? (
            <Image
              src={data.country_image}
              alt={`${data.loccountrycode ?? "Unknown"} flag`}
              width={22}
              height={16}
              style={{ borderRadius: "3px", border: "1px solid rgba(255,255,255,0.25)", objectFit: "cover" }}
            />
          ) : null}
          <p style={{ margin: 0 }}>{data.loccountrycode ?? "N/A"}</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatItem label="Bans" value={String(data.vacBans?.NumberOfVACBans ?? 0)} className={statTones.bans} />
        <StatItem label="Friends" value={String(friendsCount)} className={statTones.friends} />
        <StatItem label="Level" value={String(data.steamLevel ?? 0)} className={statTones.level} />
        <StatItem label="Years" value={String(accountAgeYears)} className={statTones.years} />
        <StatItem label="Games" value={String(data.total_games ?? 0)} className={statTones.games} />
        <StatItem label="Badges" value={String(data.totalBadges ?? 0)} className={statTones.badges} />
      </div>
    </section>
  );
}
