import React, { useRef, useState, useEffect } from "react";
const ColorThief = require("color-thief");

const ImageColorExtractor = ({ imageUrl }) => {
  const imgRef = useRef(null);
  const [dominantColor, setDominantColor] = useState(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      extractColor();
    }
  }, [imageUrl]);

  const onLoad = () => {
    extractColor();
  };

  const extractColor = () => {
    const colorThief = new ColorThief();
    const color = colorThief.getColor(imgRef.current);
    setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
  };

  return (
    <>
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Sample"
        crossOrigin="anonymous"
        onLoad={onLoad}
      />
      {dominantColor && (
        <div
          style={{
            backgroundColor: dominantColor,
            width: "100px",
            height: "100px",
          }}
        ></div>
      )}
    </>
  );
};

export default ImageColorExtractor;
