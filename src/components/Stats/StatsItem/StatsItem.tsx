import { IStatsItem } from "../../../interfaces/IStatsItem";
import styles from "./stats-item.module.css";

const StatsItem: React.FC<IStatsItem> = (props) => {
  const { title, value, cssStyles, isSus, textAfterValue = "" } = props;
  const color = isSus !== undefined ? (isSus ? "darkred" : "green") : "";
  return (
    <div
      className={styles.container}
      style={{ ...cssStyles, border: isSus ? `3px solid ${color}` : "" }}
    >
      <span style={{ color: "#7281c5" }}>{title}</span>
      <div className={styles.titleValueContainer}>
        <span className={styles.value} style={{ color }}>
          {value !== -1 ? Intl.NumberFormat().format(value) : "Private"}{" "}
          {textAfterValue}
        </span>
      </div>
    </div>
  );
};

export default StatsItem;
