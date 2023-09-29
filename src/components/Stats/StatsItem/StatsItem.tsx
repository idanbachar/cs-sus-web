import { IStatsItem } from "../../../interfaces/IStatsItem";
import styles from "./stats-item.module.css";
import { Fragment } from "react";

const StatsItem: React.FC<IStatsItem> = (props) => {
  const { info, cssStyles, isSus, textAfterValue = "" } = props;
  const color = isSus !== undefined ? (isSus ? "darkred" : "green") : "";
  return (
    <div className={styles.container} style={{ ...cssStyles }}>
      {info.map((infoItem, key) => (
        <Fragment key={key}>
          {key !== 0 && key !== info.length ? "|" : ""}
          <span style={{ color: "#7281c5" }}>{infoItem.title}</span>
          <div className={styles.titleValueContainer}>
            <span className={styles.value} style={{ color }}>
              {infoItem.value !== -1
                ? Intl.NumberFormat().format(infoItem.value)
                : "Private"}{" "}
              {textAfterValue}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default StatsItem;
