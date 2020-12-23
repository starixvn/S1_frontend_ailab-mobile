import React from "react";

export const Stamp = ({ _isClaimed, _isNew, _isExpiry }) =>
	_isClaimed ? (
		<div className="claimed"></div>
	) : _isNew && !_isExpiry ? (
		<div className="new active"></div>
	) : null;
