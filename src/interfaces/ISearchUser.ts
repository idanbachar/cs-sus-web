import { IUser } from "./IUser";

export interface ISearchUser {
  placeholder?: string;
  onSearch: (userData: IUser | null) => void;
}
