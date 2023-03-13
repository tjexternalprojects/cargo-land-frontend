import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';

type Props = {
  address: string;
};

const NominatimMap: React.FC<Props> = ({ address }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [mapId, setMapId] = useState<string>(`map-${Math.random().toString(36).substr(2, 9)}`); // generate unique id

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
      const data = await response.json();
      console.log(data)
      if (data && data.length > 0) {
        // setLocation({ latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) });
        setLocation({ latitude: 6.499183599999999, longitude: 3.3090219 });
  
      }
    };
    fetchLocation();
  }, [address]);

  useEffect(() => {
    if (location) {
      const newMap = new Map({
        target: mapId, // use unique id as target
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([location.longitude, location.latitude]),
          zoom: 16,
        }),
      });

      const marker = new Feature({
        geometry: new Point(fromLonLat([location.longitude, location.latitude])),
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        }),
      });

      marker.setStyle(iconStyle);

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });

      newMap.addLayer(vectorLayer);

      return () => {
        newMap.setTarget('');
      };
    }
  }, [location, mapId]);

  return <div id={mapId} style={{ height: '400px' }}></div>; // use unique id for the div
};

export default NominatimMap;
