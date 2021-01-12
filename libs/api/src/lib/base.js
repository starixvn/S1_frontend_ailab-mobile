import axios from "axios";

export default class BaseAPI {
	constructor(data) {
		const apiUrl = data.apiURL;
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
	}
}
