import axios from 'axios';

export const getInfo = async (ipAddress: string) => {
	try {
		const URL = 'https://geo.ipify.org/api/v2/country,city';
		const params = {apiKey: import.meta.env.VITE_API_KEY || '', ipAddress};
		const response = await axios.get<GeolocationResponse>(URL, {params});
		const {ip, location, isp, as} = response.data;

		const info: Info = {
			ip: ip,
			location: `${location.city}, ${location.region}`,
			timezone: `UTC ${location.timezone}`,
			isp: isp || as.name,
		};

		const coordinates: Coordinates = {
			latitude: location.lat,
			longitude: location.lng,
		};

		return {info, coordinates};
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
};
