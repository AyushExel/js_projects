import React, { useState, useEffect } from "react";
import { imagedata_to_image } from "./utils";
import * as mi from "@magenta/image";
import "./App.css";

function App({ defaultContent, defaultStyle }) {
  return (
    <div className="App">
      <div className="row">
        <div className="column">
          <img alt="content" />
          <br />
          <input
            type="file"
            // onChange=
          />
        </div>

        <div className="column">
          <img alt="style" />
          <br />
          <input
            type="file"
            // onChange
          />
        </div>

        <div className="column">
          <img />
        </div>
      </div>
      <div className="row slide_container">
        <input
          type="range"
          min="0.0"
          max="100.0"
          className="slider"
          // onChange={}
        />
      </div>
    </div>
  );
}

export default App;
