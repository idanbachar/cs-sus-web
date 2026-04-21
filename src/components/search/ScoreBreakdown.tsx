interface ScoreBreakdownProps {
  legitPercentage: number;
  scoreTone: "safe" | "warn" | "critical";
  reasonBuckets: { pros: string[]; cons: string[] };
  improvementTips: string[];
  canTrack: boolean;
  isTracked: boolean;
  onTrackToggle: () => void;
}

export function ScoreBreakdown({
  legitPercentage,
  scoreTone,
  reasonBuckets,
  improvementTips,
  canTrack,
  isTracked,
  onTrackToggle,
}: ScoreBreakdownProps) {
  return (
    <section className={`score-banner ${scoreTone}`}>
      {legitPercentage}% Legit

      <div className="score-details-wrap">
        <div className="score-detail-card reason-card">
          <h4>Why this score</h4>
          <div className="reason-columns">
            <div>
              <h5 className="reason-heading pro">Pros</h5>
              {reasonBuckets.pros.length ? (
                <ul className="reason-list reason-list-pro">
                  {reasonBuckets.pros.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="reason-empty">No positive trust signals detected yet.</p>
              )}
            </div>

            <div>
              <h5 className="reason-heading con">Cons</h5>
              {reasonBuckets.cons.length ? (
                <ul className="reason-list reason-list-con">
                  {reasonBuckets.cons.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="reason-empty">No significant risk signals were detected.</p>
              )}
            </div>
          </div>
        </div>

        <div className="score-detail-card">
          <h4>How to reach 100% Legit</h4>
          <ul>
            {improvementTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {canTrack ? (
        <div style={{ marginTop: "0.75rem" }}>
          <button
            onClick={onTrackToggle}
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "10px",
              padding: "0.5rem 0.85rem",
              background: isTracked
                ? "linear-gradient(180deg,#7a0000,#4f0000)"
                : "linear-gradient(180deg,#1f7dff,#1657af)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            {isTracked ? "Stop tracking" : "Track this profile"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
