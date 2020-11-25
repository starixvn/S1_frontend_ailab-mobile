import BaseAPI from "./base";

export class tpAPI extends BaseAPI {
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
}
