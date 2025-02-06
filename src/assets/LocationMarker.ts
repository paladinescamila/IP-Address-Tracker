import L from 'leaflet';
import LocationIcon from './location-icon.svg';

export const LocationMarker = new L.Icon({
	iconUrl: LocationIcon,
	iconRetinaUrl: LocationIcon,
	popupAnchor: [-0, -0],
	iconSize: [32, 45],
});
