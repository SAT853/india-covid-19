import React from "react";
import logo from "../assets/corona-logo.svg";
const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>
        Covid-19 Coronavirus Outbreak by{" "}
        <a href="https://github.com/SAT853/india-covid-19">SAT853</a>
      </h1>
    </header>
  );
};

export default Header;
