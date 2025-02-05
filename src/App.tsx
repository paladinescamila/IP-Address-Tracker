import {useState} from 'react';
import {getInfo} from './api/getInfo';
import './styles/index.css';

// Assets
import ArrowIcon from './assets/arrow-icon.svg';
import LocationIcon from './assets/location-icon.svg';
import BGDesktop from './assets/bg-desktop.png';
import BGMobile from './assets/bg-mobile.png';

function App() {
	const [ipAddress, setIpAddress] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const [info, setInfo] = useState<Info>({
		ip: '192.212.174.101',
		location: 'Brooklyn, NY 10001',
		timezone: 'UTC -05:00',
		isp: 'SpaceX Starlink',
	});

	const onSearch = async () => {
		const newInfo = await getInfo(ipAddress);

		if (newInfo) setInfo(newInfo);
		else setError('No information found');
	};

	return (
		<div className='flex flex-col items-center'>
			<main className='flex flex-col items-center w-full'>
				<h1 className='text-white font-bold text-3xl mt-[30px]'>IP Address Tracker</h1>
				<form className='w-[555px] flex flex-row mt-7 mb-12'>
					<input
						value={ipAddress}
						onChange={(e) => setIpAddress(e.target.value)}
						placeholder='Search for any IP address or domain'
						className='text-lg rounded-l-2xl bg-white py-[15px] px-6 flex-1 text-black outline-none'
					/>
					<button
						type='button'
						onClick={onSearch}
						className='bg-black rounded-r-2xl py-5 px-6 cursor-pointer hover:bg-[var(--dark-gray)]'>
						<img src={ArrowIcon} />
					</button>
				</form>
				<section className='relative w-full'>
					<img src={BGDesktop} className='absolute bottom-[50%] w-full -z-10' />
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
			</main>
			<footer></footer>
		</div>
	);
}

export default App;
