import "./App.css";
import SearchUser from "./components/SearchUser/SearchUser";
import { useState } from "react";
import { IUser } from "./interfaces/IUser";
import SteamUser from "./components/SteamUser/SteamUser";
import SteamFriends from "./components/SteamFriends/SteamFriends";
import SteamUserPreview from "./components/SteamUser/SteamUserPreview/SteamUserPreview";

const App = () => {
  const [steamUser, setSteamUser] = useState<IUser | null>(null);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          backgroundColor: "#0a0b0f",
          width: "100%",
          justifyContent: "space-around",
          height: "30vh",
        }}
      >
        {steamUser && <SteamUserPreview {...steamUser} />}
        <section className="SearchArea">
          <h1>Who is SUS?</h1>
          <SearchUser
            placeholder={"Enter suspicious steam url"}
            onSearch={(userData) => {
              setSteamUser(userData);
            }}
          />
        </section>
      </div>
      {steamUser && (
        <div className="userContainer">
          {steamUser.friends && (
            <section className="userFriendsArea">
              <h1 style={{ color: "white" }}>
                {steamUser.friends.length} Friends
              </h1>
              <div
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                  maxHeight: "76vh",
                }}
              >
                <SteamFriends friends={steamUser.friends} />
              </div>
            </section>
          )}
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
