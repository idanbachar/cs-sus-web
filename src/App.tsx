import React from "react";
import "./App.css";
import SearchUser from "./components/SearchUser/SearchUser";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Who is SUS?</h1>
        <SearchUser />
      </header>
    </div>
  );
}

export default App;
