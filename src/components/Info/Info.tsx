import React from 'react';
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
	const infoItems: Array<keyof Info> = ['ip', 'location', 'timezone', 'isp'];

	return (
		<ul
			className={cn(
				'flex flex-row w-[calc(100% - 48px)] xl:w-[1110px] py-[35px] px-8 rounded-2xl bg-white mx-auto shadow-sm',
				{'flex-col p-[26px]': isMobile}
			)}>
			{infoItems.map((infoItem, index) => (
				<React.Fragment key={`info-item-${infoItem}`}>
					<InfoItem label={infoItem} value={info[infoItem]} />
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
	value: string | number;
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
