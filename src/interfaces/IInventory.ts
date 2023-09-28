export interface IInventoryItem {
  icon_url: string;
  icon_url_large: string;
  marketable: number;
  name: string;
  name_color: string;
  tradable: number;
  type: string;
}

export interface IInventory {
  items: IInventoryItem[];
}
