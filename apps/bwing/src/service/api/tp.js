import { tpRequest, defDeviceType } from "./base";

export const defGotoGame_AppType = defDeviceType;

export const api_GetTransferHistory = ({ StartDate, EndDate, PageNumber }) =>
	tpRequest.post("/GetTransferHistory", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_GetTransferRecent = () => tpRequest.post("/GetTransferRecent");
export const api_Transfer = ({ TpId, amount, direction }) =>
	tpRequest.post("/Transfer", {
		TpId,
		amount,
		direction
	});

export const api_tp_GotoGame = ({
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
	tpRequest.post("/GotoGame", {
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

export const api_tp_TransferEX = ({ FromTpId, ToTpId, Amount }) =>
	tpRequest.post("/TransferEX", {
		FromTpId,
		ToTpId,
		Amount
	});
