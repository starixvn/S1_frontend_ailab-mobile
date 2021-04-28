import BaseAPI, { defDeviceType } from "./base";

const defGotoGame_AppType = defDeviceType;

export class TpAPI extends BaseAPI {
	GetTransferHistory = ({ StartDate, EndDate, PageNumber }) =>
		this.tpRequest.post("/GetTransferHistory", {
			StartDate,
			EndDate,
			PageNumber
		});

	GetTransferRecent = () => this.tpRequest.post("/GetTransferRecent");

	Transfer = ({ TpId, amount, direction }) =>
		this.tpRequest.post("/Transfer", {
			TpId,
			amount,
			direction
		});

	GotoGame = ({
		GameId = null,
		TpId,
		LangId,
		AppType = defGotoGame_AppType.NativeAPP
	}) =>
		this.tpRequest.post("/GotoGame", {
			GameId,
			TpId,
			LangId,
			AppType
		});
}
