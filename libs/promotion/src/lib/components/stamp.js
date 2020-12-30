import React from "react";
import { defFilterType } from "../common/def";

export const Stamp = ({
	_isClaimed,
	_isNew,
	_isExpiry,
	filterType,
	canJoin
}) => {
	let _canJoin =
		filterType === defFilterType.specialBonus && !canJoin ? false : true;

	return _isClaimed ? (
		<div className="claimed"></div>
	) : _canJoin && _isNew && !_isExpiry ? (
		<div className="new active"></div>
	) : null;
};
