import {useState} from 'react';

// Assets
import ArrowIcon from './assets/arrow-icon.svg';
import LocationIcon from './assets/location-icon.svg';

function App() {
	const [ipAddress, setIpAddress] = useState<string>('');

	const [info, setInfo] = useState<Info>({
		ip: '192.212.174.101',
		location: 'Brooklyn, NY 10001',
		timezone: 'UTC -05:00',
		isp: 'SpaceX Starlink',
	});

	const onSearch = () => {};

	return (
		<>
			<header>
				<h1>IP Address Tracker</h1>
			</header>
			<main>
				<form>
					<input
						value={ipAddress}
						onChange={(e) => setIpAddress(e.target.value)}
						placeholder='Search for any IP address or domain'
					/>
					<button type='button' onClick={onSearch}>
						<img src={ArrowIcon} />
					</button>
				</form>
				<section>
					<ul>
						<li>
							<p>IP Address</p>
							<p>{info.ip}</p>
						</li>
						<li>
							<p>Location</p>
							<p>{info.location}</p>
						</li>
						<li>
							<p>Timezone</p>
							<p>{info.timezone}</p>
						</li>
						<li>
							<p>ISP</p>
							<p>{info.isp}</p>
						</li>
					</ul>
				</section>
			</main>
			<footer></footer>
		</>
	);
}

export default App;
