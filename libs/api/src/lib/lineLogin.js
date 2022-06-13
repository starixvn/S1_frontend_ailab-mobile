import BaseAPI from "./base";

export class LineLoginAPI extends BaseAPI {
	LineLoginDirect = type =>
		this.lineLoginRequest.post(`/LineLoginDirect`, { type });

	LineCallback = ({ langId, lineLoginResponse, loginData }) =>
		this.lineLoginRequest.post(`/LineCallback/${langId}`, {
			LineLoginResponse: lineLoginResponse,
			LoginData: loginData
		});
}
