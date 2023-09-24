import { IUser } from "../interfaces/IUser";
import axios from "axios";
export const BASE_URL = "http://localhost:4000";

export const GetUser = async (steamURL: string) => {
  try {
    const response = await axios(`${BASE_URL}/getUser?steamUrl=${steamURL}`);
    return response.data as IUser | null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
