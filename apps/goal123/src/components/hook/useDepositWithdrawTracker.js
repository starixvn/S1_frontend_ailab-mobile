import {
	MetaPixelTracker,
	NotificationStateEnum,
	NotificationSoundStateEnum
} from "@ailab-mobile/common";
import {
	ToastEmitter,
	ToastBGColorEnum,
	ToastIconEnum
} from "@ailab-mobile/components";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import {
	api_GetCustNotification,
	api_SetCustNotification
} from "../../service/api/player";

/** 訊息種類的Enum，用來標識不同的通知類型
 *  @DepositSuccess 存款成功
 *  @WithdrawalSuccess 提款成功
 *  @DepositFail 存款失敗
 *  @WithdrawalFail 提款失敗 */
const NotificationTypeEnum = Object.freeze({
	DepositSuccess: 1,
	WithdrawalSuccess: 2,
	DepositFail: 3,
	WithdrawalFail: 4
});

/** 各類型財務通知的配置
 *  @note 當前僅有提款需要發通知給市場,如果之後有需求再自行擴充。
 *  @event 市場追蹤用戶的事件，目前僅有存款成功需要追蹤
 *  @i18nLabel i18n 訊息鍵
 *  @bgColor 發送的吐司背景色
 *  @iconClassName 吐司訊息 icon */
const notificationsConfig = {
	[NotificationTypeEnum.DepositSuccess]: {
		event: "deposit_successful",
		i18nLabel: "lbl_DepositSuccessful",
		bgColor: ToastBGColorEnum.Green,
		iconClassName: ToastIconEnum.Check
	},
	[NotificationTypeEnum.WithdrawalSuccess]: {
		event: null,
		i18nLabel: "lbl_WithdrawSuccessful",
		bgColor: ToastBGColorEnum.Green,
		iconClassName: ToastIconEnum.Check
	},
	[NotificationTypeEnum.DepositFail]: {
		event: null,
		i18nLabel: "lbl_DepositFailed",
		bgColor: ToastBGColorEnum.Red,
		iconClassName: ToastIconEnum.Cross
	},
	[NotificationTypeEnum.WithdrawalFail]: {
		event: null,
		i18nLabel: "lbl_WithdrawFailed",
		bgColor: ToastBGColorEnum.Red,
		iconClassName: ToastIconEnum.Cross
	}
};

/**
 * useDepositWithdrawTracker Hook:
 * - 此 Hook 負責處理用戶存款與提款的成功或失敗通知。
 * - 依據通知類型發送事件追蹤、顯示吐司訊息，並播放音效。 */
const useDepositWithdrawTracker = () => {
	const { t } = useTranslation();

	/** 處理財務通知（ 存款成功／提款成功／存款失敗／提款失敗 ）的函數
	 *  1. 已登入時，每分鐘打一次 api_GetCustNotification 確認是否有財務通知的單號。
	 *	2. 登入完成，也會打一次 api_GetCustNotification ( 有可能用戶存完款就登出，後台尚未審核，所以未通知用戶 )，此時若有單號，則會通知用戶。
	 *  3. 觸發 MetaPixelTracker 事件，通知市場用戶執行當前財務操作成功。
	 *  4. 向用戶發送財務通知訊息。
	 *  5. 調用 api_SetCustNotification 移除該財務通知單號，防止之後再次獲得相同的單號。
	 *
	 * @notificationType - 通知類型（例如存款成功/提款成功）。
	 * @notificationEnabled - 是否啟用通知。
	 * @notificationMuted - 是否禁音通知音效。 */
	const processNotification = async (
		notificationType,
		notificationEnabled,
		notificationMuted
	) => {
		try {
			const {
				data: { data: orders = [] } = {}
			} = await api_GetCustNotification({ notificationType });

			// 若沒有新訂單號，則不進行任何操作
			if (orders.length === 0) return;

			const {
				event,
				i18nLabel,
				bgColor,
				iconClassName
			} = notificationsConfig[notificationType];

			/** 消除該財務通知的所有單號 */
			const orderProcessingPromises = orders.map(async orderId => {
				// 如果此財務通知需要通知市場，就發送通知給市場
				if (event) MetaPixelTracker(event);

				// 如果財務通知有啟用，就發送通知
				if (notificationEnabled) {
					ToastEmitter({
						message: t(i18nLabel, { orderId }),
						customBGColor: bgColor,
						customIconClassName: iconClassName,
						isWrapText: false
					});

					// 如果財務通知開啟音效，就播放音效
					if (!notificationMuted) {
						const audio = new Audio(
							`${bannerImgUrl}/Static/toast/img/toastSound.mp3`
						);
						audio.play();
					}
				}

				// 移除該財務通知類型的單號，防止之後再次獲得相同的單號
				return api_SetCustNotification({
					notificationType,
					transId: orderId
				});
			});

			await Promise.all(orderProcessingPromises);
		} catch (error) {
			// 忽略錯誤
		}
	};

	/**
	 *  在 “登入時” 和 “登入後，每分鐘” 調用，
	 *  檢查當前是否有 存款成功／提款成功／存款失敗／提款失敗 的單號，有的話需要發送財務通知給使用者。
	 *
	 * @notificationEnabledArg - 從 userInfo 取得 “財務通知是否啟用”
	 * @notificationMutedArg - 從 userInfo 取得 ”財務通知是否禁音“ */
	const handleNotification = async (
		notificationEnabledArg,
		notificationMutedArg
	) => {
		const notificationEnabled =
			notificationEnabledArg === NotificationStateEnum.Enabled;

		const notificationMuted =
			notificationMutedArg === NotificationSoundStateEnum.Muted;

		/** 一次性檢查所有財務通知的類型，是否有單號，如果有單號，就發財務通知給使用者 */
		const allNotificationTypePromises = Object.values(
			NotificationTypeEnum
		).map(async notificationType => {
			processNotification(
				notificationType,
				notificationEnabled,
				notificationMuted
			);
		});
		await Promise.all(allNotificationTypePromises);
	};
	return {
		handleNotification
	};
};

export default useDepositWithdrawTracker;
