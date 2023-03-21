import NeshanMap from "./components/NeshanMap";

function App({x,y, handleLocation}) {
  return (
    <div className="h-full w-full">
      {/* <NeshanMap
        options={{
          key: 'web.15583cc565e24c2b9990f48d5ef8493f',
          center: [35.699739, 51.338097],
          zoom: 13
        }}
      /> */}
      <NeshanMap
        x={x}
        t={y}
        options={{
          key: 'web.15583cc565e24c2b9990f48d5ef8493f',
          maptype: 'dreamy',
          poi: true,
          traffic: false,
          center: [x, y],
          zoom: 10
        }}

        onInit={(L, myMap) => {
          let marker = L.marker([x, y])
            .addTo(myMap)
            .bindPopup('I am a popup.');

          handleLocation && myMap.on('click', function (e) {
            marker.setLatLng(e.latlng)
            handleLocation(e.latlng.lat,e.latlng.lng)
          });
        }}
      />
    </div>
  );
}

export default App;
