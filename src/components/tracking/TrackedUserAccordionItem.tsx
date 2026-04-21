import Image from "next/image";
import { ReactNode } from "react";
import { IUserResult } from "@/lib/types/steam";

interface TrackedUserAccordionItemProps {
  user: IUserResult;
  expanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
  children: ReactNode;
}

export function TrackedUserAccordionItem({
  user,
  expanded,
  onToggle,
  onRemove,
  children,
}: TrackedUserAccordionItemProps) {
  return (
    <div>
      <article
        className="tracking-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          padding: "0.7rem",
        }}
      >
        <button
          type="button"
          className="tracking-row-main"
          onClick={onToggle}
          aria-expanded={expanded}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            background: "transparent",
            border: 0,
            color: "inherit",
            cursor: "pointer",
            textAlign: "left",
            padding: 0,
          }}
        >
          <Image
            src={user.avatarfull}
            alt={user.personaname}
            width={52}
            height={52}
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              objectFit: "cover",
            }}
          />

          <div>
            <p style={{ margin: 0, fontSize: "1.1rem", color: "#f0f4ff" }}>{user.personaname}</p>
            <p style={{ margin: 0, color: "#90a9d0" }}>
              {Math.max(0, 100 - user.cheater_percentage)}% legit
            </p>
          </div>

          <span className={`tracking-expand-indicator ${expanded ? "open" : ""}`}>▾</span>
        </button>

        <button
          onClick={onRemove}
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "9px",
            padding: "0.45rem 0.7rem",
            background: "linear-gradient(180deg,#7a0000,#4f0000)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Stop tracking
        </button>
      </article>

      <div className={`tracking-accordion ${expanded ? "open" : ""}`}>
        <div className="tracking-accordion-inner">{children}</div>
      </div>
    </div>
  );
}
