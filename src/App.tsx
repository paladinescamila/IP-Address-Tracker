import {useState} from 'react';
import {getInfo} from './api/getInfo';
import {useWindowDimensions} from './hooks/useWindowDimensions';
import {cn} from './utils/tw-merge';
import './styles/index.css';
import 'leaflet/dist/leaflet.css';

// Assets
import BGDesktop from './assets/bg-desktop.png';
import BGMobile from './assets/bg-mobile.png';

// Components
import Input from './components/Input/Input';
import Info from './components/Info/Info';
import InfoError from './components/InfoError/InfoError';
import Map from './components/Map/Map';

function App() {
	const [error, setError] = useState<string | null>(null);

	const [info, setInfo] = useState<Info>({
		ip: '192.212.174.101',
		location: 'Brooklyn, NY 10001',
		timezone: 'UTC -05:00',
		isp: 'SpaceX Starlink',
	});

	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

	const search = async (ipAddress: string) => {
		const data = await getInfo(ipAddress);
		if (data) setInfo(data.info);
		if (data) setCoordinates(data.coordinates);
		else setError('No information found');
	};

	const {isMobile} = useWindowDimensions();

	return (
		<main className='flex flex-col items-center'>
			<section className='flex flex-col items-center w-full'>
				<h1
					className={cn('text-white font-bold text-3xl mt-[30px]', {
						'text-2xl mt-[26px]': isMobile,
					})}>
					IP Address Tracker
				</h1>
				<Input search={search} />
				{!error && <Info info={info} />}
				{error && <InfoError />}
			</section>
			<div className='absolute top-0 left-0 right-0 bottom-0 -z-10'>
				<img
					src={isMobile ? BGMobile : BGDesktop}
					className='w-full h-[35%] object-cover'
				/>
				<Map coordinates={coordinates} />
			</div>
		</main>
	);
}

export default App;
