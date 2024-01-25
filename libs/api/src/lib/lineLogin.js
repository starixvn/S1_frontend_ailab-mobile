import BaseAPI from "./base";

export class LineLoginAPI extends BaseAPI {
	LineLoginDirect = type =>
		this.lineLoginRequest.post(
			`/LineLoginDirect`,
			{ type },
			{
				headers: {
					common: {
						"origin-host":
							typeof window !== "undefined"
								? window?.location?.origin
								: undefined
					}
				}
			}
		);

	LineCallback = ({ langId, lineLoginResponse, loginData }) =>
		this.lineLoginRequest.post(
			`/LineCallback/${langId}`,
			{
				LineLoginResponse: lineLoginResponse,
				LoginData: loginData
			},
			{
				headers: {
					common: {
						"origin-host":
							typeof window !== "undefined"
								? window?.location?.origin
								: undefined
					}
				}
			}
		);
}
