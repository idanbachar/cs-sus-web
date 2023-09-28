import { IInventoryItem } from "../../interfaces/IInventory";

const InventoryItem: React.FC<IInventoryItem> = (props) => {
  const { name, name_color, icon_url_large, icon_url, type } = props;
  return (
    <>
      {(type.includes("Covert Knife") ||
        type.includes("Extraordinary Gloves")) && (
        <img
          src={icon_url_large}
          width={"90"}
          height={"90"}
          style={{ border: `1px solid #${name_color}` }}
        />
      )}
    </>
  );
};

export default InventoryItem;
