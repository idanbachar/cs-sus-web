import styles from "./header.module.css";
import steamLogo from "../../assets/images/steam_logo.png";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <a href="http://localhost:4000/auth/steam" className={styles.signIn}>
        <img src={steamLogo} width={30} />
        <span>Login with Steam</span>
      </a>
    </header>
  );
};

export default Header;
