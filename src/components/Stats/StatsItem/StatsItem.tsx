import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { IStatsItem } from "../../../interfaces/IStatsItem";
import styles from "./stats-item.module.css";

const StatsItem: React.FC<IStatsItem> = (props) => {
  const {
    title,
    value,
    cssStyles,
    isSus,
    isArrow = false,
    textAfterValue = "",
  } = props;
  const color = isSus !== undefined ? (isSus ? "darkred" : "green") : "";
  return (
    <div
      className={styles.container}
      style={{ ...cssStyles, border: color && `2px solid ${color}` }}
    >
      <span style={{ color: "#7281c5" }}>{title}</span>
      <div className={styles.titleValueContainer}>
        <span className={styles.value} style={{ color }}>
          {value !== -1 ? Intl.NumberFormat().format(value) : "Private"}{" "}
          {textAfterValue}
        </span>
        {isArrow && isSus !== undefined ? (
          isSus ? (
            <BsArrowDown color={color} />
          ) : (
            <BsArrowUp color={color} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default StatsItem;
