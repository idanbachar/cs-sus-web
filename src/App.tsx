import "./App.css";
import SearchUser from "./components/SearchUser/SearchUser";
import { useEffect, useState } from "react";
import { IUser } from "./interfaces/IUser";
import SteamUser from "./components/SteamUser/SteamUser";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { GetUser } from "./services/steamService";

const App = () => {
  const [steamUser, setSteamUser] = useState<IUser | null>(null);
  const location = useLocation();

  useEffect(() => {
    const paramsString =
      location.search.indexOf("?") !== -1
        ? location.search.split("?")[1]
        : undefined;
    if (paramsString) {
      const params = queryString.parse(paramsString);
      const steamUrl = params?.steamUrl as string;
      if (steamUrl) {
        (async () => {
          const steamUserData = await GetUser(steamUrl);
          setSteamUser(steamUserData);
        })();
      }
    }
  }, [location]);

  return (
    <div className="App">
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
