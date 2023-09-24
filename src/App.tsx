import "./App.css";
import SearchUser from "./components/SearchUser/SearchUser";
import { useState } from "react";
import { IUser } from "./interfaces/IUser";
import SteamUser from "./components/SteamUser/SteamUser";

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
      <section className={"SearchedUserArea"}>
        {steamUser && <SteamUser {...steamUser} />}
      </section>
    </div>
  );
};

export default App;
