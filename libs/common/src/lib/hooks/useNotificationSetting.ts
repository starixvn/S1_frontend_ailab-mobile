/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastSoundStateEnum } from "@ailab-mobile/components";
import { useSetCustSettingMutation } from "@ailab-mobile/service";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

interface IToastSettingProps {
	setUserInfo: Dispatch<SetStateAction<any>>;
	financeNotification: string | undefined;
	soundEffects: string | undefined;
	hasToastSettingData: boolean;
}

interface INotificationSetting {
	notificationEnabledArg: string | undefined;
	notificationMutedArg: string | undefined;
	isSetCustSettingLoading: boolean;
	disableNotificationSoundCheckbox: boolean;
	handleNotificationEnabled: (isNotificationDisable: string) => void;
	handleNotificationMuted: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
}

/** 通知是否禁用。 */
export const NotificationStateEnum = Object.freeze({
	Disable: "0",
	Enabled: "1"
});

export const useNotificationSetting = ({
	financeNotification,
	soundEffects,
	setUserInfo
}: IToastSettingProps): INotificationSetting => {
	// ====== state ======

	const [notificationEnabledArg, setNotificationEnabledArg] = useState<
		string | undefined
	>(financeNotification);

	const [notificationMutedArg, setNotificationMutedArg] = useState<
		string | undefined
	>(soundEffects);

	const [
		disableNotificationSoundCheckbox,
		setDisableNotificationSoundCheckbox
	] = useState<boolean>(false);

	// ====== api ======

	const [
		setCustSetting,
		{ isLoading: isSetCustSettingLoading }
	] = useSetCustSettingMutation();

	// ====== 函數 ======

	/**
	 * 是否要啟用財務訊息，如果未啟用財務訊息也要禁用財務訊息音效
	 * @isNotificationDisable 是否啟用財務訊息 */
	const handleNotificationEnabled = (isNotificationDisable: string) => {
		const isDisable =
			isNotificationDisable === NotificationStateEnum.Disable;
		setNotificationEnabledArg(
			isDisable
				? NotificationStateEnum.Disable
				: NotificationStateEnum.Enabled
		);
		setDisableNotificationSoundCheckbox(isDisable);
	};

	/**
	 * 是否要啟用財務訊息的音效
	 * @event 訊息通知音效的 checkbox event */
	const handleNotificationMuted = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const isChecked = event.target.checked;
		setNotificationMutedArg(
			isChecked ? ToastSoundStateEnum.Enabled : ToastSoundStateEnum.Muted
		);
	};

	// ====== useEffect ======

	// 當 financeNotification 和 soundEffects 更新時，更新 state
	useEffect(() => {
		setDisableNotificationSoundCheckbox(
			financeNotification === NotificationStateEnum.Disable
		);
		setNotificationEnabledArg(financeNotification);
		setNotificationMutedArg(soundEffects);
	}, [financeNotification, soundEffects]);

	// 將資料存至後端
	useEffect(() => {
		if (!notificationEnabledArg && !notificationMutedArg) return;

		const updateCustSetting = async () => {
			await setCustSetting({
				financeNotification: notificationEnabledArg,
				soundEffects: notificationMutedArg
			}).unwrap();

			// 更新後端的吐司訊息設定，也要更新前端 UserInfo 狀態內的的吐司訊息設定
			setUserInfo((prev: any) => ({
				...prev,
				financeNotification: notificationEnabledArg,
				soundEffects: notificationMutedArg
			}));
		};
		updateCustSetting();
	}, [notificationEnabledArg, notificationMutedArg]);

	return {
		notificationEnabledArg,
		notificationMutedArg,
		isSetCustSettingLoading,
		disableNotificationSoundCheckbox,
		handleNotificationMuted,
		handleNotificationEnabled
	};
};
