import Search from "../../components/Search/Search";
import styles from "./homepage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Search placeholder={"Enter steam profile url"} />
      <div className={styles.information}>
        <h1 style={{ color: "darkred" }}>Welcome to CS-SUS</h1>
        <p style={{ color: "white" }}>
          <span>Infinite encounters with cheaters during matchmaking?</span>
          <br />
          <span>Track them now, and be the first to know</span>
          <br />
          <span>when their account is GG.</span>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
