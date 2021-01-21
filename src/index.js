import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { StateProvider } from "./Files/StateProvider";
import { initialState } from "./Files/reducer";
import reducer from "./Files/reducer";
import * as serviceWorker from "./serviceWorker";

let RootDirectory = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  RootDirectory
);

serviceWorker.register();
