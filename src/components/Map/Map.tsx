import React from "react";
import App from "../MapNeshan/src/App";
// import NeshanMap from 'react-neshan-map-leaflet';

// import GoogleMapReact from 'google-map-react';
// interface x{
//     lat:number;
//     lng:number;
//     text:any;
// }
// const AnyReactComponent = ({ text }:x) => <div>{text}</div>;

const Map:React.FC<{x:Number, y:Number, handleLocation? :(a:number,b:number)=>void}> = ({ x, y, handleLocation })=> {


  return (
    // Important! Always set the container height explicitly
    <div className="lg:w-[90%] lgmin:w-[35%] lg:h-[200px] lgmin:h-[300px]">
      <App x={x} y={y} handleLocation = {handleLocation? handleLocation:null}/>
    </div>
  );
}
export default Map;