import "./App.css";
import SearchUser from "./components/SearchUser/SearchUser";
import { useState } from "react";
import { IUser } from "./interfaces/IUser";
import SteamUser from "./components/SteamUser/SteamUser";
import SteamUserPreview from "./components/SteamUser/SteamUserPreview/SteamUserPreview";
import Card from "./components/Card/Card";
import TitleDescription from "./components/TitleDescription/TitleDescription";

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
      {steamUser && <SteamUser {...steamUser} />}
    </div>
  );
};

export default App;
