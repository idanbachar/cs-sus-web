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
