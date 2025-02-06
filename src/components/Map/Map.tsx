import {useEffect, useState} from 'react';
import L from 'leaflet';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';

// Assets
import LocationIcon from '../../assets/location-icon.svg';

interface MapProps {
	coordinates: Coordinates;
}

export default function Map(props: MapProps) {
	// Component data
	const {coordinates} = props;
	const {latitude, longitude} = coordinates;

	// Handle map key
	const [mapKey, setMapKey] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => setMapKey((prev) => prev + 1);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<MapContainer
			key={mapKey}
			center={[latitude, longitude]}
			zoom={20}
			zoomControl={false}
			doubleClickZoom={false}
			closePopupOnClick={false}
			dragging={false}
			zoomSnap={0}
			zoomDelta={0}
			trackResize={false}
			touchZoom={false}
			scrollWheelZoom={false}
			className='w-full h-full'>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={[latitude, longitude]} icon={LocationMarker} />
		</MapContainer>
	);
}

const LocationMarker = new L.Icon({
	iconUrl: LocationIcon,
	iconRetinaUrl: LocationIcon,
	popupAnchor: [-0, -0],
	iconSize: [46, 56],
});
