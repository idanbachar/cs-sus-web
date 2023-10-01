import styles from "./header.module.css";
import steamLogo from "../../assets/images/steam_logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoggedInUser from "../LoggedInUser/LoggedInUser";
import { Logout } from "../../services/loginService";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import { IMenuItem } from "../../interfaces/IMenu";

const Header: React.FC = () => {
  const loggedInUser = useSelector(
    (state: RootState) => state.loggedInUser.user
  );

  const menuItems = [
    { text: "Home", route: `/` },
    loggedInUser
      ? {
          text: "Profile",
          route: `/search?steamUrl=${loggedInUser?.profileurl}`,
        }
      : undefined,
    loggedInUser
      ? {
          text: `Tracking list (${
            loggedInUser?.trackingList ? loggedInUser?.trackingList.length : 0
          })`,
          route: "/myTrackingList",
        }
      : undefined,
  ].filter((item) => item !== undefined) as IMenuItem[];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {!loggedInUser ? (
          <a href="http://localhost:4000/auth/steam" className={styles.signIn}>
            <img src={steamLogo} width={30} />
            <span style={{ color: "black" }}>Login with Steam</span>
          </a>
        ) : (
          <LoggedInUser
            {...loggedInUser}
            onLogout={() => {
              Logout();
            }}
          />
        )}
        <Menu menuItems={menuItems} />
        <h1 className={styles.title}>
          <Link to={"/"}>
            CS:<span style={{ color: "darkred" }}>SUS</span>
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
