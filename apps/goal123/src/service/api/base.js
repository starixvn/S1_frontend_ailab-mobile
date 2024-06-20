import { createAxiosInstanceWithDeviceHeader } from "@ailab-mobile/api";

const rootURL = "";

export const defDeviceType = {
	Desktop: 1,
	Mobile: 2,
	NativeAPP: 3
};

export const loginRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Site`
);

export const siteRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Site`
);

export const accountStrictRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/AccountStrict`
);

export const accountRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Account`
);

export const messageRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Message`
);

export const entPageRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/entPage`
);

export const paymentRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Payment`
);

export const tpRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Tp`
);

export const promotionRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Promotion`
);

export const eventRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/events`
);

export const cashierRequest = createAxiosInstanceWithDeviceHeader(`${rootURL}`);

export const playerRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Player`
);

export const worldCupPredictionRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/WorldCupPrediction`
);

export const shieldRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Shield`
);

export const hotEventRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/HotEvent`
);

export const gameRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Game`
);

export const liveStreamingRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/LiveStreaming`
);

export const euroCupRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/CupEvent`
);

export const surveyRequest = createAxiosInstanceWithDeviceHeader(
	`${rootURL}/api/Questionnaire`
);
