import axios from 'axios';

export const getInfo = async (ipAddress: string) => {
	try {
		const URL = 'https://geo.ipify.org/api/v2/country';
		const params = {apiKey: import.meta.env.VITE_API_KEY || '', ipAddress};
		const response = await axios.get<GeolocationResponse>(URL, {params});

		const info: Info = {
			ip: response.data.ip,
			location: `${response.data.location.region}, ${response.data.location.country}`,
			timezone: `UTC ${response.data.location.timezone}`,
			isp: response.data.isp,
		};

		return info;
	} catch (error) {
		return null;
	}
};
