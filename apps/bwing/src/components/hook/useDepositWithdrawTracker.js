import { MetaPixelTracker } from "@ailab-mobile/common";
import {
	ToastEmitter,
	ToastBGColorEnum,
	ToastSoundStateEnum,
	ToastIconEnum,
	ToastVisibleEnum
} from "@ailab-mobile/components";
import { useTranslation } from "react-i18next";
import {
	api_GetCustNotification,
	api_SetCustNotification
} from "../../service/api/player";

/** 訊息種類 */
const NotificationTypeEnum = Object.freeze({
	Deposit: 1,
	Withdrawal: 2
});

/** 此 hook 負責追蹤用戶存款提款成功的事件，如果使用者存款提款成功，觸發 MetaPixelTracker 事件通知市場，並發送存款提款成功的吐司訊息通知用戶 */
const useDepositWithdrawTracker = () => {
	// ======= hook =======

	const { t } = useTranslation();

	// ======= 對外函數 =======

	/**
	 *  當存在存款單號時 ( 代表用戶存款成功 ) 流程：
	 *  1. 已登入時，每分鐘打一次 getCustNotification 確認是否有單號。
	 *	2. 登入完成，也會打一次 getCustNotification ( 有可能用戶存完款就登出，後台尚未審核，所以未通知用戶 )，此時若有單號，則會通知用戶。
	 *  3. 觸發 MetaPixelTracker 事件，通知市場用戶存款成功。
	 *  4. 向用戶發送吐司訊息確認交易已處理。
	 *  5. 調用 setCustNotification 移除該單號，防止之後再次獲得相同的單號。
	 *
	 * @toastVisibled 啟用吐司訊息
	 * @toastMuted 禁用吐司訊息音效 */
	const checkDepositSuccessful = async (toastVisibled, toastMuted) => {
		try {
			const { data: { data: orders = [] } = {} } =
				await api_GetCustNotification({
					notificationType: NotificationTypeEnum.Deposit
				});
			const hasOrders = orders.length > 0;
			if (!hasOrders) return;

			const promises = orders.map(orderId => {
				// 每筆存款訂單成功時，通知市場用戶存款成功。如用戶有開啟吐司訊息，觸發存款成功吐司訊息，存款為綠底／白字／勾勾 icon
				MetaPixelTracker("deposit_successful");
				if (toastVisibled) {
					ToastEmitter({
						message: t("Label_DepositSuccessful", { orderId }),
						toastMuted,
						backgroundColor: ToastBGColorEnum.Green,
						iconClassName: ToastIconEnum.Check
					});
				}
				// 移除該單號，防止之後再次獲得相同的單號
				return api_SetCustNotification({
					notificationType: NotificationTypeEnum.Deposit,
					transId: orderId
				});
			});
			await Promise.all(promises);
		} catch (error) {
			// 忽略
		}
	};

	/**
	 *  @note 當前提款不需要發通知給市場,如果之後有需求再自行擴充。
	 *  當存在提款單號時 ( 代表用戶提款成功 ) 流程：
	 *  1. 已登入時，每分鐘打一次 getCustNotification 確認是否有單號。
	 *	2. 登入完成，也會打一次 getCustNotification ( 有可能用戶提完款就登出，後台尚未審核，所以未通知用戶 )，此時若有單號，則會通知用戶。
	 *  3. 向用戶發送吐司訊息確認交易已處理。
	 *  4. 調用 setCustNotification 移除該單號，防止之後再次獲得相同的單號。
	 *
	 * @toastVisibled 啟用吐司訊息
	 * @toastMuted 禁用吐司訊息音效 */
	const checkWithdrawalSuccessful = async (toastVisibled, toastMuted) => {
		try {
			const { data: orders = [] } = await api_GetCustNotification({
				notificationType: NotificationTypeEnum.Withdrawal
			});
			const hasOrders = orders.length > 0;
			if (!hasOrders) return;

			const promises = orders.map(orderId => {
				// 每筆提款成功時，且用戶有開啟吐司訊息，觸發提款成功吐司訊息，提款為藍底／白字／勾勾 icon
				if (toastVisibled) {
					ToastEmitter({
						message: t("Label_WithdrawSuccessful", { orderId }),
						toastMuted,
						backgroundColor: ToastBGColorEnum.Blue,
						iconClassName: ToastIconEnum.Check
					});
				}
				// 移除該單號，防止之後再次獲得相同的單號
				return api_SetCustNotification({
					notificationType: NotificationTypeEnum.Withdrawal,
					transId: orderId
				});
			});
			await Promise.all(promises);
		} catch (error) {
			// 忽略
		}
	};

	/** 處理存提款吐司訊息通知
	 *  @isToastVisible 吐司訊息是否開啟
	 *  @isToastMuted 吐司訊息是否靜音 */
	const checkDepositOrWithdrawalSuccessful = async (
		isToastVisible,
		isToastMuted
	) => {
		/** 開啟吐司訊息 */
		const toastVisibled = isToastVisible === ToastVisibleEnum.Visible;

		/** 靜音吐司訊息 */
		const toastMuted = isToastMuted === ToastSoundStateEnum.Muted;

		await checkDepositSuccessful(toastVisibled, toastMuted);
		await checkWithdrawalSuccessful(toastVisibled, toastMuted);
	};

	return {
		checkDepositOrWithdrawalSuccessful
	};
};

export default useDepositWithdrawTracker;
