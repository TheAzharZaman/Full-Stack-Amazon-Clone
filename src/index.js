import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { StateProvider } from "./Files/StateProvider";
import { initialState } from "./Files/reducer";
import reducer from "./Files/reducer";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";

let RootDirectory = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <Provider store={store}>
        <App />
      </Provider>
    </StateProvider>
  </React.StrictMode>,
  RootDirectory
);

serviceWorker.register();
