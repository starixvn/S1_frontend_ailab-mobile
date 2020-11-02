import axios from "axios";

export const loginRequest = axios.create({
	withCredentials: true,
	baseURL: `${axios.defaults.baseURL}/api/Site`
});

export const siteRequest = axios.create({
	withCredentials: true,
	baseURL: `${axios.defaults.baseURL}/api/Site`
});

export const accountStrictRequest = axios.create({
	withCredentials: true,
	baseURL: `${axios.defaults.baseURL}/api/AccountStrict`
});

export const accountRequest = axios.create({
	withCredentials: true,
	baseURL: `${axios.defaults.baseURL}/api/Account`
});

export const messageRequest = axios.create({
	withCredentials: true,
	baseURL: `${axios.defaults.baseURL}/api/Message`
});

export const entPageRequest = axios.create({
	withCredentials: true,
	baseURL: `${axios.defaults.baseURL}/api/entPage`
});

export const paymentRequest = axios.create({
	withCredentials: true,
	baseURL: `${axios.defaults.baseURL}/api/Payment`
});

export const tpRequest = axios.create({
	withCredentials: true,
	baseURL: `${axios.defaults.baseURL}/api/Tp`
});

export const promotionRequest = axios.create({
	withCredentials: true,
	baseURL: `${axios.defaults.baseURL}/api/Promotion`
});
