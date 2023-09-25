import "./App.css";
import SearchUser from "./components/SearchUser/SearchUser";
import { useEffect, useState } from "react";
import { IUser } from "./interfaces/IUser";
import SteamUser from "./components/SteamUser/SteamUser";
import { useLocation, useSearchParams } from "react-router-dom";
import { GetUser } from "./services/steamService";
import { db } from "./firebase/config";
import { collection, getDocs } from "firebase/firestore/lite";

const App = () => {
  const [steamUser, setSteamUser] = useState<IUser | null>(null);
  const [queryParameters] = useSearchParams();
  const steamUrlParam = queryParameters.get("steamUrl");

  const location = useLocation();

  (async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    console.log("usersList", usersList);

    return usersList;
  })();

  useEffect(() => {
    if (steamUrlParam) {
      (async () => {
        const steamUserData = await GetUser(steamUrlParam);
        setSteamUser(steamUserData);
      })();
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
