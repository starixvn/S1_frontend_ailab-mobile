import React from "react";
import { defFilterType } from "../common/def";

export const Stamp = ({
	_isClaimed,
	_isNew,
	_isExpiry,
	filterType,
	canJoin,
	uiSetting
}) => {
	const _canJoin = !(filterType === defFilterType.specialBonus && !canJoin);

	return (
		<>
			{_isClaimed && <div className="claimed" />}
			{_canJoin && _isNew && !_isExpiry && <div className="new active" />}
			{_isExpiry && uiSetting?.expiredIcon && (
				<div className={uiSetting?.expiredIcon}>Expired</div>
			)}
		</>
	);
};
