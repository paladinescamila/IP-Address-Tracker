import React, {useMemo} from 'react';
import {cn} from '../../utils/tw-merge';
import {useWindowDimensions} from '../../hooks/useWindowDimensions';

interface InfoProps {
	info: Info;
}

export default function Info(props: InfoProps) {
	// Component data
	const {info} = props;

	// Responsive
	const {isMobile} = useWindowDimensions();

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
		<ul
			className={cn(
				'flex flex-row w-[calc(100% - 48px)] xl:w-[1110px] py-[35px] px-8 rounded-2xl bg-white mx-auto shadow-sm',
				{'flex-col p-[26px]': isMobile}
			)}>
			{infoItems.map(({id, label, value}, index) => (
				<React.Fragment key={`info-item-${id}`}>
					<InfoItem label={label} value={value} />
					{!isMobile && index < infoItems.length - 1 && (
						<div className='h-[75px] w-[1px] bg-light-gray my-auto mx-8' />
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

	// Responsive
	const {isMobile} = useWindowDimensions();

	return (
		<li className={cn('flex flex-col gap-3 flex-1', {'gap-[5px]': isMobile})}>
			<p
				className={cn('uppercase text-light-gray text-xs tracking-[2px] font-semibold', {
					'text-[10px] tracking-[1px] text-center': isMobile,
				})}>
				{label}
			</p>
			<p
				className={cn('text-dark-gray text-2xl font-semibold tracking-[0.6px]', {
					'text-xl tracking-[-0.2px] text-center': isMobile,
				})}>
				{value}
			</p>
		</li>
	);
}
