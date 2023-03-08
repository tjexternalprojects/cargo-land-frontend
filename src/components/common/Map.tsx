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
  id: string;
};

const NominatimMap: React.FC<Props> = ({ address, id }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
      const data = await response.json();
      if (data && data.length > 0) {
        setLocation({ latitude: parseFloat(data[0].lat), longitude: parseFloat(data[0].lon) });
      }
    };
    fetchLocation();
  }, [address]);

  useEffect(() => {
    if (location) {
      const newMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([location.longitude, location.latitude]),
          zoom: 12,
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
  }, [location]);

  return <div id={id} style={{ height: '400px' }}></div>;
};

export default NominatimMap;
