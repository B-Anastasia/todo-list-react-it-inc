import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App/App";

ReactDOM.render(
  // <Provider store={store}>
  //   <AppWithRedux />
  // </Provider>,
    <App/>,
  document.getElementById("root")
);

serviceWorker.unregister();
