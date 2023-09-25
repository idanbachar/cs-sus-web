import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { ITitleDescription } from "../../interfaces/ITitleDescription";
import styles from "./title-decsription.module.css";

const TitleDescription: React.FC<ITitleDescription> = (props) => {
  const { title, description, cssStyles, isSus, isArrow = false } = props;

  const color = isSus !== undefined ? (isSus ? "darkred" : "green") : "";

  return (
    <div className={styles.container} style={{ ...cssStyles }}>
      <span style={{ color: "#7281c5" }}>{title}</span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color,
            border: color && `2px solid ${color}`,
            fontWeight: "bold",
          }}
        >
          {description}
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

export default TitleDescription;
