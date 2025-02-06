import {useState, useEffect} from 'react';
import {getInfo} from './api/getInfo';
import {isValidIP} from './utils/isValidIP';
import 'leaflet/dist/leaflet.css';
import './styles/index.css';

// Assets
import BGDesktop from './assets/bg-desktop.png';
import BGMobile from './assets/bg-mobile.png';

// Components
import Input from './components/Input/Input';
import Info from './components/Info/Info';
import InfoError from './components/InfoError/InfoError';
import Map from './components/Map/Map';

function App() {
	const [info, setInfo] = useState<Info>({
		ip: '192.212.174.101',
		location: 'Brooklyn, NY 10001',
		timezone: 'UTC -05:00',
		isp: 'SpaceX Starlink',
	});

	const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
	const [error, setError] = useState<string | null>(null);

	const search = async (ipAddress: string) => {
		if (ipAddress && !isValidIP(ipAddress)) return setError('Please provide a valid IP');

		const data = await getInfo(ipAddress);

		if (data) {
			setInfo(data.info);
			setCoordinates(data.coordinates);
			setError(null);
		} else setError('There was an error getting the information, try again.');
	};

	useEffect(() => {
		search('');
	}, []);

	return (
		<main className='flex flex-col items-center'>
			<section className='flex flex-col items-center w-full px-6 xl:px-0'>
				<h1 className='text-white font-semibold text-2xl xl:text-3xl tracking-[0.3px] mt-[26px] xl:mt-[30px]'>
					IP Address Tracker
				</h1>
				<Input search={search} />
				{!error && <Info info={info} />}
				{error && <InfoError error={error} />}
			</section>
			<div className='absolute top-0 left-0 right-0 bottom-0 -z-10'>
				<img src={BGDesktop} className='w-full h-[35%] object-cover hidden xl:flex' />
				<img src={BGMobile} className='w-full h-[35%] object-cover flex xl:hidden' />
				<div className='w-full h-[65%]'>
					{!error && coordinates && <Map coordinates={coordinates} />}
					{(error || !coordinates) && (
						<p className='w-full h-full flex items-center justify-center text-light-gray'>
							No data
						</p>
					)}
				</div>
			</div>
		</main>
	);
}

export default App;
