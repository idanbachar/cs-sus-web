import styles from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Developed by Idan Bachar.</h1>
    </div>
  );
};

export default Footer;
