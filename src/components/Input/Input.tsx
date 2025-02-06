import {FormEvent, useState} from 'react';
import {cn} from '../../utils/tw-merge';
import {useWindowDimensions} from '../../hooks/useWindowDimensions';

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

	// Responsive
	const {isMobile} = useWindowDimensions();

	// On submit
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		search(ipAddress);
	};

	return (
		<form
			className={cn('w-[calc(100% - 48px)] md:w-[555px] flex flex-row mt-7 mb-12', {
				'mb-6 ': isMobile,
			})}
			onSubmit={onSubmit}>
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
	);
}
