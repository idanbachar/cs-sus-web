import { Link } from "react-router-dom";
import { IMenu } from "../../interfaces/IMenu";
import styles from "./menu.module.css";

const Menu: React.FC<IMenu> = (props) => {
  const { menuItems } = props;

  return (
    <ul className={styles.menuItems}>
      {menuItems.map((menuItem, key) => (
        <li key={key} className={styles.menuItem}>
          {menuItem.route ? (
            <Link to={menuItem.route}>{menuItem.text}</Link>
          ) : (
            menuItem.text
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
