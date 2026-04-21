import { CHEATER_SCORE_CONFIG } from "@/lib/scoring/cheater-score-config";

type LegendTone = "risk" | "trust";

interface LegendItem {
  label: string;
  weight: number;
  type: LegendTone;
}

const SCORE_MAX = CHEATER_SCORE_CONFIG.limits.maxScore;

const WEIGHT_LEGEND: LegendItem[] = [
  { label: "VAC/Game ban", weight: CHEATER_SCORE_CONFIG.hardStops.vacOrGameBan.score, type: "risk" },
  { label: "Heavily hidden profile", weight: CHEATER_SCORE_CONFIG.hardStops.heavilyHiddenProfile.score, type: "risk" },
  { label: "Private profile", weight: CHEATER_SCORE_CONFIG.profilePrivacy.private.weight, type: "risk" },
  {
    label: "Low account age",
    weight: Math.max(...CHEATER_SCORE_CONFIG.accountAge.map((tier) => tier.weight)),
    type: "risk",
  },
  {
    label: "Low friends",
    weight: Math.max(...CHEATER_SCORE_CONFIG.friends.map((tier) => tier.weight)),
    type: "risk",
  },
  {
    label: "Low games",
    weight: Math.max(...CHEATER_SCORE_CONFIG.games.map((tier) => tier.weight)),
    type: "risk",
  },
  {
    label: "Low badges/hidden",
    weight: Math.max(
      CHEATER_SCORE_CONFIG.badges.hidden.weight,
      ...CHEATER_SCORE_CONFIG.badges.tiers.map((tier) => tier.weight)
    ),
    type: "risk",
  },
  {
    label: "Low Steam level/hidden",
    weight: Math.max(
      CHEATER_SCORE_CONFIG.steamLevel.hidden.weight,
      ...CHEATER_SCORE_CONFIG.steamLevel.tiers.map((tier) => tier.weight)
    ),
    type: "risk",
  },
  {
    label: "Low CS2 hours/missing",
    weight: Math.max(
      CHEATER_SCORE_CONFIG.cs2.missing.weight,
      ...CHEATER_SCORE_CONFIG.cs2.hours.map((tier) => tier.weight)
    ),
    type: "risk",
  },
  {
    label: "CS2 stat anomalies",
    weight: Math.max(
      ...CHEATER_SCORE_CONFIG.cs2.headshotAnomalies.map((anomaly) => anomaly.weight),
      ...CHEATER_SCORE_CONFIG.cs2.winsPerHourAnomalies.map((anomaly) => anomaly.weight)
    ),
    type: "risk",
  },
  {
    label: "Private inventory",
    weight: CHEATER_SCORE_CONFIG.cs2.inventory.private.weight,
    type: "risk",
  },
  {
    label: "Strong inventory trust bonus",
    weight: Math.min(
      ...CHEATER_SCORE_CONFIG.cs2.inventory.rareItems.map((tier) => tier.weight),
      ...CHEATER_SCORE_CONFIG.cs2.inventory.premiumItems.map((tier) => tier.weight),
      ...CHEATER_SCORE_CONFIG.cs2.inventory.totalItems.map((tier) => tier.weight)
    ),
    type: "trust",
  },
];

const formatWeightPoints = (weight: number, type: LegendTone) => {
  const sign = type === "risk" ? "+" : "-";
  return `${sign}${Math.abs(weight)} pts`;
};

export function ScoreWeightLegend() {
  return (
    <aside className="score-legend-float" aria-label="Score weights legend">
      <h4>Weights Legend</h4>
      <p>Impact on risk score (max cap: {SCORE_MAX})</p>
      <p>Red adds risk. Green reduces risk.</p>
      <ul>
        {WEIGHT_LEGEND.map((item) => (
          <li key={item.label} className={item.type === "risk" ? "risk" : "trust"}>
            <span>{item.label}</span>
            <strong>{formatWeightPoints(item.weight, item.type)}</strong>
          </li>
        ))}
      </ul>
    </aside>
  );
}
