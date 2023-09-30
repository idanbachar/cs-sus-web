import { ILoader } from "../../interfaces/ILoader";
import styles from "./loader.module.css";

const Loader: React.FC<ILoader> = (props) => {
  const { cssStyles } = props;
  return (
    <div className={styles.container} style={cssStyles}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
