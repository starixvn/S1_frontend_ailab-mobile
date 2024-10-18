/* eslint-disable react/self-closing-comp */
import React, { useContext } from "react";
import { Select } from "@ailab-mobile/components";
import {
	useNotificationSetting,
	NotificationStateEnum
} from "@ailab-mobile/common";
// import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";

const NotificationSetting = () => {
	// ====== hook ======

	// const { t } = useTranslation();

	// 從 userInfo 拿取財務訊息的設定狀態
	const {
		userInfo: { financeNotification, soundEffects },
		setUserInfo // 設定 UserInfo 的函數
	} = useContext(userInfoContext);

	const {
		notificationEnabledArg,
		notificationMutedArg,
		isSetCustSettingLoading,
		disableNotificationSoundCheckbox,
		handleNotificationMuted,
		handleNotificationEnabled
	} = useNotificationSetting({
		setUserInfo,
		financeNotification,
		soundEffects
	});

	return (
		<div className="setting-checkbox">
			<Select
				value={notificationEnabledArg}
				options={[
					{
						value: NotificationStateEnum.Enabled,
						label: "Label_General_Yes"
					},
					{
						value: NotificationStateEnum.Disable,
						label: "Label_General_No"
					}
				]}
				isTranslation
				onChange={handleNotificationEnabled}
			/>
			<label className="checkbox-content">
				<input
					type="checkbox"
					checked={
						notificationMutedArg === NotificationStateEnum.Enabled
					}
					// 是否禁用通知音效
					disabled={
						disableNotificationSoundCheckbox ||
						isSetCustSettingLoading
					}
					onChange={handleNotificationMuted}
				/>
				<div className="checkbox-icon"></div>
				Use sound effects
			</label>
		</div>
	);
};

export default NotificationSetting;
