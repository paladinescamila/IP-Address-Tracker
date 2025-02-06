import {cn} from '../../utils/tw-merge';
import {useWindowDimensions} from '../../hooks/useWindowDimensions';

export default function InfoError() {
	// Responsive
	const {isMobile} = useWindowDimensions();

	return (
		<div
			className={cn(
				'flex items-center justify-center w-[calc(100% - 48px)] xl:w-[1110px] py-[35px] px-8 rounded-2xl bg-white mx-auto text-center min-h-40',
				{'p-[26px]': isMobile}
			)}>
			There was an error getting the information, try again.
		</div>
	);
}
