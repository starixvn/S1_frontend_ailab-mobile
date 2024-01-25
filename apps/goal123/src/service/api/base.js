import axios from "axios";

const rootURL = "";

export const defDeviceType = {
	Desktop: 1,
	Mobile: 2,
	NativeAPP: 3
};

export const loginRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Site`
});

export const siteRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Site`
});

export const accountStrictRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/AccountStrict`
});

export const accountRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Account`
});

export const messageRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Message`
});

export const entPageRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/entPage`
});

export const paymentRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Payment`
});

export const tpRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Tp`
});

export const promotionRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Promotion`
});

export const eventRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/events`
});

export const cashierRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}`
});

export const playerRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Player`
});

export const worldCupPredictionRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/WorldCupPrediction`
});

export const shieldRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Shield`
});

export const hotEventRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/HotEvent`
});

export const gameRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/Game`
});

export const liveStreamingRequest = axios.create({
	withCredentials: true,
	baseURL: `${rootURL}/api/LiveStreaming`
});
