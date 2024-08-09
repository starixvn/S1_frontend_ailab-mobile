import { playerRequest } from "./base";

export const api_player_GetAppLink = () => playerRequest.post(`/GetAppLink`);

// 當存在存款或提款單號時：
// 1. 每分鐘打一次此 api 確認是否有單號，此時若有單號，則會通知用戶
// 2. 登入時，也會打一次此 api ，此時若有單號，則會通知用戶
export const api_GetCustNotification = data =>
	playerRequest.post("/GetCustNotification", data);

/**
 * 當存在存款或提款單號時：
 * 1. 向市場發送通知。
 * 2. 向用戶發送吐司訊息確認交易已處理。
 * 3. 調用API移除該單號，防止之後再次獲得相同的單號。 */
export const api_SetCustNotification = data =>
	playerRequest.post(`/SetCustNotification`, data);
