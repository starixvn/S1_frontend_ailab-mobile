import BaseAPI, { defDeviceType } from "./base";

export class TpAPI extends BaseAPI {
	defGotoGame_AppType = defDeviceType;

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
		gameId = null,
		TpId,
		LangId,
		AppType = defGotoGame_AppType.NativeAPP,
		fun = null
	}) =>
		this.tpRequest.post("/GotoGame", {
			TpId,
			LangId,
			AppType,
			inputs: {
				gameId,
				fun
			}
		});
}
