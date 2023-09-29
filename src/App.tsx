import "./App.css";
import SearchUser from "./components/SearchUser/SearchUser";
import { useEffect, useState } from "react";
import { IUser } from "./interfaces/IUser";
import SteamUser from "./components/SteamUser/SteamUser";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GetUser } from "./services/steamService";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore/lite";
import Header from "./components/Header/Header";
import axios from "axios";
import {
  CheckIsLoggedIn,
  GetLoggedInParamsFromUrl,
  GetLoggedInUserDataFromCookies,
} from "./services/loginService";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";

const App = () => {
  const [steamUser, setSteamUser] = useState<IUser | null>(null);
  const [queryParameters] = useSearchParams();
  const steamUrlParam = queryParameters.get("steamUrl");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // (async () => {
  //   const usersCollection = collection(db, "users");
  //   const usersSnapshot = await getDocs(usersCollection);
  //   const usersList = usersSnapshot.docs.map((doc) => doc.data());
  //   console.log("usersList", usersList);

  //   return usersList;
  // })();

  useEffect(() => {
    if (steamUrlParam) {
      (async () => {
        const steamUserData = await GetUser(steamUrlParam);
        setSteamUser(steamUserData);
      })();
    }
  }, [location]);

  useEffect(() => {
    const isLoggedIn = CheckIsLoggedIn();
    if (!isLoggedIn) {
      if (location.pathname === "/login-succeed") {
        const loggedInUserData = GetLoggedInParamsFromUrl(queryParameters);
        if (loggedInUserData) {
          navigate(`/`);
        }
      }
    } else {
      const loggedInUserData = GetLoggedInUserDataFromCookies();
      if (loggedInUserData) {
        dispatch(setUser(loggedInUserData));
      }
    }
  }, [location]);

  return (
    <div className="App">
      <Header />
      <section className="SearchArea">
        <h1>
          CS:<span style={{ color: "darkred" }}>SUS</span>
        </h1>
        <SearchUser
          placeholder={"Who is sus?"}
          onSearch={(userData) => {
            setSteamUser(userData);
          }}
        />
      </section>
      {steamUser && <SteamUser {...steamUser} />}
    </div>
  );
};

export default App;
