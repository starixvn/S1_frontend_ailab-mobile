import BaseAPI from "./base";

export class FrontEndLogAPI extends BaseAPI {
	/**
	 * logMessage: 將當前狀態記錄下來傳給後端，用來查詢錯誤
	 * @param {*} logLevel 訊息類別: "error"、"info""
	 */
	LogMessage = ({
		userName = "",
		apiPath = "",
		logBody = "",
		logLevel = "",
		step = ""
	}) =>
		this.frontEndLogRequest.post(`/LogMessage`, {
			userName,
			apiPath,
			logBody,
			logLevel,
			step
		});
}
