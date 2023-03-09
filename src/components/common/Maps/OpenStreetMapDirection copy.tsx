import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Stroke, Style } from 'ol/style';
import { LineString } from 'ol/geom';
import { getVectorContext } from 'ol/render';

function OpenLayersMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const markerSource = new VectorSource();

    const markerStyle = new Style({
      image: new Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      }),
    });

    const markerLayer = new VectorLayer({
      source: markerSource,
      style: markerStyle,
    });

    map.addLayer(markerLayer);

    const routeSource = new VectorSource();
    const routeLayer = new VectorLayer({
      source: routeSource,
      style: new Style({
        stroke: new Stroke({
          width: 6,
          color: [40, 40, 40, 0.8],
        }),
      }),
    });
    map.addLayer(routeLayer);
// https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords.lng()},${startCoords.lat()}&end=${endCoords.lng()},${endCoords.lat()}
    const start = 'No. 56, Felly Akurunwa Street, Ago Palace Way, Okota, Isolo Road, Nigeria, Lagos'
	const end = 'Blenco Bustop, 4 Gani Adedayo Close, Idowu Dabiri Street, Lekki - Epe Expy, Aja, Lagos'
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624875cf2303e7ca4f449b051b2aa1a1b570&start=${start}&end=${end}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const coordinates = data.features[0].geometry.coordinates;
        const route = new LineString(coordinates).transform(
          'EPSG:4326',
          'EPSG:3857'
        );
        routeSource.addFeature(new Feature(route));
        const extent = route.getExtent();
        map.getView().fit(extent, { padding: [50, 50, 50, 50] });
      });

    return () => {
      map.setTarget('');
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
}

export default OpenLayersMap;
