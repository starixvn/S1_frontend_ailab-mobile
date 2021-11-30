import React from "react";
import { defFilterType } from "../common/def";

export const Stamp = ({ _isClaimed, _isNew, filterType, canJoin }) => {
	const _canJoin = !(filterType === defFilterType.specialBonus && !canJoin);

	if (_isClaimed) {
		return <div className="claimed" />;
	}

	if (_canJoin && _isNew) {
		return <div className="new active" />;
	}

	return null;
};
