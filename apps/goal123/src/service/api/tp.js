import { tpRequest } from "./base";

export const defGotoGame_AppType = {
	Desktop: 1,
	Mobile: 2,
	NativeAPP: 3
};

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
	fun = null
}) =>
	tpRequest.post("/GotoGame", {
		TpId,
		LangId,
		AppType,
		inputs: {
			gameId,
			fun
		}
	});
