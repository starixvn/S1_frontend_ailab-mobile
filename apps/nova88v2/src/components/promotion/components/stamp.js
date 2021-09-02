import React from "react";
import { defFilterType } from "../common/def";

export const Stamp = ({ _isClaimed, _isNew, filterType, canJoin }) => {
	const _canJoin = !(filterType === defFilterType.specialBonus && !canJoin);

	return _isClaimed ? (
		<div className="claimed" />
	) : _canJoin && _isNew ? (
		<div className="new active" />
	) : null;
};
