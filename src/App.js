import React from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Routes from "./routes";
import AppBar from "./AppBar";
import "./App.css";

const Header = ({ title }) => <header>{title}</header>;
const Main = ({ title }) => <main>{title}</main>;
const Footer = ({ title }) => <footer>{<span> TESTE </span>}</footer>;

function App({ header, main, footer }) {
  return (
    <div className="app">
      <Header title={<AppBar />} />
      <Main className="teste" title={<Routes />} />
      <Footer title={footer} />
    </div>
  );
}

export default App;

// <>
//   <AppBar />
//   <div>
//     {/* <img style={{ width: "40%" }} src={logo} alt="AirBnb" /> */}
//     <div>
//       testexxxz
//       <Routes />
//     </div>
//   </div>
// </>
