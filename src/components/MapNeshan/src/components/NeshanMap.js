import React, { useEffect, useRef } from "react";
import neshan_map_loader from "./loaders/neshan_map_loader";

const NeshanMap = (props) => {
  const { style, options, onInit } = props;
  const mapEl = useRef(null);

  const defaultStyle = {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    background: "#eee",
    zIndex: "1",
  };

  const defaultOptions = {
    key: "web.15583cc565e24c2b9990f48d5ef8493f",
    maptype: "dreamy",
    poi: true,
    traffic: false,
    center: [35.699739, 51.338097],
    zoom: 10,
  };

  useEffect(() => {
    neshan_map_loader({
      onLoad: () => {
        let map = new window.L.Map(mapEl.current, { ...defaultOptions, ...options });
        if (onInit) onInit(window.L, map);
      },
      onError: () => {
        console.error("Neshan Maps Error: This page didn't load Neshan Maps correctly");
      },
    });
  },[]);
  
  return <div ref={mapEl} style={{ ...defaultStyle, ...style }} />;
};

export default NeshanMap;
