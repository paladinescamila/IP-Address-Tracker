interface InfoErrorProps {
	error: string;
}

export default function InfoError(props: InfoErrorProps) {
	// Component data
	const {error} = props;

	return (
		<div className='flex items-center justify-center w-full xl:w-[1110px] p-[26px] xl:py-[35px] xl:px-8 rounded-2xl bg-white text-light-gray mx-auto text-center shadow-sm min-h-40'>
			{error}
		</div>
	);
}
