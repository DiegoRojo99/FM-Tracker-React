import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import countriesData from './countries.geo.json';


function Map() {

  const [leagues, setLeagues] = useState([]);
  
  useEffect(() => {
    // Initialize map
    const map = L.map('map').setView([0, 0], 2);
    var countryJson;
    
    function zoomToFeature(e) {
      if(e?.target?.feature?.properties?.leagues){
        setLeagues(e.target.feature.properties.leagues);
      }
      else{
        setLeagues([])
      }
      map.fitBounds(e.target.getBounds());
    }
    function highlightFeature(e) {
      var layer = e.target;
      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });  
      layer.bringToFront();
    }
    function resetHighlight(e) {
      countryJson.resetStyle(e.target);
    }
    function onEachFeature(feature, layer) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
      });
    }

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    countryJson = L.geoJson(countriesData, {
      onEachFeature: onEachFeature
    }).addTo(map);

    // Cleanup function
    return () => {
      // Clean up map when component unmounts
      map.remove();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
    <div id="map" style={{ height: '400px', width: '95%', margin: '16px auto' }}></div>
    <div style={{ height: '128px', width: '95%', margin: '0 auto', backgroundColor: 'white' }}>
      {leagues && leagues.length ? 
      <>
        {leagues.map(l => <p style={{ margin: '16px 32px' }}>{l}</p>)}
      </> : 
      <></>}
    </div>
    </>
  );
}

export default Map;

  