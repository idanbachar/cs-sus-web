import styles from "./header.module.css";
import steamLogo from "../../assets/images/steam_logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoggedInUser from "../LoggedInUser/LoggedInUser";
import { Logout } from "../../services/loginService";

const Header: React.FC = () => {
  const loggedInUser = useSelector(
    (state: RootState) => state.loggedInUser.user
  );

  return (
    <header className={styles.header}>
      {!loggedInUser ? (
        <a href="http://localhost:4000/auth/steam" className={styles.signIn}>
          <img src={steamLogo} width={30} />
          <span>Login with Steam</span>
        </a>
      ) : (
        <LoggedInUser
          {...loggedInUser}
          onLogout={() => {
            Logout();
          }}
        />
      )}
    </header>
  );
};

export default Header;
