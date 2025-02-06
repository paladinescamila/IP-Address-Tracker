import {FormEvent, useState} from 'react';

// Assets
import ArrowIcon from '../../assets/arrow-icon.svg';

interface InputProps {
	search: (ipAddress: string) => void;
}

export default function Input(props: InputProps) {
	// Component data
	const {search} = props;

	// Address value handling
	const [ipAddress, setIpAddress] = useState<string>('');

	// On submit
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		search(ipAddress);
	};

	return (
		<form className='w-full xl:w-[555px] flex flex-row mt-7 mb-6 xl:mb-12' onSubmit={onSubmit}>
			<input
				value={ipAddress}
				onChange={(e) => setIpAddress(e.target.value)}
				placeholder='Search for any IP address or domain'
				className='text-lg tracking-[0.1px] rounded-l-2xl bg-white p-4 xl:py-[15px] xl:px-6 flex-1 text-black outline-none'
			/>
			<button className='bg-black rounded-r-2xl p-4 sm:py-5 sm:px-6 cursor-pointer hover:bg-[var(--dark-gray)]'>
				<img src={ArrowIcon} alt='Search' />
			</button>
		</form>
	);
}
