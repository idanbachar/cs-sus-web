import "./App.css";
import SearchUser from "./components/SearchUser/SearchUser";
import { useEffect, useState } from "react";
import { IUser } from "./interfaces/IUser";
import SteamUser from "./components/SteamUser/SteamUser";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { GetUser } from "./services/steamService";
import Header from "./components/Header/Header";
import {
  CheckIsLoggedIn,
  GetLoggedInParamsFromUrl,
  GetLoggedInUserDataFromCookies,
} from "./services/loginService";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice";
import { CreateUser, IsUserExists } from "./services/firebaseService";

const App = () => {
  const [steamUser, setSteamUser] = useState<IUser | null>(null);
  const [queryParameters] = useSearchParams();
  const steamUrlParam = queryParameters.get("steamUrl");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (steamUrlParam) {
      (async () => {
        const steamUserData = await GetUser(steamUrlParam);
        setSteamUser(steamUserData);
      })();
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      const isLoggedIn = CheckIsLoggedIn();
      if (!isLoggedIn) {
        if (location.pathname === "/login-succeed") {
          const loggedInUserData = GetLoggedInParamsFromUrl(queryParameters);
          if (loggedInUserData) {
            const isUserExists = await IsUserExists(loggedInUserData.id);
            if (!isUserExists) {
              await CreateUser({ ...loggedInUserData, trackingList: [] });
            }
            navigate(`/`, {
              replace: true,
            });
          } else {
            navigate(`/`, {
              replace: true,
            });
          }
        }
      } else {
        const loggedInUserData = GetLoggedInUserDataFromCookies();
        if (loggedInUserData) {
          dispatch(setUser(loggedInUserData));
        }
      }
    })();
  }, [location]);

  return (
    <div className="App">
      <Header />
      <section className="SearchArea">
        <Link to={"/"}>
          <h1 className="title">
            CS:<span style={{ color: "darkred" }}>SUS</span>
          </h1>
        </Link>
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
