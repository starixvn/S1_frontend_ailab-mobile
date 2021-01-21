import BaseAPI from "./base";

const defGotoGame_AppType = {
	Desktop: 1,
	Mobile: 2,
	NativeAPP: 3
};

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

	GotoGame = ({ GameId = null, TpId, LangId }) =>
		this.tpRequest.post("/GotoGame", {
			GameId,
			TpId,
			LangId,
			AppType: defGotoGame_AppType.NativeAPP
		});
}
