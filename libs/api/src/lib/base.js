import axios from "axios";

export const loginRequest = apiURL =>
	axios.create({
		withCredentials: true,
		baseURL: `${apiURL}/api/Site`
	});

export const siteRequest = apiURL =>
	axios.create({
		withCredentials: true,
		baseURL: `${apiURL}/api/Site`
	});

export const accountStrictRequest = apiURL =>
	axios.create({
		withCredentials: true,
		baseURL: `${apiURL}/api/AccountStrict`
	});

export const accountRequest = apiURL =>
	axios.create({
		withCredentials: true,
		baseURL: `${apiURL}/api/Account`
	});

export const messageRequest = apiURL =>
	axios.create({
		withCredentials: true,
		baseURL: `${apiURL}/api/Message`
	});

export const entPageRequest = apiURL =>
	axios.create({
		withCredentials: true,
		baseURL: `${apiURL}/api/entPage`
	});

export const paymentRequest = apiURL =>
	axios.create({
		withCredentials: true,
		baseURL: `${apiURL}/api/Payment`
	});

export const tpRequest = apiURL =>
	axios.create({
		withCredentials: true,
		baseURL: `${apiURL}/api/Tp`
	});

export const promotionRequest = apiURL =>
	axios.create({
		withCredentials: true,
		baseURL: `${apiURL}/api/Promotion`
	});
