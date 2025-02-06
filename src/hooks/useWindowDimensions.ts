import {useEffect, useMemo, useState} from 'react';

export const useWindowDimensions = () => {
	const [dimensions, setDimensions] = useState<Dimensions>({width: 0, height: 0});

	const isMobile = useMemo(() => dimensions.width < 1000, [dimensions.width]);

	useEffect(() => {
		const onResize = () =>
			setDimensions({width: window.innerWidth, height: window.innerHeight});

		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return {dimensions, isMobile};
};
