import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { FooterComponent } from "./components/Footer";
import { NavBarComponent } from "./components/Navbar";

ReactDOM.render(
  [
    <NavBarComponent />,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    <FooterComponent />
  ],
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
