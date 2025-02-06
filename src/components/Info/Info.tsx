import React, {useMemo} from 'react';

interface InfoProps {
	info: Info;
}

export default function Info(props: InfoProps) {
	// Component data
	const {info} = props;

	// List of info items
	const infoItems: Array<{id: keyof Info; label: string; value: string}> = useMemo(
		() => [
			{id: 'ip', label: 'IP Address', value: info.ip},
			{id: 'location', label: 'Location', value: info.location},
			{id: 'timezone', label: 'Timezone', value: info.timezone},
			{id: 'isp', label: 'ISP', value: info.isp},
		],
		[info]
	);

	return (
		<ul className='flex flex-col xl:flex-row gap-4 xl:gap-0 w-full xl:w-[1110px] p-[26px] xl:py-[35px] xl:px-8 rounded-2xl bg-white mx-auto shadow-sm'>
			{infoItems.map(({id, label, value}, index) => (
				<React.Fragment key={`info-item-${id}`}>
					<InfoItem label={label} value={value} />
					{index < infoItems.length - 1 && (
						<div className='h-[75px] w-[1px] bg-light-gray my-auto mx-8 hidden xl:flex' />
					)}
				</React.Fragment>
			))}
		</ul>
	);
}

interface InfoItemProps {
	label: string;
	value: string;
}

function InfoItem(props: InfoItemProps) {
	// Component data
	const {label, value} = props;

	return (
		<li className='flex flex-col gap-1 xl:gap-3 flex-1'>
			<p className='uppercase text-light-gray text-[10px] xl:text-xs tracking-[1px] xl:tracking-[2px] font-semibold text-center xl:text-left'>
				{label}
			</p>
			<p className='text-dark-gray text-xl xl:text-2xl font-semibold tracking-[-0.2px] xl:tracking-[0.6px] text-center xl:text-left'>
				{value}
			</p>
		</li>
	);
}
