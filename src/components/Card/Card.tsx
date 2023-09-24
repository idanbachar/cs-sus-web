import styles from "./card.module.css";

const Card: React.FC<{
  children: React.ReactNode;
  backgroundColor?: string;
}> = (props) => {
  const { children } = props;

  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundColor: props.backgroundColor }}
    >
      {props.children}
    </div>
  );
};

export default Card;
