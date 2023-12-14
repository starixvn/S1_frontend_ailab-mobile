import BaseAPI, { defDeviceType } from "./base";

export class TpAPI extends BaseAPI {
	defGotoGame_AppType = defDeviceType;

	GetTpMaintainList = () => this.siteRequest.post(`/GetTpMaintainList`);

	GetTransferHistory = ({ StartDate, EndDate, PageNumber }) =>
		this.tpRequest.post("/GetTransferHistory", {
			StartDate,
			EndDate,
			PageNumber
		});

	GetTransferRecent = () => this.tpRequest.post("/GetTransferRecent");

	TransferEX = ({ FromTpId, ToTpId, Amount, TransferAction, LangId }) =>
		this.tpRequest.post("/TransferEX", {
			FromTpId,
			ToTpId,
			Amount,
			TransferAction,
			LangId
		});

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
		fun = null,
		gameType = "",
		token = "",
		tpGameType,
		loginGameType
	}) =>
		this.tpRequest.post("/GotoGame", {
			TpId,
			LangId,
			AppType,
			inputs: {
				gameId,
				fun,
				gameType,
				token,
				tpGameType,
				loginGameType
			}
		});
}
