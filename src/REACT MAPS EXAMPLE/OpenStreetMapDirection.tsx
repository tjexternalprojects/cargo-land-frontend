import React, { FC, useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import { LineString } from 'ol/geom';

import Point from 'ol/geom/Point.js';
import Polyline from 'ol/format/Polyline.js';
import XYZ from 'ol/source/XYZ.js';

// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import { getVectorContext } from 'ol/render.js';
const OPEN_STREET_MAP_API_KEY = import.meta.env.VITE_REACT_APP_OPEN_STREET_MAP_API_KEY;
const MAPTILER_KEY = import.meta.env.VITE_REACT_APP_MAPTILER_KEY;

type Props = {
	start_address: string;
	end_address: string;
};

const OpenLayersMap: FC<Props> = ({ start_address, end_address }) => {
	const attributions =
		'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
		'<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

	const mapRef = useRef(null);

	useEffect(() => {
		if (!mapRef.current) return;

		const styles = {
			route: new Style({
				stroke: new Stroke({
					width: 6,
					color: [237, 212, 0, 0.8],
				}),
			}),
			icon: new Style({
				image: new Icon({
					anchor: [0.5, 1],
					src: 'data/icon.png',
				}),
			}),
			geoMarker: new Style({
				image: new CircleStyle({
					radius: 7,
					fill: new Fill({ color: 'black' }),
					stroke: new Stroke({
						color: 'white',
						width: 2,
					}),
				}),
			}),
		};

		const startCoords = [3.3090219, 6.499183599999999];
		const endCoords = [3.2949878, 6.5505729];
		const routeSource = new VectorSource();
		const routeLayer = new VectorLayer({
			source: routeSource,
			style: new Style({
				image: new Icon({
					src: 'https://openlayers.org/en/latest/examples/data/icon.png',
				}),
				stroke: new Stroke({
					width: 5,
					color: [237, 212, 0, 0.8],
				}),
			}),
		});
		const startPoint = new Feature({
			geometry: new Point(startCoords),
		});
		const endPoint = new Feature({
			geometry: new Point(endCoords),
		});

		routeSource.addFeatures([startPoint, endPoint]);

		const map = new Map({
			target: mapRef.current,
			layers: [
				new TileLayer({
					source: new XYZ({
						attributions: attributions,
						url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=' + MAPTILER_KEY,
						tileSize: 512,
					}),
				}),
			],
			view: new View({
				center: fromLonLat(startCoords),
				zoom: 2,
			}),
		});

		map.addLayer(routeLayer);

		const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${OPEN_STREET_MAP_API_KEY}&start=${startCoords[0]},${startCoords[1]}&end=${endCoords[0]},${endCoords[1]}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const coordinates = data.features[0].geometry.coordinates;
				const route = new LineString(coordinates).transform('EPSG:4326', 'EPSG:3857');
				routeSource.addFeature(new Feature(route));
				const extent = route.getExtent();
				map.getView().fit(extent, { padding: [50, 50, 50, 50] });
			});

		return () => {
			map.setTarget('');
		};
	}, []);

	return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default OpenLayersMap;
