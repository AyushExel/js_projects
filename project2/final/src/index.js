import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <div>
    <App defaultContent={"/content.jpg"} defaultStyle={"/style.png"} />
  </div>,
  document.getElementById("root")
);
