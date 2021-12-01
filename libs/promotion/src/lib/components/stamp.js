import React from "react";
import { defFilterType } from "../common/def";

export const Stamp = ({
	_isClaimed,
	_isNew,
	filterType,
	canJoin,
	uiSetting = {}
}) => {
	const _canJoin = !(filterType === defFilterType.specialBonus && !canJoin);

	if (_isClaimed && uiSetting.defStamp?.claimed) {
		return <div className={uiSetting.defStamp?.claimed} />;
	}

	if (_canJoin && _isNew && uiSetting.defStamp?.new) {
		return <div className={uiSetting.defStamp?.new} />;
	}

	return null;
};
