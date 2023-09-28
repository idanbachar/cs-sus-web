import { IInventory } from "../../interfaces/IInventory";
import InventoryItem from "./InventoryItem";
import styles from "./inventory.module.css";

const Inventory: React.FC<IInventory> = (props) => {
  const { items } = props;
  return (
    <div className={styles.inventory}>
      {items.map((item, index) => (
        <InventoryItem {...item} key={index} />
      ))}
    </div>
  );
};

export default Inventory;
