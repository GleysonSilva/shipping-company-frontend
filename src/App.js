import React from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Routes from "./routes";

function App() {
  return (
    <div class="container">
      <img style={{ width: "40%" }} src={logo} alt="AirBnb" />
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
