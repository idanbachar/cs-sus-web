import Search from "../../components/Search/Search";
import styles from "./homepage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Search placeholder={"Enter steam profile url"} />
    </div>
  );
};

export default HomePage;
