import React from "react";
import { defFilterType } from "@ailab-mobile/promotion";
import PropTypes from "prop-types";

export const PromotionStamp = ({
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

	return <div className="tag-claim" />;
};

PromotionStamp.defaultProps = {
	uiSetting: {}
};

PromotionStamp.propTypes = {
	uiSetting: PropTypes.objectOf(PropTypes.any),
	filterType: PropTypes.string.isRequired,
	_isClaimed: PropTypes.bool.isRequired,
	_isNew: PropTypes.bool.isRequired,
	canJoin: PropTypes.bool.isRequired
};
