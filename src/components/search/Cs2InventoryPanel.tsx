import { StatItem } from "@/components/search/StatItem";
import { ICS2InventorySignal } from "@/lib/types/steam";

interface Cs2InventoryPanelProps {
  cs2Inventory: ICS2InventorySignal;
  formatNumber: (value: number | undefined) => string;
}

export function Cs2InventoryPanel({ cs2Inventory, formatNumber }: Cs2InventoryPanelProps) {
  return (
    <section className="inventory-panel">
      <div className="inventory-title-cell">
        <h3>CS2 Inventory</h3>
        <p>
          {cs2Inventory.isPublic === true
            ? "Public"
            : cs2Inventory.isPublic === false
              ? "Private / Hidden"
              : "Unknown"}
        </p>
      </div>

      {cs2Inventory.isPublic === true ? (
        <>
          <StatItem label="Items" value={formatNumber(cs2Inventory.totalItems)} className="inventory-stat-item" />
          <StatItem label="Rare Items" value={formatNumber(cs2Inventory.rareItems)} className="inventory-stat-item" />
          <StatItem label="Premium Items" value={formatNumber(cs2Inventory.premiumItems)} className="inventory-stat-item" />
        </>
      ) : cs2Inventory.isPublic === false ? (
        <div className="inventory-private-note">Inventory is private, so item statistics are unavailable.</div>
      ) : (
        <div className="inventory-private-note">Inventory visibility could not be determined right now.</div>
      )}
    </section>
  );
}
