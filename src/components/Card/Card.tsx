import styles from "./card.module.css";

const Card: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className={styles.cardContainer}>{props.children}</div>;
};

export default Card;
