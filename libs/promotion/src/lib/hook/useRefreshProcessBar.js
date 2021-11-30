import { useState } from "react";
import { useHandlePopBox } from "./useHandlePopBox";

export const useRefreshProcessBar = ({ config }) => {
	const [processBarInfo, setProcessBarInfo] = useState(null);
	const { api, uiSetting } = config;

	const { handleErrorPopBox } = useHandlePopBox(config);

	const refreshProcessBar = ({ bonusCode, tpId, categoryId }) => {
		api.account
			.GetCustSpecificBonus({
				BonusCode: bonusCode,
				TpId: tpId,
				PromoCategoryId: categoryId
			})
			.then(
				({ data: { data, errorCode } }) => {
					const success = errorCode === 0;
					if (success)
						setProcessBarInfo(
							() =>
								data && {
									custRollOver: data.rollover,
									custTurnOver: data.turnover
								}
						);
					else {
						handleErrorPopBox({ ...res.data, uiSetting });
					}
				},
				() => handleErrorPopBox({ uiSetting })
			);
	};

	return {
		refreshProcessBar,
		processBarInfo
	};
};
