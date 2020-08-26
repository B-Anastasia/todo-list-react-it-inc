import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
// import AppWithReducers from "./AppWithReducers";
import AppWithHookReducer from "./AppWithHookReducer";

ReactDOM.render(<AppWithHookReducer />, document.getElementById("root"));

serviceWorker.unregister();
