import { setUser } from "../redux/slices/userSlice";
import { store } from "../redux/store";
import { GetCookie, deleteCookie, setCookie } from "./cookiesService";

export const HandleLogin = () => {};

export const CheckIsLoggedIn = (): boolean => {
  const username = GetCookie("username");
  const id = GetCookie("id");
  const avatar = GetCookie("avatar");
  if (username !== undefined && id !== undefined && avatar !== undefined)
    return true;
  return false;
};

export const GetLoggedInParamsFromUrl = (queryParameters: URLSearchParams) => {
  const username = queryParameters.get("username");
  const id = queryParameters.get("id");
  const avatar = queryParameters.get("avatar");
  const profileurl = queryParameters.get("profileurl");

  if (username && id && avatar && profileurl) {
    setCookie("username", username, 1);
    setCookie("id", id, 1);
    setCookie("avatar", avatar, 1);
    setCookie("profileurl", profileurl, 1);
    return { username, id, avatar };
  }
  return null;
};

export const GetLoggedInUserDataFromCookies = () => {
  const username = GetCookie("username");
  const id = GetCookie("id");
  const avatar = GetCookie("avatar");
  const profileurl = GetCookie("profileurl");
  if (username && id && avatar && profileurl) {
    return { username, id, avatar, profileurl };
  }
  return null;
};

export const Logout = () => {
  deleteCookie("username");
  deleteCookie("id");
  deleteCookie("avatar");
  deleteCookie("profileurl");
  store.dispatch(setUser(null));
};
