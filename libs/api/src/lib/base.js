import axios from "axios";

export const defDeviceType = {
	Desktop: 1,
	Mobile: 2,
	NativeAPP: 3
};

export default class BaseAPI {
	constructor(data) {
		// const apiUrl = data.apiURL;
		const apiUrl = "";
		this.loginRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/Site`
		});

		this.siteRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/Site`
		});

		this.accountStrictRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/AccountStrict`
		});

		this.messageRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/Message`
		});

		this.entPageRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/entPage`
		});

		this.paymentRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/Payment`
		});

		this.tpRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/Tp`
		});

		this.promotionRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/Promotion`
		});

		this.accountRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/Account`
		});

		this.evnetsRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/events`
		});

		this.videoRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}/api/video`
		});

		this.cashierRequest = axios.create({
			withCredentials: true,
			baseURL: `${apiUrl}`
		});
	}
}
