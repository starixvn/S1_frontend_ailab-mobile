import { MetaPixelTracker } from "@ailab-mobile/common";
import {
	api_GetCustNotification,
	api_SetCustNotification
} from "../../service/api/player";

const NotificationTypeEnum = {
	Deposit: 1,
	Withdrawal: 2
};

/** 此 hook 負責追蹤使用者存款/提款成功的事件，會順帶觸發 MetaPixelTracker 事件（ 臉書通知 ）通知市場 */
const useDepositWithdrawTracker = () => {
	// ======= 對外函數 =======

	/** 當存在存款或提款單號時 ( 代表用戶存款或提款成功 ) 流程：
	 *  1. 已登入時，每分鐘打一次 getCustNotification 確認是否有單號
	 *	2. 初次登入時，也會打一次 getCustNotification ( 有可能用戶存完款就登出，尚未通知用戶 )，此時若有單號，則會通知用戶
	 *  3. 觸發 MetaPixelTracker 事件，通知市場用戶存款成功
	 *  4. 向用戶發送吐司訊息確認交易已處理
	 *  5. 調用 setCustNotification 移除該單號，防止之後再次獲得相同的單號。 */
	const checkDepositSuccessful = async () => {
		try {
			const {
				data: { data: orders = [] } = {}
			} = await api_GetCustNotification({
				notificationType: NotificationTypeEnum.Deposit
			});

			const hasOrders = orders.length > 0;

			if (hasOrders) {
				/** setCustNotification api 的 Promise Object 陣列 */
				const promises = orders.map(orderId => {
					// 根據存款單號數量，觸發 MetaPixelTracker 事件
					MetaPixelTracker("deposit_successful");
					return api_SetCustNotification({
						notificationType: NotificationTypeEnum.Deposit,
						transId: orderId
					});
				});
				await Promise.all(promises);
			}
		} catch (error) {
			// 忽略
		}
	};

	return {
		checkDepositSuccessful
	};
};

export default useDepositWithdrawTracker;
