import {FormEvent, useEffect, useState} from 'react';
import {getInfo} from './api/getInfo';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import './styles/index.css';
import 'leaflet/dist/leaflet.css';

// Assets
import ArrowIcon from './assets/arrow-icon.svg';
import LocationIcon from './assets/location-icon.svg';
import BGDesktop from './assets/bg-desktop.png';
import BGMobile from './assets/bg-mobile.png';

const LocationMarker = new L.Icon({
	iconUrl: LocationIcon,
	iconRetinaUrl: LocationIcon,
	popupAnchor: [-0, -0],
	iconSize: [46, 56],
});

function App() {
	const [ipAddress, setIpAddress] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const [info, setInfo] = useState<Info>({
		ip: '192.212.174.101',
		location: 'Brooklyn, NY 10001',
		timezone: 'UTC -05:00',
		isp: 'SpaceX Starlink',
	});

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newInfo = await getInfo(ipAddress);

		if (newInfo) setInfo(newInfo);
		else setError('No information found');
	};

	const [mapKey, setMapKey] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => setMapKey((prev) => prev + 1);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<main className='flex flex-col items-center'>
			<section className='flex flex-col items-center w-full'>
				<h1 className='text-white font-bold text-3xl mt-[30px]'>IP Address Tracker</h1>
				<form className='w-[555px] flex flex-row mt-7 mb-12' onSubmit={onSubmit}>
					<input
						value={ipAddress}
						onChange={(e) => setIpAddress(e.target.value)}
						placeholder='Search for any IP address or domain'
						className='text-lg rounded-l-2xl bg-white py-[15px] px-6 flex-1 text-black outline-none'
					/>
					<button className='bg-black rounded-r-2xl py-5 px-6 cursor-pointer hover:bg-[var(--dark-gray)]'>
						<img src={ArrowIcon} />
					</button>
				</form>

				<ul className='flex flex-row w-[1110px] py-[35px] px-8 rounded-2xl bg-white mx-auto'>
					<li className='flex flex-col gap-3 flex-1'>
						<p className='uppercase color-light-gray text-xs tracking-[2px] font-semibold'>
							IP Address
						</p>
						<p className='color-dark-gray text-2xl font-semibold tracking-[0.6px]'>
							{info.ip}
						</p>
					</li>
					<div className='h-[75px] w-[1px] bg-light-gray my-auto mx-8' />
					<li className='flex flex-col gap-3 flex-1'>
						<p className='uppercase color-light-gray text-xs tracking-[2px] font-semibold'>
							Location
						</p>
						<p className='color-dark-gray text-2xl font-semibold tracking-[0.6px]'>
							{info.location}
						</p>
					</li>
					<div className='h-[75px] w-[1px] bg-light-gray my-auto mx-8' />
					<li className='flex flex-col gap-3 flex-1'>
						<p className='uppercase color-light-gray text-xs tracking-[2px] font-semibold'>
							Timezone
						</p>
						<p className='color-dark-gray text-2xl font-semibold tracking-[0.6px]'>
							{info.timezone}
						</p>
					</li>
					<div className='h-[75px] w-[1px] bg-light-gray my-auto mx-8' />

					<li className='flex flex-col gap-3 flex-1'>
						<p className='uppercase color-light-gray text-xs tracking-[2px] font-semibold'>
							ISP
						</p>
						<p className='color-dark-gray text-2xl font-semibold tracking-[0.6px]'>
							{info.isp}
						</p>
					</li>
				</ul>
			</section>
			<div className='absolute top-0 left-0 right-0 bottom-0 -z-10'>
				<img src={BGDesktop} className='w-full h-[35%]' />
				{info.latitude && info.longitude && (
					<div className='w-full h-[65%]'>
						<MapContainer
							key={mapKey}
							center={[info.latitude, info.longitude]}
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
							<Marker
								position={[info.latitude, info.longitude]}
								icon={LocationMarker}
							/>
						</MapContainer>
					</div>
				)}
			</div>
		</main>
	);
}

export default App;
