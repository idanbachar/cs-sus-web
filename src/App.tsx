import "./App.css";
import SearchUser from "./components/SearchUser/SearchUser";
import { useState } from "react";
import { IUser } from "./interfaces/IUser";
import SteamUser from "./components/SteamUser/SteamUser";
import SteamFriends from "./components/SteamFriends/SteamFriends";

const App = () => {
  const [steamUser, setSteamUser] = useState<IUser | null>(null);

  return (
    <div className="App">
      <section className="SearchArea">
        <h1>Who is SUS?</h1>
        <SearchUser
          placeholder={"Enter suspicious steam url"}
          onSearch={(userData) => {
            setSteamUser(userData);
          }}
        />
      </section>
      {steamUser && (
        <div className="userContainer">
          <section className="userFriendsArea">
            {steamUser.friends && <SteamFriends friends={steamUser.friends} />}
          </section>
          <section className={"SearchedUserArea"}>
            <SteamUser {...steamUser} />
          </section>
          <section></section>
        </div>
      )}
    </div>
  );
};

export default App;
