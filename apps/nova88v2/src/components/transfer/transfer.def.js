import { defIptStatus } from "../common/inputStatus";

export const tpWalletsListType = {
	allWallets: 0,
	afterTransWallets: 1
};

export const initSelectedIdx = {
	transferFrom: null,
	transferTo: null
};

export const initTransferOptions = {
	transferFrom: [],
	transferTo: []
};

export const initWarning = {
	status: defIptStatus.default,
	msg: ""
};

export const defDirection = {
	mainToTp: 1,
	tpToMain: 2
};

export const transDirection = {
	from: "transferFrom",
	to: "transferTo"
};
