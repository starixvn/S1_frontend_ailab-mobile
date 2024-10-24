import { fpsRequest } from "./base";

export const api_fps_checks = ({
	di,
	bi,
	detecasAnalysis,
	sessionKey,
	token,
	url
}) =>
	fpsRequest.post(`/Checks`, {
		di,
		bi,
		detecasAnalysis,
		sessionKey,
		token,
		url
	});
