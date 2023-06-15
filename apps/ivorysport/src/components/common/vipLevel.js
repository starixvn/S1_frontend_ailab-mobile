import React from "react";
import PropTypes from "prop-types";

const VIPLevel = ({ userInfo, i18n }) => {
	return (
		<div className="icon icon-member">
			<div className="circleAnimation" />
		</div>
	);
};

VIPLevel.propTypes = {
	i18n: PropTypes.objectOf(PropTypes.string).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default VIPLevel;
