import {cn} from '../../utils/tw-merge';
import {useWindowDimensions} from '../../hooks/useWindowDimensions';

interface InfoErrorProps {
	error: string;
}

export default function InfoError(props: InfoErrorProps) {
	// Component data
	const {error} = props;

	// Responsive
	const {isMobile} = useWindowDimensions();

	return (
		<div
			className={cn(
				'flex items-center justify-center w-[calc(100% - 48px)] xl:w-[1110px] py-[35px] px-8 rounded-2xl bg-white text-light-gray mx-auto text-center shadow-sm min-h-40',
				{'p-[26px]': isMobile}
			)}>
			{error}
		</div>
	);
}
