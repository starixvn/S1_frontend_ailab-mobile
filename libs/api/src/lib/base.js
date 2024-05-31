import { isInApp } from "@ailab-mobile/common";
import axios from "axios";

export const defDeviceType = {
	Desktop: 1,
	Mobile: 2,
	NativeAPP: 3
};

export const getDeviceType = () =>
	isInApp() ? defDeviceType.NativeAPP : defDeviceType.Mobile;

export const createAxiosInstanceWithDeviceHeader = baseURL => {
	const instance = axios.create({ withCredentials: true, baseURL });
	instance.interceptors.request.use(config => {
		config.headers["ai-device"] = getDeviceType();
		return config;
	});
	return instance;
};

export default class BaseAPI {
	constructor(data) {
		// const apiUrl = data.apiURL;
		const apiUrl = "";
		this.loginRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/Site`
		);

		this.siteRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/Site`
		);

		this.accountStrictRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/AccountStrict`
		);

		this.messageRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/Message`
		);

		this.entPageRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/entPage`
		);

		this.paymentRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/Payment`
		);

		this.tpRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/Tp`
		);

		this.promotionRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/Promotion`
		);

		this.accountRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/Account`
		);

		this.evnetsRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/events`
		);

		this.videoRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/video`
		);

		this.cashierRequest = createAxiosInstanceWithDeviceHeader(`${apiUrl}`);

		this.playerRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/Player`
		);

		this.lineLoginRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/LineLogin`
		);

		this.worldCupPredictionRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/WorldCupPrediction`
		);

		this.hotEventRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/HotEvent`
		);

		this.gameRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/Game`
		);

		this.hotGameRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/HotGame`
		);

		// * 紀錄log
		this.frontEndLogRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/FrontEndLog`
		);

		this.liveStreamingRequest = createAxiosInstanceWithDeviceHeader(
			`${apiUrl}/api/LiveStreaming`
		);
	}
}
