import styles from "./card.module.css";

const Card: React.FC<{
  children: React.ReactNode;
  cssStyles?: React.CSSProperties;
}> = (props) => {
  const { children, cssStyles } = props;

  return (
    <div className={styles.cardContainer} style={cssStyles}>
      {children}
    </div>
  );
};

export default Card;
