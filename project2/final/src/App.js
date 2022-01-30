import React, { useState, useEffect } from "react";
import { imagedata_to_image } from "./utils";
import * as mi from "@magenta/image";
import "./App.css";

function App({ defaultContent, defaultStyle }) {
  const [content, setContent] = useState(defaultContent);
  const [style, setStyle] = useState(defaultStyle);
  const [initialized, SetInitialized] = useState(false);
  const [strength, setStrength] = useState(0.5);
  const [model, setModel] = useState(new mi.ArbitraryStyleTransferNetwork());
  const [result, setResult] = useState("");

  useEffect(() => {
    model
      .initialize()
      .then(() => {
        SetInitialized(true);
      })
      .catch((error) => console.log(error));
  }, [model]);

  useEffect(() => {
    model.initialized && stylize();
  });

  const handleContentImageChange = (e) => {
    setContent(URL.createObjectURL(e.target.files[0]));
  };

  function stylize() {
    // tf.js(magenta) accepts HTMLElement data-type. Cast img into HTMLElement using Image()
    let cimg = new Image(256, 256);
    let simg = new Image(256, 256);
    cimg.src = content;
    simg.src = style;
    model.stylize(cimg, simg, strength).then((imageData) => {
      // util to convert canvas ImageData to Image() object
      const img = imagedata_to_image(imageData);
      setResult(img.src);
    });
  }

  if (!initialized) {
    return <div className="loader"></div>;
  }

  return (
    <div className="App">
      <div className="row">
        <div className="column">
          <img src={content} alt="content" />
          <br />
          <input type="file" onChange={handleContentImageChange} />
        </div>

        <div className="column">
          <img src={style} alt="style" />
          <br />
          <input
            type="file"
            onChange={(e) => setStyle(URL.createObjectURL(e.target.files[0]))}
          />
        </div>

        <div className="column">
          <img src={result} />
        </div>
      </div>
      <div className="row slide_container">
        <input
          type="range"
          min="0.0"
          max="100.0"
          className="slider"
          onChange={(e) => {
            setStrength(e.target.value / 100);
          }}
        />
      </div>
    </div>
  );
}

export default App;
